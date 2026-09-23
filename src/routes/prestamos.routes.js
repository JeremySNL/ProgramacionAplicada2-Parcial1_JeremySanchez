import { Router } from "express";
import {
    getMisPrestamos,
    getPrestamos,
    postPrestamo,
    putDevolverPrestamo
} from "../controllers/prestamos.controller.js";
import {
    validarLibroId,
    validarId
} from "../middlewares/validaciones.middlewares.js";

const router = Router();

router.post("/", validarLibroId, postPrestamo);
router.get("/", getPrestamos);
router.get("/mis-prestamos", getMisPrestamos);
router.put("/:id/devolver", validarId, putDevolverPrestamo);

export default router;
