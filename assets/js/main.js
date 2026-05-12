const SITE_CONFIG = {
  eventDate: "2026-06-04T15:00:00-06:00",
  links: {
    // Reemplaza estos valores cuando tengas los formularios finales.
    regional: "https://forms.office.com/Pages/ResponsePage.aspx?id=NCEVQIpv90a8IiQPfHwkVcZhwcNBnj1MpabWaYsnFaVUM0kxWko2SVk1UVpFNUNET0lTUjVISjMwUy4u",
    reto: "https://preuniversitarios.ibero.mx/futbotmx/",
    transmision: "https://forms.office.com/Pages/ResponsePage.aspx?id=NCEVQIpv90a8IiQPfHwkVcZhwcNBnj1MpabWaYsnFaVUOFdaRUlNSUxDMVYyVjFGRzYxWjRZUk1UQS4u"
  }
};

function applyConfiguredLinks() {
  document.querySelectorAll("[data-link]").forEach((element) => {
    const key = element.dataset.link;
    const url = SITE_CONFIG.links[key];
    if (!url) return;
    element.setAttribute("href", url);
    if (url.startsWith("http")) {
      element.setAttribute("target", "_blank");
      element.setAttribute("rel", "noopener");
    }
  });
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupCountdown() {
  const el = document.getElementById("countdownDays");
  if (!el) return;
  const target = new Date(SITE_CONFIG.eventDate).getTime();
  const now = Date.now();
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  el.textContent = diff > 0 ? diff : "0";
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfiguredLinks();
  setupNav();
  setupCountdown();
  setupReveal();
});
