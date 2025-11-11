function getBasePath() {
  const path = window.location.pathname;
  const depth = path.split("/").length - 2; 
  return "../".repeat(depth);
}


async function loadComponent({ html, css, selector }, position = "beforeend") {
  try {
    const response = await fetch(html);
    if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);
    
    const content = await response.text();
    document.body.insertAdjacentHTML(position, content);

    if (!document.querySelector(`link[href="${css}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = css;
      document.head.appendChild(link);
    }

    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) element.classList.add("loaded");
    }, 100);

  } catch (error) {
    console.error(`Erro ao carregar ${html}:`, error);
  }
}

async function initLayout() {
  const base = getBasePath();

  await loadComponent({
    html: `${base}components/header.html`,
    css: `${base}assets/css/header.css`,
    selector: "header"
  }, "afterbegin");

  await loadComponent({
    html: `${base}components/footer.html`,
    css: `${base}assets/css/footer.css`,
    selector: "footer"
  }, "beforeend");

  requestAnimationFrame(() => {
    const userHeader = document.getElementById("dropdownHeader");
    const userMenu = document.getElementById("dropdownMenu");
    const logoutHeader = document.getElementById("logoutDropdownHeader");
    const logoutMenu = document.getElementById("logoutDropdownMenu");

    if (userHeader && userMenu) {
      userHeader.addEventListener("click", () => userMenu.classList.toggle("show"));
    }

    if (logoutHeader && logoutMenu) {
      logoutHeader.addEventListener("click", () => logoutMenu.classList.toggle("show"));
    }

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".dropdown-container") && userMenu)
        userMenu.classList.remove("show");
      if (!event.target.closest(".logout-dropdown-container") && logoutMenu)
        logoutMenu.classList.remove("show");
    });

    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        const loginPath = `${base}pages/login.html`;
        window.location.href = loginPath;
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", initLayout);
