import prisma from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(400).json({
      error: "Token requerido",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      error: "Token requerido",
    });
  }

  try {
    const usuario = jwt.decode(token);
    req.usuario = usuario;
  } catch (error) {}
  next();
};
