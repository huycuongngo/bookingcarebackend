import db from '../models/index'

const getHomePage = async (req, res) => {
  // connect to db
  try {
    let data = await db.User.findAll()
    console.log(data)
    return res.render('homePage.ejs', {
      data: JSON.stringify(data)
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getHomePage,
}

