const {Router} = require('express')
const {createUser,authentication,checkToken,confirmEmail} = require('../controllers/authController')

const router = Router()


router.post('/signup', async(req,res)=>{
   return createUser(req,res)
})

router.get('/confirm?token',async(req,res)=>{
    return confirmEmail(req,res)
})

router.post('/signin', async(req,res)=>{
    return authentication(req,res)
})

router.post('/check',async(req,res)=>{
    return checkToken(req,res)
})

module.exports=router