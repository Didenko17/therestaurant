const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken');
const {User} = require('../db/db');
const {jwtSecret}= require('../config/config')
const createUser= async(req,res)=>{
    const {login,password,email}=req.body;
    
    //Проверка логина
    await User.findOne({where:{login}, raw:true}).then((user)=>{
        if(!user){
            return;
        }
        return res.status(400).json({message:'Пользователь с таким логином уже существует'});
    }).catch((err)=>{
        console.log(err);
    })
    //Проверка почты
    await User.findOne({where:{email}, raw:true}).then((user)=>{
        if(!user){
            return;
        }
        return res.status(400).json({message:'Пользователь с таким адресом электронной почты уже существует'});
    }).catch((err)=>{
        console.log(err);
    })
    //Генерация соли и хеширование 
    const salt= bcrypt.genSaltSync(10);
    let hashed= await bcrypt.hash(password,salt);
    hashed+=salt.slice(7);
    //Пулл в БД
    const user= await User.create({login,email,password:hashed});
    res.status(200).json({message:'Пользователь успешно создан'});
}

const authentication = async(req,res)=>{
    const {login,password}=req.body;
    //Поиск такого пользователя по логину
    const user = await User.findOne({where:{login}, raw:true})||await User.findOne({where:{email:login}, raw:true})
    if(!user){
        res.status(404).json({message:'Неверное имя пользователя или пароль'})
    }
    //Сравнение паролей
    const salt='$2a$10$'+user.password.slice(60);
    let hashedClientPassword=await bcrypt.hash(password,salt);
    hashedClientPassword+=salt.slice(7);
    if(hashedClientPassword==user.password){
        //ToDo: Добавить сюда роль 
        const token = jwt.sign({login:user.login},jwtSecret,{expiresIn: '1h'});
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({token})
    }else{
        res.status(404).json({message:'Неверное имя пользователя или пароль'})
    }
}

const checkToken= async (req,res)=>{
    const {token} = req.cookies; 
    jwt.verify(token,jwtSecret,(err,decoded)=>{
        if(err)
            res.status(401).json({message:'Пользователь не авторизован'})
        res.status(200).json({login:decoded.login})
    });
}

module.exports={
    createUser,
    authentication,
    checkToken
}