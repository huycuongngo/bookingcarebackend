import { loginUserService } from '../services/userService'

const loginUserController = async (req, res) => {
  let { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({
      errCode: 1,
      msg: "Missing inputs parameters"
    })
  } else {
    let checkEmailAndPasswordResult = await loginUserService(email, password)
    if (checkEmailAndPasswordResult.errCode === 0) {
      res.status(200).json(checkEmailAndPasswordResult)
    } else {
      res.status(400).json(checkEmailAndPasswordResult)
    }
  }
}

module.exports = {
  loginUserController,
}