const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User} = require('../db/db')
const {jwtSecret}= require('../config/config')
const nodemailer = require("nodemailer")

const sendMail = async(email, subject, text, html)=>{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        secure: false,
        auth: {
            user: 'vladislav.didenko.2001@gmail.com',
            pass: "asdf';lk" 
        },
    });
    let info = await transporter.sendMail({
        from: 'vladislav.didenko.2001@gmail.com', // sender address
        to: email, // list of receivers
        subject, // Subject line
        text, // plain text body
        html // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

const getConfirmPasswordHtml=(email,url)=>{
    return `
        <p>Здравствуйте, ${email}. Это сообщение отправлено вам потому, что вы указали этот адрес при регистрации на сайте http://localhost:3000.</p>
        <p>Для подтверждения почты перейдите по следующей ссылке:</p>
        <a href='http://localhost:3000/api/confirm/${url}'>http://localhost:3000/api/confirm/${url}</a>
        <p>Не переходите по ссылке, если вы не регистрировались. Просто удалите сообщение.</p>
    `
}
const getResetPasswordHtml=(email,url)=>{
    return `
        <p>Здравствуйте, ${email}.</p>
        <p>Для установаления нового пароля перейдите по ссылке:</p>
        <a href='http://localhost:3000/api/reset/${url}'>http://localhost:3000/api/reset/${url}</a>
    `
}

const createUser= async(req,res)=>{
    const {login,password,email}=req.body;
    //Проверка логина
    User.findOne({where:{login}, raw:true}).then((user)=>{
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
    //Генерация ссылки для подтверждения почты
    const confirm= jwt.sign({login},jwtSecret);
    //Отправка сообщения
    const html = getConfirmPasswordHtml(email,confirm);
    try{
        await sendMail(email,'Confirm email','Confirm email',html);
        res.send(200).json({message:'Message sent'});
    }catch(err){
        res.send(400).json({message:err.message})
    }
    //Пулл в БД
    await User.create({login,email,password:hashed,confirm});
    res.status(200).json({message:'Пользователь успешно создан'});
}

const confirmEmail=async(req,res)=>{
    const {token}= req.params;
    try{
        await User.update({confirm:'true'},{where:{confirm:token}});
        res.status(200).json({message:'Email confirmed!'})
    }catch(err){
        res.status(400).json({message:'Bad request'})
    }
}
const sendResetToken=async(req,res)=>{
    const {email}=req.body
    const token= jwt.sign({email},jwtSecret,{expiresIn:'1h'});
    const html=getResetPasswordHtml(email,token)
    await sendMail(email,'Reset password','Reset password',html);
    await User.update({reset:token},{where:{email}})
    res.send(200).json({message:'Message sent'});
}

const resetPassword=async(req,res)=>{
    const {token}=req.params;
    const {password}=req.body
    //Проверка токена
    jwt.verify(token,jwtSecret,(err,decoded)=>{
        if(err){
            return res.status(400).json({message:'Bad request'})
        }
    })
    //Генерация соли и хеширование 
    const salt= bcrypt.genSaltSync(10);
    let hashed= await bcrypt.hash(password,salt);
    hashed+=salt.slice(7);
    //Обновление пароля в БД
    try{
        await User.update({password:hashed,reset:''},{where:{reset:token}});
        res.status(200).json({message:'Password changed',reset:''})
    }catch(err){
        res.status(400).json({message:'Bad request'})
    }
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
    checkToken,
    confirmEmail,
    sendResetToken,
    resetPassword
}