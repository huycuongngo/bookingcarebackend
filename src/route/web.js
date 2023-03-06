import express from "express";
import {
  showUserFormController, createNewUserController, getAllUserController, showEditUserFormController, doneEditUserController, deleteUserController
} from '../controllers/homeController'

import {
  loginUserApiController,
  createUserApiController,
  getAllUserApiController,
  getUserByIdApiController,
  updateUserApiController,
  deleteUserApiController,
} from '../controllers/userController'


let router = express.Router()

let initWebRoutes = (app) => {
  //api phia nodejs su dung
  // CREATE
  router.get('/show-user-form', showUserFormController)
  router.post('/create-user', createNewUserController)

  // READ
  router.get('/', getAllUserController)

  // UPDATE
  router.get('/show-edit-user-form', showEditUserFormController)
  router.post('/done-edit-user', doneEditUserController)

  // DELETE
  router.get('/delete-user', deleteUserController)



  
  

  // viet api cua admin cho phia reactjs su dung
  router.post('/api/login', loginUserApiController)
  
  router.post('/api/create-user', createUserApiController)

  router.get('/api/get-all-user', getAllUserApiController)

  router.get('/api/get-user/:id', getUserByIdApiController)
  // router.get('/api/get-user', getUserByIdApiController)

  router.put('/api/update-user/:id', updateUserApiController)

  router.delete('/api/delete-user/:id', deleteUserApiController)

  return app.use('/', router)
}

module.exports = {
  initWebRoutes,
} 
