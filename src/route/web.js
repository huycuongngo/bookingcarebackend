import express from "express";

let router = express.Router()

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    res.send("hello world")
  })

  return app.use("/", router)
}

export default initWebRoutes
