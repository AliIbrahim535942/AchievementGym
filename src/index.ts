import express from "express";
import cors from "cors";
import path from "path";
import connection_db from "./config/connection_db.js";
import userRouter from "./routes/users.js";
import exerciseRouter from "./routes/exercise.js";
import sessionRouter from "./routes/session.js";
import profileRouter from "./routes/profile.js";
import envVariables from "./config/dotenv_config.js";

const app = express();
const port = envVariables.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.options("/*",cors());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/api/users", userRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/api/profiles", profileRouter);

app.use("/api/sessions", sessionRouter);
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
