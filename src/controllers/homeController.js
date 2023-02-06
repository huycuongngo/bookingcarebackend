import db from '../models/index'
import { createNewUser } from '../services/CRUDService'


const getHomePage = async (req, res) => {
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

const getCRUD = (req, res) => {

  return res.render("crud.ejs")
}

const postCRUD = async (req, res) => {
  await createNewUser(req.body)

  return res.send("post form request to server")
}

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
}

