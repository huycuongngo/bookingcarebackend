const checkEmailExist = (email, db) => {
  
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email,
        },
        raw: true,
      })
      if (user) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  checkEmailExist,
}
