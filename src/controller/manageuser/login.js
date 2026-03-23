import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../config/global.js";
import { Router } from "express";
import initUserModel from "../../model/user.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/", async (req, res) => {
  try {
    console.log("LOGIN HIT");
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return send(
        res,
        setErrmsg(RESPONSE.ERROR, "Email and password are required"),
      );
    }

    const User = await initUserModel();

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return send(
        res,
        setErrmsg(RESPONSE.ERROR, "Email and password are required"),
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return send(res, setErrmsg(RESPONSE.ERROR, "Invalid password"));
    }
    const userData = user.toJSON();
    delete userData.password;
    return send(res, RESPONSE.SUCCESS, "Login Successful");
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return send(res, setErrmsg(RESPONSE.ERROR, error.message));
  }
});

export default router;
