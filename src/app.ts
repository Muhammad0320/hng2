import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { globalErrorHandler, NotFound } from "@m0banking/common";
import { registerUserRouter } from "./routes/auth/register";
import { loginRouter } from "./routes/auth/login";

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

app.all("*", () => {
  throw new NotFound("Route not found");
});

app.use(globalErrorHandler);

export default app;
