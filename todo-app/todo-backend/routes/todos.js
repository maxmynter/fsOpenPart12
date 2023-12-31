const express = require("express")
const redis = require("../redis")
const { Todo } = require("../mongo")
const router = express.Router()

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })
  const NTodos = await redis.getAsync("added_todos")
  redis.setAsync("added_todos", NTodos ? Number(NTodos) + 1 : 1)
  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  try {
    req.todo = await Todo.findById(id)
  } catch (error) {
    console.log("Could not find entry with ID. Error: ", error)
  }
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  const todo = req.todo
  if (!todo) {
    return res.status(500).json({ message: "Error getting todo" })
  } else {
    return res.json(todo)
  }
})

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  try {
    await Todo.findOneAndUpdate({ _id: req.todo.id }, { $set: req.body })
    console.log(
      "🚀 ~ file: todos.js:54 ~ singleRouter.put ~ req.body:",
      req.body
    )
    res.send(200)
  } catch (error) {
    console.log("Error updating todo. Error:", error)
    res.sendStatus(400)
  }
})

router.use("/:id", findByIdMiddleware, singleRouter)

module.exports = router
