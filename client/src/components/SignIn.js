import {React, useState} from "react";
import {Form, Input, Button} from 'antd';
import {Link} from 'react-router-dom'
const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 6 },
};

const SignIn = () => {
    const [login,setLogin]=useState('');
    const [password,setPassword]=useState('');
    const onFinish = async() => {
        const user={login,password};
        fetch('/api/signin', {
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
        <Form.Item label="Логин или email" name="login" rules={[{ required: true, message: 'Введите логин!',},]}>
            <Input value={login} onChange={e=>{setLogin(e.target.value)}}/>
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={[{required: true, message: 'Введите пароль!',},]}>
            <Input.Password value={password} onChange={e=>{setPassword(e.target.value)}}/>
        </Form.Item>
        <Form.Item {...tailLayout}>
            <Button type="primary" className="form-button" htmlType="submit">Войти</Button>
        </Form.Item>
        <Link className='middle-link' to='/api/signup'>Создать аккаунт</Link>
    </Form>
  );
};

export default SignIn;