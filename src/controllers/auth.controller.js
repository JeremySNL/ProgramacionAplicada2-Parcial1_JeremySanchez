import prisma from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registrar = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!nombre) {
      return res.status(400).json({
        error: "Nombre requerido",
      });
    }
    if (!email) {
      return res.status(400).json({
        error: "Email requerido",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Password requerido",
      });
    }

    const existe = await prisma.usuario.findUnique({ where: { email } });

    if (existe) {
      return res.status(400).json({
        error: "Ya existe un usuario con este email",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hash,
        rol: rol || "usuario",
      },
    });

    res.status(201).json({
      id: usuario.id,
      nombre: usuario.nombre,
      rol: usuario.rol,
    });
  } catch (error) {}
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        error: "Email requerido",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Password requerido",
      });
    }

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(400).json({
        error: "Usuario no existe",
      });
    }

    const valido = await bcrypt.compare(password, usuario.password);
    
    if (!valido) {
      return res.status(400).json({
        error: "Credenciales invalidas",
      });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({ token });
  } catch (error) {}
};
