import { access, readFile, readdir, writeFile } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const stylesDir = path.join(rootDir, "styles")
const readmePath = path.join(rootDir, "README.md")
const catalogPath = path.join(rootDir, "catalog.json")
const checkOnly = process.argv.includes("--check")

const allowedStatus = new Set(["draft", "review", "ready", "deprecated"])
const allowedFontRoles = new Set(["sans", "serif", "mono", "display"])
const allowedManifestFields = new Set([
  "$schema",
  "id",
  "name",
  "version",
  "status",
  "summary",
  "description",
  "preview",
  "files",
  "tags",
  "traits",
  "bestFor",
  "avoidFor",
  "compatibleWith",
  "fonts",
])
const allowedTraits = {
  density: new Set(["compact", "balanced", "relaxed"]),
  contrast: new Set(["low", "medium", "high"]),
  energy: new Set(["quiet", "balanced", "bold"]),
  shape: new Set(["sharp", "balanced", "rounded"]),
  motion: new Set(["minimal", "subtle", "expressive"]),
}

function fail(message) {
  throw new Error(message)
}

function requireString(value, field, styleId) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(`${styleId}: ${field} must be a non-empty string`)
  }
}

function requireStringArray(value, field, styleId) {
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== "string" || item.trim() === "")) {
    fail(`${styleId}: ${field} must be a non-empty string array`)
  }
}

async function requireLocalFile(styleDir, relativePath, field, styleId) {
  requireString(relativePath, field, styleId)

  if (!relativePath.startsWith("./")) {
    fail(`${styleId}: ${field} must start with ./`)
  }

  const resolvedPath = path.resolve(styleDir, relativePath)
  const styleRoot = `${path.resolve(styleDir)}${path.sep}`

  if (!resolvedPath.startsWith(styleRoot)) {
    fail(`${styleId}: ${field} must stay inside its style directory`)
  }

  try {
    await access(resolvedPath)
  } catch {
    fail(`${styleId}: ${field} points to a missing file (${relativePath})`)
  }
}

async function loadStyle(directoryName) {
  const styleDir = path.join(stylesDir, directoryName)
  const manifestPath = path.join(styleDir, "manifest.json")
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"))
  const styleId = manifest.id ?? directoryName

  for (const field of Object.keys(manifest)) {
    if (!allowedManifestFields.has(field)) {
      fail(`${styleId}: unsupported manifest field ${field}`)
    }
  }

  requireString(manifest.$schema, "$schema", styleId)
  requireString(manifest.id, "id", styleId)
  requireString(manifest.name, "name", styleId)
  requireString(manifest.version, "version", styleId)
  requireString(manifest.summary, "summary", styleId)
  requireString(manifest.description, "description", styleId)

  if (manifest.$schema !== "../../schemas/style-manifest.schema.json") {
    fail(`${styleId}: $schema must point to ../../schemas/style-manifest.schema.json`)
  }

  if (manifest.summary.length > 120) {
    fail(`${styleId}: summary must not exceed 120 characters`)
  }

  if (manifest.description.length > 320) {
    fail(`${styleId}: description must not exceed 320 characters`)
  }

  if (manifest.id !== directoryName) {
    fail(`${styleId}: id must match its directory name (${directoryName})`)
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.id)) {
    fail(`${styleId}: id must use kebab-case`)
  }

  if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) {
    fail(`${styleId}: version must use semantic versioning`)
  }

  if (!allowedStatus.has(manifest.status)) {
    fail(`${styleId}: unsupported status ${manifest.status}`)
  }

  requireStringArray(manifest.tags, "tags", styleId)
  requireStringArray(manifest.bestFor, "bestFor", styleId)
  requireStringArray(manifest.avoidFor, "avoidFor", styleId)
  requireStringArray(manifest.compatibleWith, "compatibleWith", styleId)

  if (manifest.tags.length < 3) {
    fail(`${styleId}: tags must contain at least three entries`)
  }

  if (new Set(manifest.tags).size !== manifest.tags.length) {
    fail(`${styleId}: tags must be unique`)
  }

  if (new Set(manifest.compatibleWith).size !== manifest.compatibleWith.length) {
    fail(`${styleId}: compatibleWith entries must be unique`)
  }

  for (const tag of manifest.tags) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tag)) {
      fail(`${styleId}: tag ${tag} must use kebab-case`)
    }
  }

  if (!manifest.traits || typeof manifest.traits !== "object") {
    fail(`${styleId}: traits must be an object`)
  }

  for (const [trait, values] of Object.entries(allowedTraits)) {
    if (!values.has(manifest.traits[trait])) {
      fail(`${styleId}: unsupported ${trait} trait ${manifest.traits[trait]}`)
    }
  }

  for (const trait of Object.keys(manifest.traits)) {
    if (!(trait in allowedTraits)) {
      fail(`${styleId}: unsupported trait ${trait}`)
    }
  }

  if (!Array.isArray(manifest.fonts) || manifest.fonts.length === 0) {
    fail(`${styleId}: fonts must contain at least one font definition`)
  }

  for (const [index, font] of manifest.fonts.entries()) {
    requireString(font?.role, `fonts[${index}].role`, styleId)
    requireString(font?.family, `fonts[${index}].family`, styleId)
    requireString(font?.fallback, `fonts[${index}].fallback`, styleId)

    const fontKeys = Object.keys(font ?? {})
    if (fontKeys.length !== 3 || fontKeys.some((key) => !["role", "family", "fallback"].includes(key))) {
      fail(`${styleId}: fonts[${index}] must contain exactly role, family, and fallback`)
    }

    if (!allowedFontRoles.has(font.role)) {
      fail(`${styleId}: unsupported font role ${font.role}`)
    }
  }

  if (!manifest.files || typeof manifest.files !== "object") {
    fail(`${styleId}: files must be an object`)
  }

  const fileKeys = Object.keys(manifest.files)
  if (fileKeys.length !== 3 || fileKeys.some((key) => !["guide", "prompt", "theme"].includes(key))) {
    fail(`${styleId}: files must contain exactly guide, prompt, and theme`)
  }

  await requireLocalFile(styleDir, manifest.preview, "preview", styleId)
  await requireLocalFile(styleDir, manifest.files.guide, "files.guide", styleId)
  await requireLocalFile(styleDir, manifest.files.prompt, "files.prompt", styleId)
  await requireLocalFile(styleDir, manifest.files.theme, "files.theme", styleId)

  const fromRoot = (relativePath) => `./styles/${manifest.id}/${relativePath.slice(2)}`
  const catalogStyle = { ...manifest }
  delete catalogStyle.$schema

  return {
    ...catalogStyle,
    path: `./styles/${manifest.id}`,
    preview: fromRoot(manifest.preview),
    files: Object.fromEntries(
      Object.entries(manifest.files).map(([key, value]) => [key, fromRoot(value)]),
    ),
  }
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ")
}

function renderCatalog(styles) {
  const rows = styles.map((style) => {
    const tags = style.tags.map((tag) => `\`${tag}\``).join(" ")
    const preview = `<a href="${style.files.guide}"><img src="${style.preview}" width="260" alt="${escapeCell(style.name)} preview"></a>`
    const identity = `**[${escapeCell(style.name)}](${style.files.guide})**<br>${escapeCell(style.summary)}<br>${tags}`
    const fit = style.bestFor.map((item) => escapeCell(item)).join("<br>")
    const traits = Object.entries(style.traits)
      .map(([key, value]) => `${key}: \`${value}\``)
      .join("<br>")

    return `| ${preview} | ${identity} | ${traits} | ${fit} |`
  })

  return [
    "<!-- catalog:start -->",
    "| Preview | Style | Traits | Best for |",
    "|---|---|---|---|",
    ...rows,
    "<!-- catalog:end -->",
  ].join("\n")
}

function replaceCatalogSection(readme, section) {
  const markerPattern = /<!-- catalog:start -->[\s\S]*?<!-- catalog:end -->/

  if (!markerPattern.test(readme)) {
    fail("README.md is missing catalog markers")
  }

  return readme.replace(markerPattern, section)
}

async function readIfPresent(filePath) {
  try {
    return await readFile(filePath, "utf8")
  } catch (error) {
    if (error.code === "ENOENT") return null
    throw error
  }
}

const styleDirectories = (await readdir(stylesDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
  .map((entry) => entry.name)

const styles = (await Promise.all(styleDirectories.map(loadStyle)))
  .sort((left, right) => (left.id < right.id ? -1 : left.id > right.id ? 1 : 0))

const ids = styles.map((style) => style.id)
if (new Set(ids).size !== ids.length) {
  fail("Style ids must be unique")
}

const catalog = `${JSON.stringify({
  $schema: "./schemas/catalog.schema.json",
  source: "styles/*/manifest.json",
  styles,
}, null, 2)}\n`

const currentReadme = await readFile(readmePath, "utf8")
const nextReadme = replaceCatalogSection(currentReadme, renderCatalog(styles))

if (checkOnly) {
  const currentCatalog = await readIfPresent(catalogPath)
  const problems = []

  if (currentCatalog !== catalog) problems.push("catalog.json is out of date")
  if (currentReadme !== nextReadme) problems.push("README.md catalog is out of date")

  if (problems.length > 0) {
    for (const problem of problems) console.error(`- ${problem}`)
    console.error("Run npm run catalog:build to regenerate catalog files.")
    process.exitCode = 1
  } else {
    console.log(`Catalog is valid (${styles.length} style${styles.length === 1 ? "" : "s"}).`)
  }
} else {
  await writeFile(catalogPath, catalog)
  await writeFile(readmePath, nextReadme)
  console.log(`Generated catalog for ${styles.length} style${styles.length === 1 ? "" : "s"}.`)
}
