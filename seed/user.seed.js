import User from "../models/user.model.js";
import argon2d from "argon2";
import dotenv from "dotenv";

dotenv.config();

export const seedAdmin = async () => {
  try {
    const isEmailExist = await User.findOne({ email: process.env.ADMIN });
    const isUsernameExist = await User.findOne({ username: process.env.ADMIN });

    if (!isEmailExist && !isUsernameExist) {
      const hashedPassword = await argon2d.hash(process.env.PASSWORD);
      const admin = new User({
        email: process.env.ADMIN,
        user_name: process.env.ADMIN,
        password: hashedPassword,
        role: "admin",
      });
      await admin.save();
      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    return console.log(error);
  }
};
