import express, { Request, Response } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import Org from "../../model/Organisation";

const router = express.Router();

router.get("/", requireAuth, async (req: Request, res: Response) => {
  const alluserOrg = await Org.find({ userId: req.currentUser.userId });

  res.status(200).json({
    status: "success",
    message: "Load data",
    data: {
      orgs: alluserOrg,
    },
  });
});

export { router as allOrgRouter };
