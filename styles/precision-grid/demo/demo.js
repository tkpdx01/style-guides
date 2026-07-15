const body = document.body
const viewTabs = [...document.querySelectorAll("[data-view-tab]")]
const viewPanels = [...document.querySelectorAll("[data-view-panel]")]
const densityButtons = [...document.querySelectorAll("[data-density-value]")]
const densityRadios = [...document.querySelectorAll('input[name="form-density"]')]
const themeToggle = document.querySelector("[data-theme-toggle]")
const formulaInput = document.querySelector("[data-formula-input]")
const nameBox = document.querySelector("[data-name-box]")
const selectionStatus = document.querySelector(".pg-status-selection")
const gridCells = [...document.querySelectorAll("td[data-cell]")]
const recordFilter = document.querySelector("[data-record-filter]")
const recordRows = [...document.querySelectorAll("[data-record]")]
const recordCount = document.querySelector("[data-record-count]")
const zoomInput = document.querySelector(".pg-zoom input")
const zoomOutput = document.querySelector(".pg-zoom output")
const shell = document.querySelector(".pg-shell")

function activateView(view) {
  for (const tab of viewTabs) {
    const active = tab.dataset.viewTab === view
    tab.setAttribute("aria-selected", String(active))
    tab.tabIndex = active ? 0 : -1
  }

  for (const panel of viewPanels) {
    panel.hidden = panel.dataset.viewPanel !== view
  }
}

for (const tab of viewTabs) {
  tab.addEventListener("click", () => activateView(tab.dataset.viewTab))
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return
    event.preventDefault()
    const currentIndex = viewTabs.indexOf(tab)
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? viewTabs.length - 1
        : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + viewTabs.length) % viewTabs.length
    const nextTab = viewTabs[nextIndex]
    activateView(nextTab.dataset.viewTab)
    nextTab.focus()
  })
}

function setDensity(density) {
  body.dataset.density = density

  for (const button of densityButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.densityValue === density))
  }

  for (const radio of densityRadios) {
    radio.checked = radio.value === density
  }
}

for (const button of densityButtons) {
  button.addEventListener("click", () => setDensity(button.dataset.densityValue))
}

for (const radio of densityRadios) {
  radio.addEventListener("change", () => {
    if (radio.checked) setDensity(radio.value)
  })
}

themeToggle.addEventListener("click", () => {
  const dark = body.dataset.colorScheme !== "dark"
  if (dark) body.dataset.colorScheme = "dark"
  else delete body.dataset.colorScheme
  themeToggle.setAttribute("aria-pressed", String(dark))
  themeToggle.setAttribute("aria-label", dark ? "Use light color scheme" : "Use dark color scheme")
})

function selectCell(cell, moveFocus = false) {
  if (!cell) return

  for (const gridCell of gridCells) {
    const selected = gridCell === cell
    gridCell.classList.toggle("is-selected", selected)
    gridCell.tabIndex = selected ? 0 : -1
    gridCell.setAttribute("aria-selected", String(selected))
  }

  for (const row of document.querySelectorAll(".pg-sheet tbody tr")) {
    row.classList.toggle("is-active-row", row.contains(cell))
  }

  for (const header of document.querySelectorAll("[data-column-header]")) {
    header.classList.toggle("is-active", header.dataset.columnHeader === cell.dataset.column)
  }

  for (const header of document.querySelectorAll("[data-row-header]")) {
    header.classList.toggle("is-active", header.dataset.rowHeader === cell.dataset.row)
  }

  const coordinate = cell.dataset.cell
  nameBox.textContent = coordinate
  formulaInput.value = cell.dataset.formula ?? cell.textContent.trim()
  selectionStatus.textContent = `Selected: ${coordinate}`

  if (moveFocus) cell.focus()
}

function adjacentCell(cell, key) {
  const row = Number(cell.dataset.row)
  const columnCode = cell.dataset.column.charCodeAt(0)
  const nextRow = row + (key === "ArrowDown" ? 1 : key === "ArrowUp" ? -1 : 0)
  const nextColumnCode = columnCode + (key === "ArrowRight" ? 1 : key === "ArrowLeft" ? -1 : 0)

  if (nextRow < 2 || nextRow > 9 || nextColumnCode < 65 || nextColumnCode > 72) return null
  return document.querySelector(`[data-row="${nextRow}"][data-column="${String.fromCharCode(nextColumnCode)}"]`)
}

for (const cell of gridCells) {
  cell.addEventListener("click", () => selectCell(cell, true))
  cell.addEventListener("focus", () => selectCell(cell))
  cell.addEventListener("keydown", (event) => {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return
    const nextCell = adjacentCell(cell, event.key)
    if (!nextCell) return
    event.preventDefault()
    selectCell(nextCell, true)
  })
}

recordFilter.addEventListener("input", () => {
  const query = recordFilter.value.trim().toLocaleLowerCase()
  let visibleCount = 0

  for (const row of recordRows) {
    const visible = row.textContent.toLocaleLowerCase().includes(query)
    row.hidden = !visible
    if (visible) visibleCount += 1
  }

  recordCount.textContent = `${visibleCount} record${visibleCount === 1 ? "" : "s"}`
})

for (const tab of document.querySelectorAll(".pg-sheet-tabs [role='tab']")) {
  tab.addEventListener("click", () => {
    for (const sibling of document.querySelectorAll(".pg-sheet-tabs [role='tab']")) {
      sibling.setAttribute("aria-selected", String(sibling === tab))
    }
  })
}

zoomInput.addEventListener("input", () => {
  const value = Number(zoomInput.value)
  zoomOutput.value = `${value}%`
  shell.style.zoom = value / 100
  shell.style.width = `${10000 / value}vw`
  shell.style.height = `${10000 / value}vh`
})

activateView("workbook")
setDensity("compact")
selectCell(document.querySelector('[data-cell="D5"]'))
