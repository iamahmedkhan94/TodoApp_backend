import express, {} from "express";
import Todo from "../models/Todo";
import { AuthRequest, TodoResponse } from "../types"; // Import your custom request type

const router = express.Router();

// Add a new todo
router.post("/", async (req : AuthRequest,res : TodoResponse) => {
  const { title } = req.body;
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const todo = new Todo({
      title,
      userId: req.session.userId,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Error adding todo" });
  }
});

// Get all todos for the logged-in user
router.get("/", async (req : AuthRequest,res : TodoResponse) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const todos = await Todo.find({ userId: req.session.userId });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Error fetching todos" });
  }
});

// Update a todo (mark as completed)
router.put("/:id", async (req : AuthRequest,res : TodoResponse) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.session.userId },
      { completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Error updating todo" });
  }
});

// Delete a todo
router.delete("/:id", async (req : AuthRequest,res : TodoResponse) => {
  const { id } = req.params;

  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.session.userId });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting todo" });
  }
});

export default router;
