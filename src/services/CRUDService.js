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

let createNewUserService = async ({email, password, fullName, address, phone, gender, image, roleId}) => {

  return new Promise(async (resolve, reject) => {
    try {
      let passwordHashed = await hashUserPassword(password)
      let result = await db.User.create({
        email,
        password: passwordHashed,
        fullName,
        address,
        phone,
        gender: gender = "male" ? true : false,
        image,
        roleId,
      })
      console.log("create successfully", result)
      resolve()
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




// DELETE





module.exports = {
  createNewUserService,
  getAllUserService
}
