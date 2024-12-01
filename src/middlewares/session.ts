import MongoStore from "connect-mongo";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "mysecret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // Use your MongoDB URI
  }),
  cookie: {
    secure: false, // Set true for HTTPS
    httpOnly: true,
    sameSite: "none", // Required for cross-origin
    maxAge: 1000 * 60 * 60, // 1 hour
  },
})

  


export default sessionMiddleware;
