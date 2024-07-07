import express, { Request, Response } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { paramsChecker } from "../../middleware/paramsChecker";
import User from "../../model/User";
import { BadRequest } from "../../error/BadRequest";

const router = express.Router();

router.get(
  "/api/users/:id",
  requireAuth,
  paramsChecker("id"),
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user) throw new BadRequest("User not found");

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
