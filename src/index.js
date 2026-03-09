import "dotenv/config";
import express from "express";
import cors from "cors";

import routes from "./routes/index.js";

const app = express(),
  PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
