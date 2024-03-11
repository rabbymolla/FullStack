import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [loading, setLoding] = useState(false);
  const [mas, setMas] = useState("");
  const naviget = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoding(true);
    const data = await axios.post(
      "http://localhost:8000/api/v1/auth/reg",
      {
        name: values.username,
        email: values.email,
        password: values.password,
      },
      {
        headers: {
          Authorization: "RaBBy544",
        },
      }
    );
    console.log("hhh", data);
    setMas("sucefull");
    setTimeout(() => {
      naviget(`/otp/${values.email}`);
    }, 1500);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {mas && <Alert message={mas} type="success" showIcon closable />}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Registration;
