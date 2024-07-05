import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
//import "antd/dist/antd.css";
import { UserOutlined, MailFilled, LockFilled } from "@ant-design/icons";

const App = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:5007/signup", values);
      if (response.data.success) {
        message.success(response.data.message);
        // Navigate to login or another page
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("An error occurred while registering the user");
    }
  };

  return (
    <div className="whole">
      <div className="sc" style={{ width: 300, margin: "100px auto" }}>
        <h2>Signup</h2>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input placeholder="Full Name" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Email ID"
              prefix={<MailFilled />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              { min: 8, message: "Password must be at least 8 characters" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject("Password is required");
                  }
                  const hasUppercase = /[A-Z]/.test(value);
                  const hasLowercase = /[a-z]/.test(value);
                  const hasSpecialChar = /[!@#$%^&*()]/.test(value);
                  if (!hasUppercase || !hasLowercase || !hasSpecialChar) {
                    return Promise.reject(
                      "Password must contain at least one uppercase letter, lowercase letter, and special character"
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Create a Password"
              prefix={<LockFilled />}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="b">
              Signup
            </Button>
          </Form.Item>
        </Form>
        <div class="hello">
          Already have an account? <a href="www.google.com">login</a>
        </div>
      </div>
    </div>
  );
};

export default App;
