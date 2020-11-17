const express = require('express')
const Sequelize= require('sequelize')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const cors=require('cors')
const authRouter = require('./routes/auth.routes')

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
  })
);
app.use(cookieParser())
app.use(express.urlencoded());
app.use(express.json())

app.get('/', async(req,res)=>{
  res.send(result)
})
app.use('/api', authRouter)
 
app.listen(4000,()=>{
  console.log('Server is listening')
})