import express from "express";
import {
  showUserFormController, createNewUserController, getAllUserController
} from '../controllers/homeController'

let router = express.Router()

let initWebRoutes = (app) => {
  // CREATE
  router.get("/show-user-form", showUserFormController)
  router.post("/create-user", createNewUserController)


  // READ
  router.get("/get-all-user", getAllUserController)


  // UPDATE


  // DELETE

  return app.use("/", router)
}

module.exports = {
  initWebRoutes,
} 
