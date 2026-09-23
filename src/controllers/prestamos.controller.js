import { json } from "express";
import prisma from "../db.js";

export const postPrestamo = async (req, res) => {
  const { libroId } = req.body;
  const libro = await prisma.libro.findUnique({
    where: {
      id: libroId,
    },
  });
  if (!libro) {
    return res.status(400).json({
      error: "No existe un libro con ese id",
    });
  }
  if (libro.disponible === false) {
    return res.status(400).json({
      error: "No puedes tomar prestado un libro no disponible",
    });
  }

  const prestamo = await prisma.prestamo.create({
    data: {
      usuarioId: req.usuario.id,
      libroId,
      fechaInicio: new Date
    },
  });

  const libroActualizado = await prisma.libro.update({
    where: {
      id: libro.id,
    },
    data: {
      disponible: false,
    },
  });

  res.status(201).json({ prestamo, libroActualizado });
};

export const putDevolverPrestamo = async (req, res) => {
  const id = parseInt(req.params.id);
  const prestamo = await prisma.prestamo.findUnique({ where: { id } });

  if (!prestamo) {
    return res.status(400).json({
      error: "No existe un prestamo con ese id",
    });
  }
  if (prestamo.fechaFin !== null) {
    return res.status(400).json({
      error: "No puedes devolver un prestamo ya devuelto",
    }); 
  }

  const prestamoActualizado = await prisma.prestamo.update({
    where: {
      id: prestamo.id,
    },
    data: {
      fechaFin: new Date,
    },
  });

  const libroActualizado = await prisma.libro.update({
    where: {
      id: prestamo.libroId,
    },
    data: {
      disponible: true,
    },
  });

  res.json({
    prestamoActualizado,
    libroActualizado,
  });
};

export const getPrestamos = async (req, res) => {
  if (req.usuario.rol !== "admin") {
    return res.status(401).json({
      error: "No estas autorizado para ver todos los prestamos",
    });
  }
  const prestamos = await prisma.prestamo.findMany();
  res.json({ prestamos });
};

export const getMisPrestamos = async (req, res) => {
  const misPrestamos = await prisma.prestamo.findMany({
    where: {
      usuarioId: req.usuario.id,
    },
  });
  res.json({ misPrestamos });
};
