import express from "express";
import cors from "cors";
import { users, tweets } from "./data.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", (req, res) => {
  const user = req.body;
  users.push(user);
  res.send("Ok");
});

app.listen(5000);
