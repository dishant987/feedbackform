import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connect from "./src/database/conn.js";
import router from "./src/router/route.js";
import cookieParser from "cookie-parser";

config();

const app = express();

const corsOptions = {
  origin: 'https://feedbackform-fronted.vercel.app', // Ensure this matches exactly
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions)); // Apply CORS middleware first
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

app.get("/test", (req, res) => {
  res.json("Get Request testing");
});

// Ensure this is placed after all other middleware and routes to catch errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});
