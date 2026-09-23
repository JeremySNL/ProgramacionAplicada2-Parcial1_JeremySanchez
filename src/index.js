import "dotenv/config.js";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { verificarToken } from "./middlewares/auth.middleware.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import librosRoutes from "./routes/libros.routes.js";
import prestamosRoutes from "./routes/prestamos.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(loggerMiddleware);

// Rutas modulares
app.use("/auth", authRoutes);
app.use("/libros", verificarToken, librosRoutes);
app.use ("/prestamos", verificarToken, prestamosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
