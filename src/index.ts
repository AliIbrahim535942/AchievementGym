import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/connection_db";
import userRouter from "./routes/users";
import exerciseRouter from "./routes/exercise";
import sessionRouter from "./routes/session";
import profileRouter from "./routes/profile";
import envVariables from "./config/dotenv_config";

const app = express();
const port = envVariables.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
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
async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(
        `Server connected on port ${port}.
    Welcome in our system.`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}
startServer();
