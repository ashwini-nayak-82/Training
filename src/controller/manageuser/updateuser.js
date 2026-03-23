import { Router } from "express";
import initusermodel from "../../model/user.js";

const route = Router();

route.put("/:id", async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const { name } = req.body;

  try {
    const user = await initusermodel();

    const [updated] = await user.update({ name: name }, { where: { id: id } });

    if (updated) {
      res.send("Users updated successfully");
    } else {
      res.status(404).send("Users not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default route;
