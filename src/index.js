import express from "express";
import cors from "cors";
import { users, tweets } from "./data.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", (req, res) => {
  const user = req.body;
  if (user.username.length === 0 || user.avatar.length < 10) {
    res.status(400).send({ message: "Informações inválidas ou faltando!" });
  } else {
    users.push(user);
    res.status(201).send("OK");
  }
});

app.post("/tweets", (req, res) => {
  const tweet = req.body;
  if (tweet.tweet.length === 0) {
    res.status(400).send({ message: "Preencha o campo!" });
  } else {
    tweets.push(tweet);
    res.status(201).send("OK");
  }
});

app.get("/tweets", (req, res) => {
  const tweetsList = tweets.slice(-10);
  res.json(tweetsList);
});

app.listen(5000);
