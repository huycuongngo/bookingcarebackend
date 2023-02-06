import express from "express";
import { getHomePage, getCRUD, postCRUD } from '../controllers/homeController'

let router = express.Router()

let initWebRoutes = (app) => {
  router.get("/", getHomePage)
  router.get("/crud", getCRUD)
  router.post("/post-crud", postCRUD)

  return app.use("/", router)
}
 
module.exports = {
  initWebRoutes,
} 
