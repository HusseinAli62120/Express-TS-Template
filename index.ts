import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import envPath from "./utils/checkEnvironment";
import authRoutes from "./routes/auth";

// Define the app
const app = express();

// Set up the environment variables
dotenv.config({ path: `./${envPath}` });

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// To use HTTP cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

const port = process.env.PORT;

// Routes
app.use("/auth", authRoutes);

// Start the app
app.listen(port, () => {
  const environment = process.env.NODE_ENV || "development";

  const colors: Record<string, string> = {
    development: "\x1b[42m", // green
    test: "\x1b[43m", // yellow
    production: "\x1b[41m", // red
  };

  const bg = colors[environment] || "\x1b[40m"; // fallback black
  const black = "\x1b[30m";
  const cyan = "\x1b[36m";
  const reset = "\x1b[0m";

  console.log(
    `\n${bg}${black} This is the ${environment} environment ${reset}`,
  );
  console.log(
    `Server running at ${cyan}${process.env.BACKEND_URL}:${port}${reset}`,
  );
});
