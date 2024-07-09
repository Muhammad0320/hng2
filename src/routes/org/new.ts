import express, { Request, Response } from "express";
import { BadRequest } from "../../error/BadRequest";
import { requestValidator } from "../../middleware/requestValidator";
import { requireAuth } from "../../middleware/requireAuth";
import Org from "../../model/Organisation";
import { nameValidator } from "../../services/validators";

const router = express.Router();

router.post(
  "/",

  requireAuth,
  [nameValidator("name"), nameValidator("description")],
  requestValidator,
  async (req: Request, res: Response) => {
    const { name, description } = req.body;

    const existingOrg = await Org.findOne({ name });

    if (!!existingOrg) throw new BadRequest("Client error");

    const newOrg = await Org.buildOrg({
      description,
      name,
      userId: req.currentUser.userId,
    });

    res.status(200).json({
      status: "success",
      message: "Org creation successful",
      data: newOrg,
    });
  }
);

export { router as newOrgRouter };
