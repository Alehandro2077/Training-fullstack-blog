import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import * as dotenv from "dotenv";

import checkAuth from "./utils/checkAuth.js";
import router from "./routes.js";

dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Db connected seccessfully"))
  .catch((err) => console.log("Db error: ", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post("/api/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.use("/api", router);

app.listen(process.env.PORT || 4040, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("===========Server started successfully=========");
});
