import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Casa from "../src/models/Casa.js";
import Review from "../src/models/Review.js";

let mongoServer;

// Arranque de Mongo en memoria
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  //crear casa en la bbdd
  await Casa.create({
    nombre: "Casa Rural Tere",
    descripcion: "Casa rural en Valderrobres",
    precio: 120,
    capacidad: 4,
    telefono: "600123123",
    estancia_minima: 2,
    imagenes: [
      {
        url: "https://ejemplo.com/fachada.jpg",
        title: "Fachada",
        description: "Entrada principal",
      },
    ],
    temporadas: [
      {
        nombre: "Temporada alta",
        fecha_inicio: new Date("2026-01-01"),
        fecha_fin: new Date("2026-12-31"),
        precio: 150,
      },
    ],
  });
  await Review.create({
    nombre: "Tomas",
    texto: "Casa limpia",
    puntuacion: 5,
    origen: "web",
  });
});

//para limpiar antes de cada test la bbdd
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("/GET /api/casa", () => {
  it("return casa", async () => {
    const res = await request(app).get("/api/casa");
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe("Casa Rural Tere");
    expect(res.body.descripcion).toBe("Casa rural en Valderrobres");
    expect(res.body.precio).toBe(120);
    expect(res.body.capacidad).toBe(4);
    expect(res.body.telefono).toBe("600123123");
    expect(res.body.estancia_minima).toBe(2);
    expect(Array.isArray(res.body.temporadas)).toBe(true);
  });
  it("return 404", async () => {
    const res = await request(app).get("/api/cas");
    expect(res.statusCode).toBe(404);
  });
});

describe("GET /api/casa/imagenes", () => {
  it("return array imagenes", async () => {
    const res = await request(app).get("/api/casa/imagenes");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Fachada");
  });
  it("return 404", async () => {
    const res = await request(app).get("/api/casa/imagen");
    expect(res.statusCode).toBe(404);
  });
});

describe("GET /api/casa/precio", () => {
  it("return price now", async () => {
    const res = await request(app).get("/api/casa/precio");
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.nombre).toBe("Temporada alta");
    expect(res.body.precio).toBe(150);
  });
  it("return 404", async () => {
    const res = await request(app).get("/api/casa/prec");
    expect(res.statusCode).toBe(404);
  });
});

describe("/GET /api/casa/temporadas", () => {
  it("Return array imagenes", async () => {
    const res = await request(app).get("/api/casa/temporadas");
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].nombre).toBe("Temporada alta");
    expect(res.body[0].fecha_inicio).toContain("2026-01-01");
    expect(res.body[0].fecha_fin).toContain("2026-12-31");
    expect(res.body[0].precio).toBe(150);
  });
  it("return 404", async () => {
    const res = await request(app).get("/api/casa/tempo");
    expect(res.statusCode).toBe(404);
  });
});

describe("GET /api/casa/review", () => {
  it("return reviews", async () => {
    const res = await request(app).get("/api/casa/review");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].nombre).toBe("Tomas");
    expect(res.body[0].texto).toBe("Casa limpia");
    expect(res.body[0].puntuacion).toBe(5);
    expect(res.body[0].origen).toBe("web");
  });
  it("return 404", async () => {
    const res = await request(app).get("/api/casa/revie");
    expect(res.status).toBe(404);
  });
});
