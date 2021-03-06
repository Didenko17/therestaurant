import {React, useState} from "react";
import { Form, Input, Button} from 'antd';

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 6 },
};

const SignUp = () => {
    const [login,setLogin]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const onFinish = async() => {
        if(email.search(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)<0){
            return onFinishFailed('Вы ввели некорректный email');
        }
        if (password.length<6){
            return onFinishFailed('Пароль должен быть длиной не менее 6 символов');
        }
        const user={login,password,email};
        fetch('/api/signup', {
            method: 'POST',
            headers: { 
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(user)
        }).then(res=>{
            console.log(res);
            return res.json()
        })
    };

    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
    return (
    <Form {...layout} style={{marginTop:'150px'}} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Введите электронную почту!',},]}>
            <Input value={email} onChange={e=>{setEmail(e.target.value)}}/>
        </Form.Item>
        <Form.Item label="Логин" name="login" rules={[{ required: true, message: 'Введите логин!',},]}>
            <Input value={login} onChange={e=>{setLogin(e.target.value)}}/>
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={[{required: true, message: 'Введите пароль!',},]}>
            <Input.Password value={password} onChange={e=>{setPassword(e.target.value)}}/>
        </Form.Item>
        <Form.Item {...tailLayout}>
            <Button type="primary" className='form-button' htmlType="submit">Зарегистрироваться</Button>
        </Form.Item>
    </Form>
  );
};

export default SignUp;