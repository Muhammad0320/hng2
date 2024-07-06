
// mongodb+srv://muhammad0320:muhammawwal@005@atlascluster.x1qxlkc.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster 

import mongoose from "mongoose";
import app from "./app";

if (!process.env.MONGO_URI) throw new Error(" Mongo uri not found ");
if (!process.env.PORT) throw new Error(" port uri not found ");

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successful"));

app.listen(port, () => {
  console.log("App running on port " + port);
});