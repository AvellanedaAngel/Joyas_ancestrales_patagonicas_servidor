const DATOS = [
  ["Tipología", "tipo"], 
  ["Material", "material"], 
  ["Procedencia", "procedencia"]
];

document.addEventListener("DOMContentLoaded", async () => {
  const ficha = document.getElementById("ficha-pieza");
  const volver = `
    <a href="catalogo.html" class="btn">
        Volver al catálogo
    </a>
    `;

    try {
    const p = await pedirJSON(`/api/piezas/${encodeURIComponent(new URLSearchParams(location.search).get("id"))}`);
    document.title = `${p.nombre} — Biblioteca Virtual`;
    ficha.innerHTML = `
      <h1>
        ${escaparHTML(p.nombre)}
      </h1>
      <figure>
        <img src="${escaparHTML(p.imagen)}" alt="${escaparHTML(p.alt)}">
      </figure>
      <div>
        <h2>
          Descripción
        </h2>
        <p>
          ${escaparHTML(p.descripcion)}
        </p>
        <h2>
          Ficha técnica
        </h2>
        <dl>
          ${DATOS.map(([etiqueta, campo]) => `
              <dt>
                ${etiqueta}
              </dt>
              <dd>
                ${escaparHTML(p[campo])}
              </dd>
          `).join("")}
        </dl>
        ${volver}
      </div>`;
  } catch (error) {
    document.title = "Pieza no encontrada — Biblioteca Virtual";
    ficha.innerHTML = `
      <h1>
        No se pudo mostrar la pieza
      </h1>
      <div>
        <p class="mensaje-error" role="alert">
          ${escaparHTML(error.message)}
        </p>${volver}
      </div>`;
  }
  ficha.setAttribute("aria-busy", "false");
});
