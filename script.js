(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  const piItems = document.querySelectorAll(".project-index .pi-item");
  const sections = document.querySelectorAll("main section[id]");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      menu.classList.toggle("is-open", !open);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        menu.classList.remove("is-open");
      });
    });
  }

  function setActive(id) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      // "Work" points at #gca; treat home as inactive once past hero
      const match = href === "#" + id;
      link.classList.toggle("is-active", match);
    });
    piItems.forEach((item) => {
      const match = item.getAttribute("data-section") === id;
      item.classList.toggle("is-active", match);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          if (id === "home") {
            navLinks.forEach((l) => l.classList.remove("is-active"));
            piItems.forEach((i) => i.classList.remove("is-active"));
            return;
          }
          // contact is nested in about; keep about active
          if (id === "contact") {
            setActive("about");
            return;
          }
          setActive(id);
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }

  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.addEventListener("play", () => {
      videos.forEach((other) => {
        if (other !== video && !other.paused) other.pause();
      });
    });
  });
})();
