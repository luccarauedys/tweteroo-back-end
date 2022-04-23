import express from "express"
import cors from "cors"
import { users, tweets } from "./data.js"

const app = express()
app.use(express.json())
app.use(cors())

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body
  if (username.length === 0 || avatar.length === 0) {
    res.status(400).send({ message: "Preencha todos os campos!" })
  } else {
    users.push({ username, avatar })
    res.status(201).send("OK")
  }
})

app.post("/tweets", (req, res) => {
  const { user } = req.headers
  const { tweet } = req.body
  if (tweet.length === 0) {
    res.status(400).send({ message: "Preencha o campo!" })
  } else {
    tweets.push({ username: user, tweet })
    res.status(201).send("OK")
  }
})

app.get("/tweets", (req, res) => {
  const tweetsList = tweets.slice(-10)
  const tweetsListWithAvatar = tweetsList.map((tweet) => {
    const author = users.find((user) => user.username == tweet.username)
    const { avatar } = author
    return { ...tweet, avatar }
  })
  res.json(tweetsListWithAvatar.reverse())
})

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params
  const tweetsOfUsername = tweets.filter((tweet) => tweet.username === username)
  res.status(200).send(tweetsOfUsername)
})

app.listen(5000)
