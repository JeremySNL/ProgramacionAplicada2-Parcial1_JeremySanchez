import prisma from "../db.js";

export const getLibros = async (req, res) => {
  const libros = await prisma.libro.findMany();
  res.json({
    libros,
  });
};

export const createLibro = async (req, res) => {
  if (req.usuario.rol !== "admin") {
    return res.status(401).json({
      error: "No estas autorizado para crear libros",
    });
  }

  const { titulo, autor } = req.body;
  const libro = await prisma.libro.create({
    data: {
      titulo,
      autor,
    },
  });
  res.status(201).json({
    libro,
  });
};

export const deleteLibro = async (req, res) => {
  if (req.usuario.rol !== "admin") {
    return res.status(401).json({
      error: "No estas autorizado para eliminar libros",
    });
  }

  const id = parseInt(req.params.id);
  const libroEliminado = await prisma.libro.delete({
    where: {
        id
    }
  });

  if (!libroEliminado) {
    return res.status(401).json({
      error: "No existe ningun libro con ese id",
    });
  }
  res.json({ mensaje: "Libro eliminado correctamente" });
};
