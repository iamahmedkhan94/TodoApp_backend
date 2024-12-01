import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { AuthRequest } from "../types";

const router = express.Router();

router.post("/register", async (req : AuthRequest,res : express.Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).send("User registered");
});

router.post("/login", async (req : AuthRequest,res : express.Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.userId = user.id;
    await req.session.save(); // Explicitly save the session
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

router.get("/profile", (req : AuthRequest,res : express.Response) => {
  if (req.session.userId) {
    res.send("Welcome to your profile");
  } else {
    res.status(401).send("Unauthorized");
  }
});

router.post("/logout", (req : AuthRequest,res : express.Response) => {
  req.session.destroy(() => {
    res.send("Logged out");
  });
});

router.get("/session", (req : AuthRequest,res : express.Response) => {
  if (req.session?.userId) {
    res.json({ isLogin: true });
  } else {
    res.json({ isLogin: false });
  }
});

export default router;