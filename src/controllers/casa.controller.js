import Casa from "../models/Casa.js";
import Review from "../models/Review.js";

export const getCasa = async (req, res) => {
  try {
    const casa = await Casa.findOne().lean();
    const review = await Review.find().lean();

    if (!casa) {
      return res.status(404).json({ error: "Casa no encontrada" });
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const temporadasOrdenadas = [...(casa.temporadas || [])].sort(
      (a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio),
    );

    const precioActual =
      temporadasOrdenadas.find((t) => {
        const inicio = new Date(t.fecha_inicio);
        const fin = new Date(t.fecha_fin);
        inicio.setHours(0, 0, 0, 0);
        fin.setHours(23, 59, 59, 999);
        return hoy >= inicio && hoy <= fin;
      }) || null;

    const {
      nombre,
      descripcion,
      precio,
      capacidad,
      telefono,
      estancia_minima,
      imagenes = [],
    } = casa;

    res.json({
      id: casa._id.toString(),
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      capacidad: capacidad,
      telefono: telefono,
      estancia_minima: estancia_minima,
      imagenes: imagenes || [],
      temporadas: temporadasOrdenadas,
      precioActual,
      precioMostrado: precioActual ? precioActual.precio : precio,
      review: review,
    });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};
