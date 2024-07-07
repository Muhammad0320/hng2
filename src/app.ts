import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { registerUserRouter } from "./routes/auth/register";
import { loginRouter } from "./routes/auth/login";
import { NotFound } from "./error/NotFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { showRouter } from "./routes/auth/show";
import { allOrgRouter } from "./routes/org/all";

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

app.use(rootUrl, registerUserRouter);
app.use(rootUrl, loginRouter);
app.use(showRouter);

rootUrl = "/api/organisation";

app.use(rootUrl, allOrgRouter);


app.all("*", () => {
  throw new NotFound("Route not found");
});

app.use(globalErrorHandler);

export default app;

