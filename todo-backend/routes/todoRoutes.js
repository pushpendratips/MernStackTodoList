const express = require("express");
const {Todo } = require("../models/todoModel"); 

const router = express.Router();

// Get all todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching todos', error });
  }
});

// Add a new todo
router.post("/todos", async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      completed: false,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).send({ message: 'Error adding todo', error });
  }
});

// Update a todo
router.put("/todos/:id", async (req, res) => {
  try {
    const { text, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text, completed },
      { new: true } 
    );

    if (!updatedTodo) {
      return res.status(404).send({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).send({ message: 'Error updating todo', error });
  }
});

// Delete a todo
router.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting todo', error });
  }
});

module.exports = router;
