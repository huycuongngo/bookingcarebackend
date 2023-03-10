import express from "express";
import bodyParser from 'body-parser';
import {configViewEngine} from './config/viewEngine';
import {initWebRoutes} from './route/web';
require('dotenv').config()

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

configViewEngine(app)
initWebRoutes(app)

let PORT = process.env.PORT || 6969
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})
