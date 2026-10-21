// Animación al hacer scroll (fade-up) usando IntersectionObserver
document.addEventListener("DOMContentLoaded", function () {
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));

  // Cierra el menú colapsado al hacer clic en un link (móvil)
  const navLinks = document.querySelectorAll(".navbar-pethome .nav-link");
  const navCollapse = document.querySelector(".navbar-collapse");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navCollapse && navCollapse.classList.contains("show")) {
        new bootstrap.Collapse(navCollapse).hide();
      }
    });
  });

  // ---- Filtro de catálogo + contador humano ----
  const filtroBtns = document.querySelectorAll(".filtro-btn");
  const petCards = document.querySelectorAll(".pet-card-item");
  const contador = document.getElementById("filtro-contador");

  function actualizarContador() {
    if (!contador) return;
    const visibles = Array.from(petCards).filter(
      (card) => card.style.display !== "none"
    ).length;
    contador.textContent = visibles === 1
      ? "1 mascota esperando una familia"
      : `${visibles} mascotas esperando una familia`;
  }

  if (filtroBtns.length) {
    filtroBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filtroBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const especie = btn.dataset.especie;
        petCards.forEach((card) => {
          if (especie === "todas" || card.dataset.especie === especie) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
        actualizarContador();
      });
    });
    actualizarContador();
  }

  // ---- Selección visual de rol (registro) ----
  const roleChoices = document.querySelectorAll(".role-choice");
  if (roleChoices.length) {
    roleChoices.forEach((choice) => {
      choice.addEventListener("click", () => {
        roleChoices.forEach((c) => c.classList.remove("active"));
        choice.classList.add("active");
        const input = choice.querySelector("input[type=radio]");
        if (input) input.checked = true;
      });
    });
  }

  // ---- Validación simple de formularios (Bootstrap) ----
  const forms = document.querySelectorAll(".needs-validation");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
      if (form.checkValidity()) {
        const successBox = form.querySelector(".form-success-msg");
        if (successBox) successBox.classList.remove("d-none");
      }
    });
  });

  // ---- Evita que el carrusel "salte" el contenido de abajo ----
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const inner = carousel.querySelector(".carousel-inner");
    const items = carousel.querySelectorAll(".carousel-item");

    function ajustarAlturaCarrusel() {
      let maxAltura = 0;
      items.forEach((item) => {
        const estabaActivo = item.classList.contains("active");
        if (!estabaActivo) {
          item.style.display = "block";
          item.style.position = "absolute";
          item.style.visibility = "hidden";
        }
        maxAltura = Math.max(maxAltura, item.offsetHeight);
        if (!estabaActivo) {
          item.style.display = "";
          item.style.position = "";
          item.style.visibility = "";
        }
      });
      inner.style.height = maxAltura + "px";
    }

    ajustarAlturaCarrusel();
    window.addEventListener("resize", ajustarAlturaCarrusel);
    carousel.addEventListener("slid.bs.carousel", ajustarAlturaCarrusel);
    carousel.querySelectorAll("img").forEach((img) => {
      img.addEventListener("load", ajustarAlturaCarrusel);
    });
  });
});
