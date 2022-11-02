import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import AuthRouter from "./routes/auth.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("connected", () => console.log("Connected to Database"));
db.once("disconnected", () => console.log("Disconnected from Database"));

app.use("/api/auth", AuthRouter);

app.use((err, _, res, __) => {
  const status = err.status || 500;
  const success = false;
  const message = err.message || "Something went wrong!";

  return res.status(status).json({ status, success, message });
});
