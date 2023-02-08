import { createNewUserService, getAllUserService, getUserByIdService, editUserService, deleteUserService } from '../services/CRUDService'


// CREATE
const showUserFormController = (req, res) => {

  return res.render("formUser.ejs")
}

const createNewUserController = async (req, res) => {
  await createNewUserService(req.body)

  let users = await getAllUserService()

  return res.render('allUser.ejs', {
    users
  })
}


// READ
const getAllUserController = async (req, res) => {
  let users = await getAllUserService()

  return res.render('allUser.ejs', {
    users
  })
}


// UPDATE
const showEditUserFormController = async (req, res) => {
  let userId = req.query.id
  if (userId) {
    let user = await getUserByIdService(userId)
    
    if (user) { 
      
      return res.render("formEditUser.ejs", {
        user
      })
    } else {

      return res.send("User Not Found")
    }
  } else {

    return res.send("User Id is empty!")
  }
}

const doneEditUserController = async (req, res) => {

  await editUserService(req.body)

  let users = await getAllUserService()

  return res.render('allUser.ejs', {
    users
  })
}


// DELETE
const deleteUserController = async (req, res) => {
  let userId = req.query.id
  if (userId) {
    await deleteUserService(userId)

    let users = await getAllUserService()

    return res.render('allUser.ejs', {
      users
    })
  } else {
    return res.send("User Id not valid")
  }
}


module.exports = {
  showUserFormController,
  createNewUserController,

  getAllUserController,

  showEditUserFormController,
  doneEditUserController,

  deleteUserController,
}
