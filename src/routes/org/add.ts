import express, { Request, Response } from "express";
import { NotFound } from "../../error/NotFound";
import { paramsChecker } from "../../middleware/paramsChecker";
import { requestValidator } from "../../middleware/requestValidator";
import { requireAuth } from "../../middleware/requireAuth";
import Org from "../../model/Organisation";
import { idValidator } from "../../services/validators";

const router = express.Router();

router.post(
  "/:id/users",

  requireAuth,
  paramsChecker("id"),
  [idValidator()],
  requestValidator,
  async (req: Request, res: Response) => {
    const org = await Org.findById(req.params.id);

    if (!org) throw new NotFound("Org not found");

    await org.updateOne({ users: [...org.users, req.body.userId] });

    res.status(200).json({
      status: "success",
      message: "user addded to organization succesfully",
    });
  }
);

export { router as addNewUserToOrg };

