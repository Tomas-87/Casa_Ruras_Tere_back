import db from "../db/connection.js";

export const getCasa = async (req, res) => {
  try {
    const [casas] = await db.query(`
      SELECT 
        id,
        nombre,
        descripcion,
        precio,
        capacidad,
        telefono,
        estancia_minima
      FROM casa
      LIMIT 1
    `);

    if (casas.length === 0) {
      return res.status(404).json({ error: "Casa no encontrada" });
    }

    const casa = casas[0];

    const [imagenes] = await db.query(
      `
      SELECT id, url, title
      FROM imagenes
      WHERE casa_id = ?
    `,
      [casa.id],
    );

    const [precios] = await db.query(`
      SELECT nombre, fecha_inicio, fecha_fin, precio
      FROM temporadas
      WHERE CURDATE() BETWEEN fecha_inicio AND fecha_fin
      LIMIT 1
    `);

    const [temporadas] = await db.query(`
      SELECT id, nombre, fecha_inicio, fecha_fin, precio
      FROM temporadas
      ORDER BY fecha_inicio ASC
    `);

    const precioActual = precios.length > 0 ? precios[0] : null;

    res.json({
      ...casa,
      imagenes,
      temporadas,
      precioActual,
      precioMostrado: precioActual ? precioActual.precio : casa.precio,
    });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};
