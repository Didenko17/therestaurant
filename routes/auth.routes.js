const {Router} = require('express')
const {createUser,authentication} = require('../controllers/authController')
const bodyParser = require("body-parser")

const router = Router()
const urlencodedParser = bodyParser.urlencoded({extended: false})

router.post('/signup',urlencodedParser, async(req,res)=>{
   return createUser(req,res)
})
router.post('/signin',urlencodedParser, async(req,res)=>{
    return authentication(req,res)
})

module.exports=router