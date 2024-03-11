import React from "react";
import { Button, Checkbox, Form, Input, Alert, Space } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const params = useParams();
  const naviget = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values.otp);
    const data = await axios.post(
      "http://localhost:8000/api/v1/auth/otpverfic",
      {
        email: params.email,
        otp: values.otp,
      }
    );
    console.log("hhh", data);
    setTimeout(() => {
      naviget("/login");
    }, 1500);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
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
          label="Code"
          name="otp"
          rules={[
            {
              required: true,
              message: "Please input your OTP!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Otp;
