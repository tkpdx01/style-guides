const app = document.querySelector(".pu-app")
const body = document.body
const pageLinks = [...document.querySelectorAll("[data-page-link]")]
const pages = [...document.querySelectorAll("[data-page]")]
const currentPage = document.querySelector("[data-current-page]")
const densityButtons = [...document.querySelectorAll("[data-density-value]")]
const themeToggle = document.querySelector("[data-theme-toggle]")
const sidebarToggle = document.querySelector("[data-sidebar-toggle]")
const sidebarClose = document.querySelector("[data-sidebar-close]")
const projectSearch = document.querySelector("[data-project-search]")
const projectStatus = document.querySelector("[data-project-status]")
const projectRows = [...document.querySelectorAll("[data-project-row]")]
const projectCount = document.querySelector("[data-project-count]")
const projectEmpty = document.querySelector("[data-project-empty]")
const settingsSave = document.querySelector("[data-save-settings]")
const toast = document.querySelector("[data-toast]")
let toastTimer

function pageLabel(page) {
  return page.charAt(0).toUpperCase() + page.slice(1)
}

function activatePage(page, moveFocus = false) {
  const targetPage = pages.find((panel) => panel.dataset.page === page)
  if (!targetPage) return

  for (const panel of pages) {
    panel.hidden = panel !== targetPage
  }

  for (const link of pageLinks) {
    if (link.dataset.pageLink === page) link.setAttribute("aria-current", "page")
    else link.removeAttribute("aria-current")
  }

  currentPage.textContent = pageLabel(page)
  app.dataset.sidebarOpen = "false"
  sidebarToggle.setAttribute("aria-expanded", "false")

  if (moveFocus) {
    const heading = targetPage.querySelector("h1")
    if (heading) {
      heading.tabIndex = -1
      heading.focus()
    }
  }
}

for (const link of pageLinks) {
  link.addEventListener("click", () => activatePage(link.dataset.pageLink, true))
}

document.querySelector("[data-go-projects]").addEventListener("click", () => activatePage("projects", true))
for (const button of document.querySelectorAll("[data-go-overview]")) {
  button.addEventListener("click", () => activatePage("overview", true))
}

function setDensity(density) {
  body.dataset.density = density
  for (const button of densityButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.densityValue === density))
  }
}

for (const button of densityButtons) {
  button.addEventListener("click", () => setDensity(button.dataset.densityValue))
}

function setColorScheme(scheme) {
  const dark = scheme === "dark"
  if (dark) body.dataset.colorScheme = "dark"
  else delete body.dataset.colorScheme
  themeToggle.setAttribute("aria-pressed", String(dark))
  themeToggle.setAttribute("aria-label", dark ? "Use light color scheme" : "Use dark color scheme")
}

themeToggle.addEventListener("click", () => {
  setColorScheme(body.dataset.colorScheme === "dark" ? "light" : "dark")
})

function setSidebar(open) {
  app.dataset.sidebarOpen = String(open)
  sidebarToggle.setAttribute("aria-expanded", String(open))
  sidebarToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation")
}

sidebarToggle.setAttribute("aria-expanded", "false")
sidebarToggle.addEventListener("click", () => setSidebar(app.dataset.sidebarOpen !== "true"))
sidebarClose.addEventListener("click", () => setSidebar(false))

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || app.dataset.sidebarOpen !== "true") return
  setSidebar(false)
  sidebarToggle.focus()
})

function filterProjects() {
  const query = projectSearch.value.trim().toLocaleLowerCase()
  const status = projectStatus.value
  let visible = 0

  for (const row of projectRows) {
    const matchesQuery = row.textContent.toLocaleLowerCase().includes(query)
    const matchesStatus = status === "all" || row.dataset.projectStatusValue === status
    const show = matchesQuery && matchesStatus
    row.hidden = !show
    if (show) visible += 1
  }

  projectCount.textContent = `${visible} project${visible === 1 ? "" : "s"}`
  projectEmpty.hidden = visible !== 0
}

projectSearch.addEventListener("input", filterProjects)
projectStatus.addEventListener("change", filterProjects)

for (const button of document.querySelectorAll(".pu-view-switch button")) {
  button.addEventListener("click", () => {
    for (const sibling of document.querySelectorAll(".pu-view-switch button")) {
      sibling.setAttribute("aria-pressed", String(sibling === button))
    }
  })
}

for (const link of document.querySelectorAll(".pu-settings-nav a")) {
  link.addEventListener("click", () => {
    for (const sibling of document.querySelectorAll(".pu-settings-nav a")) {
      if (sibling === link) sibling.setAttribute("aria-current", "location")
      else sibling.removeAttribute("aria-current")
    }
  })
}

settingsSave.addEventListener("click", () => {
  clearTimeout(toastTimer)
  toast.hidden = false
  toastTimer = setTimeout(() => {
    toast.hidden = true
  }, 2600)
})

const parameters = new URLSearchParams(window.location.search)
const requestedPage = parameters.get("page")
const requestedDensity = parameters.get("density")
const requestedScheme = parameters.get("scheme")

activatePage(pages.some((page) => page.dataset.page === requestedPage) ? requestedPage : "overview")
setDensity(requestedDensity === "comfortable" ? "comfortable" : "compact")
setColorScheme(requestedScheme === "dark" ? "dark" : "light")
filterProjects()
