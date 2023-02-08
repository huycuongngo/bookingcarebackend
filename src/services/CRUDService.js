import db from '../models/index'
import bcrypt from 'bcrypt'

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

//CREATE
let hashUserPassword = (password) => {

  return new Promise(async (resolve, reject) => {
    try {
      let passwordHashed = await bcrypt.hashSync(password, salt)
      resolve(passwordHashed)
    } catch (error) {
      reject(error)
    }
  })
}

let createNewUserService = async ({ email, password, fullName, address, phone, gender, image, roleId }) => {

  return new Promise(async (resolve, reject) => {
    try {
      let passwordHashed = await hashUserPassword(password)
      let newUser = await db.User.create({
        email,
        password: passwordHashed,
        fullName,
        address,
        phone,
        gender: gender == "male" ? true : false,
        image,
        roleId,
      })
      resolve(newUser)
    } catch (error) {
      reject(error)
    }
  })
}



//READ
const getAllUserService = () => {

  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll({
        raw: true
      })
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}


// UPDATE
const getUserByIdService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: userId,
        },
        raw: true,
      })
      resolve(user)
    } catch (error) {
      reject(error)
    }
  })
}

const editUserService = ({ id, fullName, address }) => {

  return new Promise(async (resolve, reject) => {
    try {
      await db.User.update(
        {
          fullName,
          address
        },
        {
          where: {
            id
          }
        },
      )
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}



// DELETE
const deleteUserService = (id) => {

  return new Promise(async (resolve, reject) => {
    try {
      await db.User.destroy({
        where: {
          id
        }
      })
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}




module.exports = {
  createNewUserService,
  getAllUserService,
  getUserByIdService,
  editUserService,
  deleteUserService,
}
