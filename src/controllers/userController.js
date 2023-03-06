import {
  createUserApiService,
  loginUserApiService,
  getAllUserApiService,
  getUserByIdApiService,
  updateUserApiService,
  deleteUserApiService,
} from '../services/userService'

import { responseServerError } from '../utils/responseApi'



const loginUserApiController = async (req, res) => {
  try {
    let { email, password } = req.body
    console.log({email, password})
    if (!email || !password) {
      res.status(400).json({
        errCode: 1,
        msg: "Missing inputs parameters"
      })
    } else {
      let checkEmailAndPasswordResult = await loginUserApiService(email, password)
      if (checkEmailAndPasswordResult.errCode === 0) {
        res.status(200).json(checkEmailAndPasswordResult)
      } else {
        res.status(400).json(checkEmailAndPasswordResult)
      }
    }
  } catch (error) {
    responseServerError(res, error)
  }
}


const createUserApiController = async (req, res) => {
  try {
    let result = await createUserApiService(req.body)
    res.status(200).json(result)
  } catch (error) {
    responseServerError(res, error)
  }
}


const getAllUserApiController = async (req, res) => {
  try {
    let users = await getAllUserApiService()
    res.status(200).json(users)
  } catch (error) {
    responseServerError(res, error)
  }
}

const getUserByIdApiController = async (req, res) => {
  try {
    let { id } = req.params
    let user = await getUserByIdApiService(id)
    if (user.errCode === 0) {
      res.status(200).json(user)
    } else {
      res.status(400).json(user)
    }
  } catch (error) {
    responseServerError(res, error)
  }
}

const updateUserApiController = async (req, res) => {
  try {
    let { id } = req.params
    const { fullName, address } = req.body
    let result = await updateUserApiService(id, fullName, address)
    if (result.errCode === 0) {
      res.status(200).json(result)
    } else {
      res.status(400).json(result)
    }
  } catch (error) {
    responseServerError(res, error)
  }
}

const deleteUserApiController = async (req, res) => {
  try {
    let { id } = req.params
    let result = await deleteUserApiService(id)
    if (result.errCode === 0) {
      res.status(200).json(result)
    } else {
      res.status(400).json(result)
    }
  } catch (error) {
    responseServerError(res, error)
  }
}


module.exports = {
  createUserApiController,
  loginUserApiController,
  getAllUserApiController,
  getUserByIdApiController,
  updateUserApiController,
  deleteUserApiController
}