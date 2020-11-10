const express = require('express')
const Sequelize= require('sequelize')
const mysql = require('mysql2')
const authRouter = require('./routes/auth.routes')

const app = express()

app.get('/', async(req,res)=>{
  res.send(result)
})
app.use('/auth', authRouter)
 
app.listen(3000,()=>{
  console.log('Server is listening')
})