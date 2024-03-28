import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import axios from "axios";

const NewPassword = () => {
  const [loading, setLoding] = useState(false);
  const [mas, setMas] = useState("");

  const onFinish = async (values) => {
    setLoding(true);
    try {
      const data = await axios.post(
        "http://localhost:8000/api/v1/auth/newpass",
        {
          password: values.password,
        }
      );
      setMas("sucefull");
      setLoding(false);
    } catch (error) {
      console.log(error);
      setLoding(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
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
          label="Password"
          name="password"
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
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewPassword;
