import db from '../models/index'
import bcrypt from 'bcrypt'
import {hashUserPassword} from '../utils/hashPassword'
import {checkEmailExist} from '../utils/checkEmailExist'






const loginUserApiService = (email, password) => {

  return new Promise(async (resolve, reject) => {
    try {
      let isEmailExist = await checkEmailExist(email, db)
      if (isEmailExist) {
        const user = await db.User.findOne({
          where: {
            email
          },
          raw: true,
        })
        const match = await bcrypt.compare(password, user.password)
        if (match) {
          resolve({
            errCode: 0,
            msg: 'OK',
            user: {
              email: user.email,
              roleId: user.roleId,
            },
          })
        } else {
          resolve({
            errCode: 1,
            msg: 'Your password is not correct. Please try another',
            user: {},
          })
        }
      } else {
        resolve({
          errCode: 1,
          msg: 'Your email does not exist. Please try another',
          user: {},
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}


const createUserApiService = ({
  email,
  password,
  fullName,
  address,
  phone,
  gender,
  image,
  roleId,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isEmailExist = await checkEmailExist(email, db)
      if (isEmailExist) {
        resolve({
          errCode: 1,
          msg: 'Email exist, please try other email',
        })
      }

      const hashedPassword = await hashUserPassword(password)

      await db.User.create({
        email,
        password: hashedPassword,
        fullName,
        address,
        phone,
        gender: gender == 'male' ? true : false,
        image,
        roleId,
      })
      resolve({
        errCode: 0,
        msg: 'OK create user successfully',
      })
    } catch (error) {
      reject(error)
    }
  })
}


const getAllUserApiService = () => {

  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        attributes: {
          exclude: ['password']
        },
      })
      resolve({
        errCode: 0,
        msg: "OK",
        users
      })
    } catch (error) {
      reject(error)
    }
  })
}

const getUserByIdApiService = (userId) => {

  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: userId
        },
        attributes: {
          exclude: ['password']
        },
      })
      if (user) {
        resolve({
          errCode: 0,
          msg: "OK",
          user
        })  
      } else {
        resolve({
          errCode: 1,
          msg: "Id user ko ton tai",
          user: {}
        })  
      }
    } catch (error) {
      reject(error)
    }
  })
}

const updateUserApiService = (id, fullName, address) => {
  
  return new Promise(async(resolve, reject) => {
    try {
      let result = await db.User.update({ fullName, address }, {
        where: {
          id
        },
      })
      if (result[0]) {
        let user = await db.User.findByPk(id)
        resolve({
          errCode: 0,
          msg: 'OK update user successfully',
          user
        })
      } else {
        resolve({
          errCode: 1,
          msg: 'ID user does not exist',
          user: {}
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}

const deleteUserApiService = (id) => {

  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.destroy({
        where: {
          id,
        },
      })
      if (user) {
        resolve({
          errCode: 0,
          msg: 'OK delete user successfully',
        })
      } else {
        resolve({
          errCode: 1,
          msg: 'Delete fail. Id does not exist',
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}


module.exports = {
  createUserApiService,
  loginUserApiService,
  getAllUserApiService,
  getUserByIdApiService,
  updateUserApiService,
  deleteUserApiService,
}
