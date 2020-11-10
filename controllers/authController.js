const bcrypt= require('bcryptjs')

const {User} = require('../db/db')
const {Op}= require('sequelize')
const createUser= async(req,res)=>{
    const {login,email,password}=req.body;
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
    res.send(user);//60 characters-hash salt- 29characters with $2a$10$
}

const authentication = async(req,res)=>{
    const {login,password}=req.body;
    //Поиск такого пользователя
    const user = await User.findOne({where:{login}, raw:true}).then((user)=>{
        if(user){
            return user;
        }
        return res.status(400).json({message:'Пользователя с таким логином не существует'});
    }).catch((err)=>{
        console.log(err);
    })
    //Сравнение паролей
    const salt='$2a$10$'+user.password.slice(60);
    let hashedClientPassword=await bcrypt.hash(password,salt);
    hashedClientPassword+=salt.slice(7);
    if(hashedClientPassword==user.password){
        res.send(`Hello, ${user.login}. This is your email ${user.email}`);
    }else{
        res.status(400).json({message:'Неверное имя пользователя или пароль'})
    }
}

module.exports={
    createUser,
    authentication
}