import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmailVerficaLink = () => {
  const perams = useParams();
  const [loading, setLoding] = useState(false);
  const [mas, setMas] = useState("");
  const naviget = useNavigate();

  const onFinish = async (values) => {
    setLoding(true);
    const data = await axios.post(
      "http://localhost:8000/api/v1/auth/login",
      {
        email: values.email,
        password: values.password,
      },
      {
        headers: {
          Authorization: "RaBBy544",
        },
      }
    );
    setMas(data.data.success);
    setMas(data.data.error);
    setLoding(false);
    // naviget(`/otp/${values.email}`);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    async function verify() {
      const data = await axios.post(
        "http://localhost:8000/api/v1/auth/emailLink",
        {
          email: perams.token,
        }
      );
      console.log(data);
    }
    verify();
  }, []);
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
            Login
          </Button>
          <Link to="/forget" style={{ marginLeft: "10px" }}>
            Forget Password
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default EmailVerficaLink;
