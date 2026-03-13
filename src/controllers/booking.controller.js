import ical from "node-ical";

export const getBookingCalendar = async (req, res) => {
  try {
    const url = process.env.BOOKING_ICAL_URL;

    if (!url) {
      return res.status(500).json({ error: "BOOKING_ICAL_URL no configurada" });
    }

    const data = await ical.async.fromURL(url);

    const reservas = Object.values(data)
      .filter((event) => event.type === "VEVENT")
      .map((event) => ({
        uid: event.uid,
        titulo: event.summary || "Reserva",
        fecha_inicio: event.start,
        fecha_fin: event.end,
      }))
      .sort((a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio));

    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error reading Booking calendar" });
  }
};
