const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const header = document.querySelector(".site-header");
const navLinks = [...document.querySelectorAll(".nav-links a[href^='#']")];
const sections = [...document.querySelectorAll("main section[id]")];
const themeMeta = document.querySelector('meta[name="theme-color"]');

function updateThemeColor(theme) {
  if (themeMeta) {
    themeMeta.setAttribute("content", theme === "dark" ? "#0b1020" : "#f7f9fc");
  }
}

updateThemeColor(root.dataset.theme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
  updateThemeColor(nextTheme);
});

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 12);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + visible.target.id
        );
      });
    },
    {
      rootMargin: "-24% 0px -62% 0px",
      threshold: [0.05, 0.2, 0.5],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
