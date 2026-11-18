const escaparHTML = (texto) => 
  String(texto ?? "").replace(/[&<>"']/g, (caracter) => `&#${caracter.charCodeAt(0)};`);

async function pedirJSON(url) {
  const respuesta = await fetch(url);
  const cuerpo = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    const error = cuerpo && cuerpo.error;
    throw new Error(
      error ? [error.mensaje, ...(error.detalles || [])].join(" ") :`Error ${respuesta.status} del servidor.
      `);
  }
  return cuerpo;
}