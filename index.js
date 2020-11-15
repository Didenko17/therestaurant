const express = require('express')
const Sequelize= require('sequelize')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const cors=require('cors')
const authRouter = require('./routes/auth.routes')

const app = express()
app.use(cors())
app.use(cookieParser())
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.get('/', async(req,res)=>{
  res.send(result)
})
app.use('/auth',urlencodedParser, authRouter)
 
app.listen(3000,()=>{
  console.log('Server is listening')
})