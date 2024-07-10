import express, { Request, Response } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { registerUserRouter } from "./routes/auth/register";
import { loginRouter } from "./routes/auth/login";
import { NotFound } from "./error/NotFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { showRouter } from "./routes/auth/show";
import { allOrgRouter } from "./routes/org/all";
import { showOrgRouter } from "./routes/org/show";
import { newOrgRouter } from "./routes/org/new";
import { addNewUserToOrg } from "./routes/org/add";
import { currentUser } from "./middleware/currentUser";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    httpOnly: true,
    signed: false,
    secure: false,
  })
);

let rootUrl = "/api/auth";


app.get("/api", (req: Request, res: Response) => {
  res.send("Welcome!!!!!");
});

app.use(rootUrl, registerUserRouter);
app.use(rootUrl, loginRouter);
app.use(showRouter);

rootUrl = "/api/organisations";
app.use(currentUser);
app.use(rootUrl, allOrgRouter);
app.use(rootUrl, showOrgRouter);
app.use(rootUrl, newOrgRouter);
app.use(rootUrl, addNewUserToOrg);

app.all("*", () => {
  throw new NotFound("Route not found");
});

app.use(globalErrorHandler);

export default app;
