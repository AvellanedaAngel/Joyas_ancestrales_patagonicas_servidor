const ENLACES = [
  ["Inicio", "index.html", ["index.html"]],
  ["Catálogo", "catalogo.html", ["catalogo.html", "pieza.html"]],
  ["Sobre el proyecto", "index.html#sobre-proyecto", []],
  ["Contacto", "#contacto", []]
];

document.addEventListener("DOMContentLoaded", () => {
  const pagina = location.pathname.split("/").pop() || "index.html";
  const enlaces = ENLACES.map(([texto, href, paginas]) => `
      <a href="${href}"${paginas.includes(pagina) ? ' aria-current="page"' : ""}>
        ${texto}
      </a>
    `).join("");

  document.body.insertAdjacentHTML("afterbegin", `
      <a class="saltar-contenido" href="#contenido-principal">
        Saltar al contenido principal
      </a>
    `);
  document.getElementById("encabezado").innerHTML = `
      <div>
        <div class="titulo">
          Joyería Ancestral Patagónica
        </div>
        <div class="sub">
          Biblioteca Virtual
        </div>
      </div>
      <nav aria-label="Principal">
        ${enlaces}
      </nav>`;
  document.getElementById("contacto").innerHTML = `
      <p class="copy">
        © 2026 Biblioteca Virtual de Joyería Ancestral Patagónica
      </p>`;
});
