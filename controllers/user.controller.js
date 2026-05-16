import mongoose from "mongoose";
import User from "../models/user.model.js";
import { generateToken } from "../utils/util.js";
import argon2d from "argon2";

export const CreateAccount = async (req, res) => {
  const { user_name, email, password } = req.body;
  try {
    const userEmailExists = await User.findOne({ email }).collation({
      locale: "fr",
      strength: 2,
    });
    const userNameExists = await User.findOne({ user_name }).collation({
      locale: "fr",
      strength: 2,
    });

    if (userEmailExists) {
      return res
        .status(409)
        .json({ message: "L'adresse e-mail est déjà utilisée" });
    }

    if (userNameExists) {
      return res
        .status(409)
        .json({ message: "Le nom d'utilisateur est déjà utilisé" });
    }

    const hashedPassword = await argon2d.hash(password);
    const response = await User.create({
      user_name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      newUser: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Login = async (req, res) => {
  const { user_name, password } = req.body;
  try {
    const user = await User.findOne({ user_name }).collation({
      locale: "fr",
      strength: 2,
    });

    if (!user) {
      return res.status(404).json({ message: "Indentifiants incorrects" });
    }

    const isMatch = await argon2d.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Indentifiants incorrects" });
    }

    const token = generateToken({
      id: user._id,
      user_name: user.user_name,
      role: user.role,
    });
    return res.status(200).json({
      user: { id: user._id, user_name: user.user_name, role: user.role },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const GetUserById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const user = await User.findById(id, { password: 0 });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const GetAllUsers = async (req, res) => {
  try {
    const response = await User.find({}, { password: 0 });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const { user_name, email } = req.body;
  const data = { user_name, email };

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (user_name) {
      const userNameExists = await User.findOne({ user_name }).collation({
        locale: "fr",
        strength: 2,
      });

      if (userNameExists) {
        return res
          .status(409)
          .json({ message: "Le nom d'utilisateur est déjà utilisé" });
      }
    }

    if (email) {
      const userEmailExists = await User.findOne({ email }).collation({
        locale: "fr",
        strength: 2,
      });

      if (userEmailExists) {
        return res
          .status(409)
          .json({ message: "L'adresse e-mail est déjà utilisée" });
      }
    }

    const response = await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });

    return res.status(200).json({
      message: "Utilisateur mis à jour avec succès",
      updatedUser: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const DeleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    return res
      .status(200)
      .json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const GetProfile = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    return res.status(200).json({
      user: { id: user._id, user_name: user.user_name, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
