import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../config/global.js";
import { Router } from "express";
import initusermodel from "../../model/user.js";

const route = Router();
route.delete("/:id", async (req, res) => {
  try {
    const user = await initusermodel();
    const id = req.params.id;
    const deleted = user.destroy({
      where: { id: id },
    });
    if (deleted) {
      res.send("User Deleted Successfully");
    } else {
      return send(res, setErrmsg("User Not Found"));
    }
  } catch (error) {
    return send(res, setErrmsg(RESPONSE.ERROR, error.message));
  }
});

export default route;
