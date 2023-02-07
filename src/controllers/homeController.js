import { createNewUserService, getAllUserService } from '../services/CRUDService'


// CREATE
const showUserFormController = (req, res) => {

  return res.render("formUser.ejs")
}

const createNewUserController = async (req, res) => {
  // await createNewUserService(req.body)

  return res.send("post - create new user - controller")
}


// READ
const getAllUserController = async (req, res) => {
  let data = await getAllUserService()

  return res.render('allUser.ejs', {
    data
  })
}


// UPDATE


// DELETE



module.exports = {
  showUserFormController,
  createNewUserController,
  getAllUserController
}

