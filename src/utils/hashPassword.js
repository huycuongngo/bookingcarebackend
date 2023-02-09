import bcrypt from 'bcrypt'

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashUserPassword = (password) => {

  return new Promise(async (resolve, reject) => {
    try {
      let passwordHashed = await bcrypt.hash(password, salt)
      resolve(passwordHashed)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  hashUserPassword,
}
