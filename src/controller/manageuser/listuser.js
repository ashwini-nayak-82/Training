import { Router } from "express";
import initUserModel from "../../model/user.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    console.log("LIST USER HIT");

    const usermodel = await initUserModel();
    const users = await usermodel.findAll();

    return res.json({
      message: "Success",
      data: users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error",
    });
  }
});

export default router;
