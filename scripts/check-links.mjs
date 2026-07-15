import { access, readFile, readdir } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const ignoredDirectories = new Set([".git", "node_modules"])

async function collectMarkdownFiles(directory) {
  const files = []

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue

    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...await collectMarkdownFiles(entryPath))
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(entryPath)
    }
  }

  return files
}

function extractTargets(markdown) {
  const targets = new Set()
  const markdownLink = /!?\[[^\]]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+["'][^"']*["'])?\)/g
  const htmlLink = /<(?:a|img)\b[^>]*?\b(?:href|src)=["']([^"']+)["'][^>]*>/gi

  for (const match of markdown.matchAll(markdownLink)) {
    targets.add(match[1] ?? match[2])
  }

  for (const match of markdown.matchAll(htmlLink)) {
    targets.add(match[1])
  }

  return [...targets]
}

function resolveLocalTarget(markdownPath, rawTarget) {
  const target = rawTarget.trim()

  if (
    target === "" ||
    target.startsWith("#") ||
    target.startsWith("/") ||
    target.startsWith("//") ||
    /^[a-z][a-z\d+.-]*:/i.test(target)
  ) {
    return null
  }

  const pathOnly = target.split("#", 1)[0].split("?", 1)[0]
  if (pathOnly === "") return null

  try {
    return path.resolve(path.dirname(markdownPath), decodeURIComponent(pathOnly))
  } catch {
    return path.resolve(path.dirname(markdownPath), pathOnly)
  }
}

const markdownFiles = await collectMarkdownFiles(rootDir)
const brokenLinks = []

for (const markdownPath of markdownFiles) {
  const markdown = await readFile(markdownPath, "utf8")

  for (const target of extractTargets(markdown)) {
    const resolvedTarget = resolveLocalTarget(markdownPath, target)
    if (!resolvedTarget) continue

    try {
      await access(resolvedTarget)
    } catch {
      brokenLinks.push({
        file: path.relative(rootDir, markdownPath).replaceAll(path.sep, "/"),
        target,
      })
    }
  }
}

if (brokenLinks.length > 0) {
  for (const link of brokenLinks) {
    console.error(`- ${link.file}: missing ${link.target}`)
  }
  process.exitCode = 1
} else {
  console.log(`Local Markdown links are valid (${markdownFiles.length} files).`)
}
