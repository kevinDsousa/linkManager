import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Layout from "antd/es/layout/layout";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import login from "../assets/login.jpg";

export const LoginForm = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);
  const onFinish = (values) => {
    console.log("Finish:", values);
  };
  return (
    <Layout className="flex flex-row p-5">
      <div className="w-1/2 rounded">
        <img src={login} />
      </div>
      <div className="bg-[#001529] rounded p-5 w-1/2 flex flex-col items-center justify-center">
        <h2 className="text-white text-3xl font-bold font-mono text-center mb-2">
          Fazer Login
        </h2>
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
          className="flex flex-col gap-5"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Insira seu nome!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Usuário"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Insira sua senha!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                className="bg-white text-[#001529] w-full mt-5 rounded-full"
              >
                Acessar conta
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};
