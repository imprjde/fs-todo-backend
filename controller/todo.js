const fs = require("fs");
const model = require("../model/todo");
const Todo = model.Todo;

exports.createTodo = (req, res) => {
  const todo = new Todo(req.body);

  todo
    .save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getAllTodo = async (req, res) => {
  const userId = req.query.userId;
  try {
    let todos = await Todo.find({ userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  let todos = await Todo.findByIdAndUpdate(id, req.body);
  res.json(todos);
};

exports.deleteTodo = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTodo = await Todo.findByIdAndDelete({ _id: id });
    res.status(201).json(deletedTodo);
  } catch (error) {
    res.status(400).json(err);
  }
};
