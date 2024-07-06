import mongoose from "mongoose";
import app from "./app";

if (!process.env.MONGO_URI) throw new Error(" Mongo uri not found ");
if (!process.env.PORT) throw new Error(" port uri not found ");

const port = process.env.PORT || 8000;

console.log(process.env.MONGO_URI, "from the shit file------------");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successful"));

app.listen(port, () => {
  console.log("App running on port " + port);
});
