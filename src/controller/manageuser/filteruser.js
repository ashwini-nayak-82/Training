import { Router } from "express";
import initusermodel from "../../model/user.js";

const route = Router();

route.get("/", async (req, res) => {
  try {
    const user = await initusermodel();

    const { name, email, password, phone, age, gender, address } = req.query;

    let whereCondition = {};

    if (name) whereCondition.name = name;
    if (email) whereCondition.email = email;
    if (password) whereCondition.password = password;
    if (phone) whereCondition.phone = phone;
    if (age) whereCondition.age = age;
    if (gender) whereCondition.gender = gender;
    if (address) whereCondition.address = address;

    const data = await user.findAll({
      where: whereCondition,
    });

    return res.json({
      message: "Filtered data fetched successfully",
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default route;
