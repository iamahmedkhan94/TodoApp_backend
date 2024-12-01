import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  userId: string; // Link todos to specific users
}

const todoSchema: Schema<ITodo> = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true },
});

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;