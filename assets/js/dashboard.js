async function loadComponent({ html, css, selector }, position = "beforeend") {
  try {
    const response = await fetch(html);
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
  await loadComponent({ html: "../components/header.html", css: "../assets/css/header.css", selector: "header" }, "afterbegin");
  await loadComponent({ html: "../components/footer.html", css: "../assets/css/footer.css", selector: "footer" }, "beforeend");

  setTimeout(() => {
    const userHeader = document.getElementById("dropdownHeader");
    const userMenu = document.getElementById("dropdownMenu");

    const logoutHeader = document.getElementById("logoutDropdownHeader");
    const logoutMenu = document.getElementById("logoutDropdownMenu");

    if (userHeader && userMenu) {
      userHeader.addEventListener("click", () => {
        userMenu.classList.toggle("show");
      });
    }

    if (logoutHeader && logoutMenu) {
      logoutHeader.addEventListener("click", () => {
        logoutMenu.classList.toggle("show");
      });
    }

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".dropdown-container") && userMenu) {
        userMenu.classList.remove("show");
      }
      if (!event.target.closest(".logout-dropdown-container") && logoutMenu) {
        logoutMenu.classList.remove("show");
      }
    });

    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "../pages/login.html";
      });
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", initLayout);
