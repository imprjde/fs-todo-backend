const express = require("express");
const todoController = require("../controller/todo");
const router = express.Router();

router
  .post("/", todoController.createTodo)
  .get("/", todoController.getAllTodo)
  .delete("/:id", todoController.deleteTodo)
  .patch("/:id", todoController.updateTodo);

exports.router = router;
