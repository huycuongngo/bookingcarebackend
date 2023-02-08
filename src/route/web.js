import express from "express";
import {
  showUserFormController, createNewUserController, getAllUserController, showEditUserFormController, doneEditUserController, deleteUserController
} from '../controllers/homeController'

let router = express.Router()

let initWebRoutes = (app) => {
  // CREATE
  router.get("/show-user-form", showUserFormController)
  router.post("/create-user", createNewUserController)


  // READ
  router.get("/get-all-user", getAllUserController)


  // UPDATE
  router.get("/show-edit-user-form", showEditUserFormController)
  router.post("/done-edit-user", doneEditUserController)

  // DELETE
  router.put("/delete-user", deleteUserController)


  return app.use("/", router)
}

module.exports = {
  initWebRoutes,
} 
