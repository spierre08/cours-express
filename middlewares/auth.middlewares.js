import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Vérification du header Authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Accès refusé. Token manquant.",
      });
    }

    // Extraction du token
    const token = authHeader.split(" ")[1];

    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérification utilisateur
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Utilisateur introuvable.",
      });
    }

    // Injection utilisateur dans la requête
    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Token invalide ou expiré.",
    });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Accès refusé. Rôle insuffisant." });
    }
    next();
  };
};
