import {React, useState} from "react";
import {Form, Input, Button} from 'antd';
const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 6 },
};

const ForgotPassword = () => {
    const [email,setEmail]=useState('');
    const onFinish = async() => {
        fetch('/api/reset', {
            method: 'POST',
            headers: { 
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
             },
            body: JSON.stringify({email})
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
        <Form.Item label="email" name="email" rules={[{ required: true, message: 'Введите email!',},]}>
            <Input value={email} onChange={e=>{setEmail(e.target.value)}}/>
        </Form.Item>
        <Form.Item {...tailLayout}>
            <Button type="primary" className="form-button" htmlType="submit">Продолжить</Button>
        </Form.Item>
    </Form>
  );
};

export default ForgotPassword;