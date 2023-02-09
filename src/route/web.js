import express from "express";
import {
  showUserFormController, createNewUserController, getAllUserController, showEditUserFormController, doneEditUserController, deleteUserController
} from '../controllers/homeController'

import {
  loginUserController
} from '../controllers/userController'


let router = express.Router()

let initWebRoutes = (app) => {
  // CREATE
  router.get("/show-user-form", showUserFormController)
  router.post("/create-user", createNewUserController)


  // READ
  router.get("/", getAllUserController)


  // UPDATE
  router.get("/show-edit-user-form", showEditUserFormController)
  router.post("/done-edit-user", doneEditUserController)


  // DELETE
  router.get("/delete-user", deleteUserController)





  // viet api cho reactjs su dung
  router.post('/api/login', loginUserController)









  return app.use("/", router)
}

module.exports = {
  initWebRoutes,
} 
