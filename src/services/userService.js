import db from '../models/index'
import { hashUserPassword } from '../utils/hashPassword'
import bcrypt from 'bcrypt'

const checkEmailAndPasswordInDb = (email, password) => {

  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email,
        },
        raw: true
      })
      console.log("checkEmailInDb", user)
      if (user) {
        console.log(password)
        const match = await bcrypt.compare(password, user.password);
        console.log(match)
        if (match) {
          resolve({
            errCode: 0,
            msg: "OK",
            user: {
              email: user.email,
              roleId: user.roleId,
            }
          })
        } else {
          resolve({
            errCode: 1,
            msg: "Your password is not correct. Please try another"
          })
        }
      } else {
        resolve({
          errCode: 1,
          msg: "Your email does not exist. Please try another"
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}


const loginUserService = (email, password) => {

  return new Promise(async (resolve, reject) => {
    try {
      let checkEmailAndPasswordResult = await checkEmailAndPasswordInDb(email, password)
      resolve(checkEmailAndPasswordResult)
    } catch (error) {
      reject(error)
    }
  })
}




module.exports = {
  loginUserService
}