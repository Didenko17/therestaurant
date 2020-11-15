const {Router} = require('express')
const {createUser,authentication,checkToken} = require('../controllers/authController')

const router = Router()


router.post('/signup', async(req,res)=>{
   return createUser(req,res)
})
router.post('/signin', async(req,res)=>{
    return authentication(req,res)
})

router.post('/check',async(req,res)=>{
    return checkToken(req,res)
})

module.exports=router