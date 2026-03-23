import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../config/global.js";
import { Router } from "express";
import initusermodel from "../../model/user.js";

const route = Router();

route.put("/:id", async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return send(res, setErrmsg(RESPONSE.ERROR, "Request body is missing"));
  }

  const { name } = req.body;

  try {
    const user = await initusermodel();

    const [updated] = await user.update({ name: name }, { where: { id: id } });

    if (updated) {
      return send(
        res,
        setErrmsg(RESPONSE.SUCCESS, "Users updated successfully"),
      );
    } else {
      return send(res, setErrmsg(RESPONSE.ERROR, "Users not found"));
    }
  } catch (error) {
    return send(res, setErrmsg(RESPONSE.ERROR, error.message));
  }
});

export default route;
