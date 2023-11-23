require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/Auth");
const imageRouter = require("./routes/image");
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

main().catch((err) => console.log("Database Connection Failed", err));

async function main() {
  await mongoose.connect(DB_URL);
  console.log("Database Connected Successfully");
}

server.use(cors());
server.use(bodyParser.json({ limit: "10mb" }));
server.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
server.use(express.json());

server.use(morgan("default"));
server.use(express.static(process.env.PUBLIC_DIR));
server.use("/todos", todoRouter.router);
server.use("/auth", userRouter.router);
server.use("/imageUpload", imageRouter.router);

server.listen(PORT, () => {
  console.log("Server Started...!!");
});
