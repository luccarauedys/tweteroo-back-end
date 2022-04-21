import express from "express";
import cors from "cors";
import { users, tweets } from "./data.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", (req, res) => {
  const user = req.body;
  users.push(user);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const tweet = req.body;
  tweets.push(tweet);
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  const tweetsList = tweets.slice(-10);
  res.json(tweetsList);
});

app.listen(5000);
