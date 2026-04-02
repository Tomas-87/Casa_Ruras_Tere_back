import { describe, expect, it, jest } from "@jest/globals";
/*para no enviar el correo real*/
const sendMock = jest.fn().mockResolvedValue({
  data: { id: "test-id" },
  error: null,
});

jest.unstable_mockModule("resend", () => ({
  Resend: class {
    constructor() {}
    emails = {
      send: sendMock,
    };
  },
}));

const { default: request } = await import("supertest");
const { default: app } = await import("../src/app.js");

describe("POS /api/casa/reservas", () => {
  it("sen reserva sucessfully", async () => {
    const reserva = {
      nombre: "Tomas",
      apellidos: "Carreras",
      email: "tomas@email.com",
      telefono: "600123123",
      entrada: "2026-08-10",
      salida: "2026-08-14",
      mensaje: "Querría saber disponibilidad",
    };

    const res = await request(app).post("/api/casa/reservas").send(reserva);
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.message).toBe("Correo enviado correctamente");
    expect(sendMock).toHaveBeenCalledTimes(1);
  });
  it("return 400 when required fields are missing", async () => {
    const reserva = {
      nombre: "Tomas",
      apellidos: "Carreras",
      email: "",
      telefono: "600123123",
      entrada: "2026-08-10",
      salida: "2026-08-14",
      mensaje: "Querría saber disponibilidad",
    };
    const res = await request(app).post("/api/casa/reservas").send(reserva);
    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.message).toBe("Faltan campos por rellenar");
  });
  it("return 400 when salida is before or equal to entrada", async () => {
    const reserva = {
      nombre: "Tomas",
      apellidos: "Carreras",
      email: "tomas@email.com",
      telefono: "600123123",
      entrada: "2026-08-10",
      salida: "2026-08-10",
      mensaje: "Querría saber disponibilidad",
    };

    const res = await request(app).post("/api/casa/reservas").send(reserva);
    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.message).toBe(
      "La fecha de salida debe ser posterior a la entrada",
    );
  });
  it("retunr 400 when email is invalid", async () => {
    const reserva = {
      nombre: "Tomas",
      apellidos: "Carreras",
      email: "tomasemail.com",
      telefono: "600123123",
      entrada: "2026-08-10",
      salida: "2026-08-14",
      mensaje: "Querría saber disponibilidad",
    };

    const res = await request(app).post("/api/casa/reservas").send(reserva);
    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.message).toBe("El email no es válido");
  });
  it("return 400 when phone is invalid", async () => {
    const reserva = {
      nombre: "Tomas",
      apellidos: "Carreras",
      email: "tomas@email.com",
      telefono: "abc",
      entrada: "2026-08-10",
      salida: "2026-08-14",
      mensaje: "Querría saber disponibilidad",
    };

    const res = await request(app).post("/api/casa/reservas").send(reserva);
    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.message).toBe("Teléfono inválido");
  });
});
