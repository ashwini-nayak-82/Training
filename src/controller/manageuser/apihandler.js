import { Router } from "express";
import register from "./register.js";
import login from "./login.js";
import listuser from "./listuser.js";
import updateuser from "./updateuser.js";
import filteruser from "./filteruser.js";
import deleteuser from "./deleteuser.js";
const route = Router();

console.log("API HANDLER LOADED");

route.get("/test", (req, res) => {
  res.send("User route working");
});
route.use("/register", register);
route.use("/login", login);
route.use("/list", listuser);
route.use("/update", updateuser);
route.use("/filter", filteruser);
route.use("/delete", deleteuser);

export default route;
