import Casa from "../models/Casa.js";

const getPriceNow = async (req, res) => {
  try {
    const casa = await Casa.findOne().lean();

    if (!casa) {
      return res.status(404).json({ error: "Casa no encontrada" });
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const precioActual =
      (casa.temporadas || []).find((t) => {
        const inicio = new Date(t.fecha_inicio);
        const fin = new Date(t.fecha_fin);

        inicio.setHours(0, 0, 0, 0);
        fin.setHours(23, 59, 59, 999);

        return hoy >= inicio && hoy <= fin;
      }) || null;

    res.json(precioActual);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

export const getTemporadas = async (req, res) => {
  try {
    const casa = await Casa.findOne().lean();

    if (!casa) {
      return res.status(404).json({ error: "Casa no encontrada" });
    }

    const temporadas = [...(casa.temporadas || [])].sort(
      (a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio),
    );

    res.json(temporadas);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

export default getPriceNow;
