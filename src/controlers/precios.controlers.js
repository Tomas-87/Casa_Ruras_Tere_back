import db from "../db/connection.js";

export default async function getPriceNow(req, res) {
  try {
    const [rows] = await db.query(`
            SELECT precio
            FROM temporadas
            WHERE CURDATE() BETWEEN fecha_inicio AND fecha_fin LIMIT 1
            `);

    if (rows.length === 0) {
      return res.status(404).json({ error: "No price found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
}
