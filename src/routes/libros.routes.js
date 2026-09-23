import { Router } from "express";
import {
  createLibro,
  deleteLibro,
  getLibros,
} from "../controllers/libros.controller.js";
import {
    validarAutor,
    validarId,
    validarTitulo
} from "../middlewares/validaciones.middlewares.js"

const router = Router();

router.get("/", getLibros);
router.post("/", validarTitulo, validarAutor, createLibro);
router.delete("/:id", validarId, deleteLibro);

export default router;
