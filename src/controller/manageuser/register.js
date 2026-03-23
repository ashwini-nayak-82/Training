import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../config/global.js";
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
      return send(res, setErrmsg(RESPONSE.REQUIRED, "All fields are required"));
    }

    const User = await initUserModel();

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return send(res, setErrmsg(RESPONSE.ERROR, "User already exists"));
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
    return send(res, RESPONSE.SUCCESS, newUser);
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return send(res, setErrmsg(RESPONSE.ERROR, error.message));
  }
});

export default router;
