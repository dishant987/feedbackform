import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connect from "./src/database/conn.js";
import router from "./src/router/route.js";
import cookieParser from "cookie-parser";

config();

const app = express();

const corsOptions = {
  origin: "https://feedbackform-fronted-fetgoq751-dishant987s-projects.vercel.app/", // Ensure this matches exactly
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 3000;

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  });

app.use("/api", router);

app.get("/", (req, res) => {
  res.json("Testing");
});

// Ensure this is placed after all other middleware and routes to catch errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});
