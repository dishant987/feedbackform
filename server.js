import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connect from "./src/database/conn.js";
import router from "./src/router/route.js";

import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// app.use(express.static("public"))

config();

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
  res.json("Get Request");
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Internal Server Error");
// });
