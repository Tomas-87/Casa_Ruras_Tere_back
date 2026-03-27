import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const reservasEmail = async (req, res) => {
  try {
    const { nombre, apellidos, email, telefono, entrada, salida, mensaje } =
      req.body;

    if (
      !nombre?.trim() ||
      !apellidos?.trim() ||
      !email?.trim() ||
      !telefono?.trim() ||
      !entrada?.trim() ||
      !salida?.trim()
    ) {
      return res
        .status(400)
        .json({ ok: false, message: "Faltan campos por rellenar" });
    }

    if (new Date(salida) <= new Date(entrada)) {
      return res.status(400).json({
        ok: false,
        message: "La fecha de salida debe ser posterior a la de la entrada",
      });
    }

    if (!email.includes("@")) {
      return res
        .status(400)
        .json({ ok: false, message: "El email no es valido" });
    }

    if (isNaN(telefono.trim()) || telefono.trim().length < 9) {
      return res.status(400).json({ ok: false, message: "Telefono invalido" });
    }

    //enviar al correo el formulario////////////////////////////
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_TO,
      subject: "Nueva solicitud de reserva",
      replyTo: email,
      text: `
        Nombre: ${nombre}
        Apellidos: ${apellidos}
        Email: ${email}
        Telefono: ${telefono}
        Entrada: ${entrada}
        Salida: ${salida}
        Mensaje: ${mensaje?.trim() || "Sin mensaje"}
        `,
    });
    ///////////////////////////////////////////////
    return res
      .status(200)
      .json({ ok: true, message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("ERROR RESERVAS:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al enviar el correo",
    });
  }
};

export default reservasEmail;
