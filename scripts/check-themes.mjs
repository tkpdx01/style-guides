import { readFile, readdir } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const stylesDir = path.join(rootDir, "styles")
const corePath = path.join(rootDir, "src", "core.css")
const templateThemePath = path.join(rootDir, "templates", "style", "theme.css")
const contractTokens = new Set([
  "--sg-color-primary",
  "--sg-color-primary-foreground",
  "--sg-color-secondary",
  "--sg-color-secondary-foreground",
  "--sg-color-background",
  "--sg-color-foreground",
  "--sg-color-surface",
  "--sg-color-surface-foreground",
  "--sg-color-muted",
  "--sg-color-muted-foreground",
  "--sg-color-accent",
  "--sg-color-border",
  "--sg-color-focus",
  "--sg-color-danger",
  "--sg-font-sans",
  "--sg-font-mono",
  "--sg-border-width",
  "--sg-focus-width",
  "--sg-focus-offset",
  "--sg-radius-control",
  "--sg-radius-surface",
  "--sg-radius-pill",
  "--sg-space-card",
  "--sg-shadow-sm",
  "--sg-shadow-md",
  "--sg-shadow-lg",
  "--sg-shadow-control",
  "--sg-shadow-surface",
  "--sg-shadow-input",
  "--sg-shadow-badge",
  "--sg-shadow-hover",
  "--sg-shadow-active",
  "--sg-transform-hover",
  "--sg-transform-active",
  "--sg-motion-duration",
  "--sg-motion-easing",
])

function collectMatches(source, pattern) {
  return new Set([...source.matchAll(pattern)].map((match) => match[1]))
}

function validateTheme(label, themeCss, expectedSelector, problems) {
  const definedTokens = collectMatches(themeCss, /(--sg-[a-z0-9-]+)\s*:/g)

  if (!themeCss.includes(expectedSelector)) {
    problems.push(`${label}: theme is missing selector ${expectedSelector}`)
  }

  for (const token of contractTokens) {
    if (!definedTokens.has(token)) {
      problems.push(`${label}: theme does not define ${token}`)
    }
  }
}

const problems = []
const coreCss = await readFile(corePath, "utf8")
const coreTokens = collectMatches(coreCss, /var\((--sg-[a-z0-9-]+)/g)

for (const token of coreTokens) {
  if (!contractTokens.has(token)) {
    problems.push(`core: ${token} is consumed but not part of the public token contract`)
  }
}

const styleDirectories = (await readdir(stylesDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
  .map((entry) => entry.name)

for (const directoryName of styleDirectories) {
  const styleDir = path.join(stylesDir, directoryName)
  const manifest = JSON.parse(await readFile(path.join(styleDir, "manifest.json"), "utf8"))
  const themePath = path.resolve(styleDir, manifest.files.theme)
  const themeCss = await readFile(themePath, "utf8")

  validateTheme(manifest.id, themeCss, `[data-style="${manifest.id}"]`, problems)
}

const templateTheme = await readFile(templateThemePath, "utf8")
validateTheme("template", templateTheme, "[data-style=\"style-id\"]", problems)

if (problems.length > 0) {
  for (const problem of problems) console.error(`- ${problem}`)
  process.exitCode = 1
} else {
  console.log(`Theme contract is valid (${styleDirectories.length} theme${styleDirectories.length === 1 ? "" : "s"}, ${contractTokens.size} tokens, template included).`)
}
