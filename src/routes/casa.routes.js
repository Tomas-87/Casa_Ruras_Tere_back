import { Router } from "express";
import { getCasa } from "../controllers/casa.controller.js";
import { getImages, createImagen } from "../controllers/imagenes.controller.js";
import { getPrecioActual } from "../controllers/precios.controller.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/", getCasa);

router.get("/imagenes", getImages);
router.post("/imagenes", upload.single("image"), createImagen);

router.get("/precio", getPrecioActual);

export default router;
