import { Router } from "express";
import { getCasa } from "../controllers/casa.controller.js";
import { getImages, createImagen } from "../controllers/imagenes.controller.js";
import getPriceNow, {
  getTemporadas,
} from "../controllers/precios.controller.js";
import upload from "../middlewares/multer.js";
import { getBookingCalendar } from "../controllers/booking.controller.js";

const router = Router();

router.get("/", getCasa);
router.get("/imagenes", getImages);
router.post("/imagenes", upload.single("image"), createImagen);
router.get("/precio", getPriceNow);
router.get("/temporadas", getTemporadas);
router.get("/booking-calendar", getBookingCalendar);

export default router;
