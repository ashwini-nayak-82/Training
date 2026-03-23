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
      res.status(404).send("User Not Found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default route;
