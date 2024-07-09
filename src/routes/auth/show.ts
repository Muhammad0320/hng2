import express, { Request, Response } from "express";
import { NotFound } from "../../error/NotFound";
import { currentUser } from "../../middleware/currentUser";
import { paramsChecker } from "../../middleware/paramsChecker";
import { requireAuth } from "../../middleware/requireAuth";
import User from "../../model/User";

const router = express.Router();

router.get(
  "/api/users/:id",
  currentUser,
  requireAuth,
  paramsChecker("id"),
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).select("-org");

    if (!user) throw new NotFound("User not found");

    res.status(200).json({
      status: "suceess",
      message: "Load data",
      data: {
        user,
      },
    });
  }
);

export { router as showRouter };

