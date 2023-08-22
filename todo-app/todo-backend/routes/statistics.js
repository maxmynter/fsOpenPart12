const express = require("express")
const redis = require("../redis")

const router = express.Router()

router.get("/", async (req, res) => {
  const nTodos = Number(await redis.getAsync("added_todos"))
  res.json(nTodos)
})
module.exports = router
