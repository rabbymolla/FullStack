import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [loading, setLoding] = useState(false);
  const [mas, setMas] = useState("");
  const naviget = useNavigate();

  const onFinish = async (values) => {
    setLoding(true);
    try {
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
      setLoding(false);
      setTimeout(() => {
        naviget(`/otp/${values.email}`);
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoding(false);
      setMas(error.response.data.error);
    }
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
          <Link style={{ marginLeft: "10px" }} to="/login">
            Login
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Registration;
