export const getCasa = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        c.id,
        c.nombre,
        c.descripcion,
        c.precio,
        c.capacidad,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'url', i.url,
            'title', i.title
          )
        ) AS imagenes
      FROM casa c
      LEFT JOIN imagenes i ON i.casa_id = c.id
      GROUP BY c.id
      LIMIT 1
    `);

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};
