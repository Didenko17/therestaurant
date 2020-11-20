import {React, useState} from "react";
import {Form, Input, Button} from 'antd';
import {useParams} from 'react-router-dom'

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 6 },
};

const ResetPassword = () => {
    const [password,setPassword]=useState('');
    const {token}=useParams();
    const onFinish = async() => {
        if (password.length<6){
            return onFinishFailed('Пароль должен быть длиной не менее 6 символов');
        }
        fetch(`/api/reset/${token}`, {
            method: 'PUT',
            headers: { 
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
             },
            body: JSON.stringify({password})
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
        <Form.Item label="Новый пароль" name="password" rules={[{required: true, message: 'Введите пароль!',},]}>
            <Input.Password value={password} onChange={e=>{setPassword(e.target.value)}}/>
        </Form.Item>
        <Form.Item {...tailLayout}>
            <Button type="primary" className="form-button" htmlType="submit">Продолжить</Button>
        </Form.Item>
    </Form>
  );
};

export default ResetPassword;