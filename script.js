(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  const piItems = document.querySelectorAll(".project-index .pi-item");
  const sections = document.querySelectorAll("main section[id]");
  const yearEl = document.getElementById("year");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox ? lightbox.querySelector(".lightbox-img") : null;
  const lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;

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

  /* WantLocker board lightbox */
  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.hidden = true;
    lightboxImg.src = "";
    lightboxImg.alt = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".edit-card[data-lightbox]").forEach((card) => {
    const open = () => {
      const src = card.getAttribute("data-lightbox");
      const img = card.querySelector("img");
      openLightbox(src, img ? img.alt : "");
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  /* Campus Closet before/after compare — swap files later, keep filenames */
  document.querySelectorAll("[data-ba-compare]").forEach((root) => {
    const beforeWrap = root.querySelector(".ba-compare-before");
    const beforeImg = root.querySelector(".ba-compare-img--before");
    const handle = root.querySelector(".ba-compare-handle");
    if (!beforeWrap || !beforeImg || !handle) return;

    const setPos = (pct) => {
      const p = Math.max(0, Math.min(100, pct));
      beforeWrap.style.width = p + "%";
      handle.style.left = p + "%";
      handle.setAttribute("aria-valuenow", String(Math.round(p)));
      // keep before image full-frame width so it doesn't squash as the clip shrinks
      beforeImg.style.width = root.clientWidth + "px";
    };

    const fromEvent = (clientX) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width) return;
      setPos(((clientX - rect.left) / rect.width) * 100);
    };

    let dragging = false;
    const start = (e) => {
      dragging = true;
      root.classList.add("is-dragging");
      if (e.touches) fromEvent(e.touches[0].clientX);
      else fromEvent(e.clientX);
      e.preventDefault();
    };
    const move = (e) => {
      if (!dragging) return;
      if (e.touches) fromEvent(e.touches[0].clientX);
      else fromEvent(e.clientX);
    };
    const end = () => {
      dragging = false;
      root.classList.remove("is-dragging");
    };

    root.addEventListener("mousedown", start);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    root.addEventListener("touchstart", start, { passive: false });
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", end);

    handle.addEventListener("keydown", (e) => {
      const now = Number(handle.getAttribute("aria-valuenow") || 50);
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPos(now - 3);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setPos(now + 3);
      } else if (e.key === "Home") {
        e.preventDefault();
        setPos(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setPos(100);
      }
    });

    const syncWidth = () => setPos(Number(handle.getAttribute("aria-valuenow") || 50));
    window.addEventListener("resize", syncWidth);
    if (beforeImg.complete) syncWidth();
    else beforeImg.addEventListener("load", syncWidth);
    setPos(50);
  });
})();
