import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connection_db from "./config/connection_db.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/post.js";
import exerciseRouter from "./routes/exercise.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.options("/*",cors());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/", (req, res, next) => {
  res.send("Welcome");
});
try {
  await connection_db();
  app.listen(port);
  console.log(
    `Server connected on port ${port}.
    Welcome in our system.`
  );
} catch (error) {
  console.log(error);
}
