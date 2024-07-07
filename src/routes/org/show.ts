import express, { Request, Response } from "express";
import { NotFound } from "../../error/NotFound";
import { paramsChecker } from "../../middleware/paramsChecker";
import { requireAuth } from "../../middleware/requireAuth";
import Org from "../../model/Organisation";

const router = express.Router();

router.get(
  "/:id",
  requireAuth,
  paramsChecker("id"),
  async (req: Request, res: Response) => {
    const org = await Org.findById(req.params.id);

    if (!!org) throw new NotFound("Organisation not found");

    res.status(200).json({
      status: "success",
      message: "Load data",
      data: org,
    });
  }
);

export { router as showOrgRouter };
