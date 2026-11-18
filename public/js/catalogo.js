const POR_PAGINA = 2; // subir cuando haya más piezas
let pagina = 1;

const tarjeta = (p) => 
  `<li>
      <a href="pieza.html?id=${p.id}">
        <img src="${escaparHTML(p.imagen)}" alt="${escaparHTML(p.alt)}">
        <h2>
          ${escaparHTML(p.nombre)}
        </h2>
        <p>
          ${escaparHTML(p.tipo)} · ${escaparHTML(p.material)}
        </p>
      </a>
    </li>`;

async function cargar(numero) {
    const estado = document.getElementById("catalogo-estado");
    const lista = document.getElementById("catalogo-cuadro");
    estado.textContent = "Cargando piezas…";

    try {
        const { total, piezas } = await pedirJSON(`/api/piezas?cantidad=${POR_PAGINA}&from=${(numero - 1) * POR_PAGINA}`);
        const ultima = Math.max(1, Math.ceil(total / POR_PAGINA));
        const desde = (numero - 1) * POR_PAGINA + 1;

        pagina = numero;
        lista.innerHTML = piezas.map(tarjeta).join("");
        estado.textContent = total ? `Mostrando ${desde}–${desde + piezas.length - 1} de ${total} piezas.` : "Todavía no hay piezas cargadas.";
        document.getElementById("pagina-indicador").textContent = `Página ${pagina} de ${ultima}`;
        document.getElementById("pagina-anterior").disabled = pagina <= 1;
        document.getElementById("pagina-siguiente").disabled = pagina >= ultima;
    }catch (error) {
        lista.innerHTML = "";
        estado.textContent = `No se pudo cargar el catálogo. ${error.message}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("pagina-anterior").addEventListener("click", () => cargar(pagina - 1));
  document.getElementById("pagina-siguiente").addEventListener("click", () => cargar(pagina + 1));
  cargar(1);
});
