import { Router } from "express";
import initUserModel from "../../model/user.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/", async (req, res) => {
  try {
    console.log("REGISTER HIT");
    console.log("BODY:", req.body);

    const { name, email, password, phone, age, gender, address } = req.body;

    if (!name || !email || !password || !phone || !age || !gender || !address) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const User = await initUserModel();

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      age,
      gender,
      address,
    });

    return res.status(201).json({
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
