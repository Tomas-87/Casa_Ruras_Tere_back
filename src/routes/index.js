import { Router } from "express";
import casaRoutes from "./casa.routes.js";

const router = Router();

router.use("/casa", casaRoutes);

export default router;
