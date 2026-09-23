export const validarTitulo = async (req, res, next) => {
  const { titulo } = req.body;
  if (!titulo) {
    res.status(400).json({
      error: "Titulo requerido",
    });
  }
  next();
};

export const validarAutor = async (req, res, next) => {
  const { autor } = req.body;
  if (!autor) {
    res.status(400).json({
      error: "Autor requerido",
    });
  }
  next();
};

export const validarId = async (req, res, next) => {
  if (isNaN(req.params.id)) {
    res.status(400).json({
      error: "El id debe ser un numero entero",
    });
  }
  if (parseInt(req.params.id) < 1) {
    res.status(400).json({
      error: "El id debe ser mayor que cero",
    });
  }
  next();
};

export const validarLibroId = async (req, res, next) => {
  const { libroId } = req.body;
  if (isNaN(libroId)) {
    res.status(400).json({
      error: "El id debe ser un numero entero",
    });
  }
  if (parseInt(libroId) < 1) {
    res.status(400).json({
      error: "El id debe ser mayor que cero",
    });
  }
  next();
};
