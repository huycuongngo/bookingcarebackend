import db from '../models/index'
import bcrypt from 'bcrypt'

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


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

let createNewUser = async ({email, password, fullName, address, phone, gender, image, roleId}) => {

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
      console.log("successful result", result)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}


module.exports = {
  createNewUser,
}
