import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Alert, Button, Form, Input } from "antd";
import { useState } from "react";
import { LoginContext } from "../App";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import login from "../assets/login.jpg";
import api from "../services/api";

const { Content } = Layout;

export const LoginForm = () => {
  const [form] = Form.useForm();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { setName, setToken } = useContext(LoginContext);
  const { setId } = useContext(LoginContext);
  const { setGravatar } = useContext(LoginContext);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      setName(response.data.user.name);
      setToken(response.data.token);
      setId(response.data.token);
      setGravatar(response.data.user.gravatarUrl)
      setShowSuccessAlert(true);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user.name);
      localStorage.setItem("id", response.data.user.id);
      localStorage.setItem("gravatarUrl", response.data.gravatarUrl);
      navigate("/"); // Redirecionar para a rota '/'
    } catch (error) {
      form.resetFields();
    }
  };

  return (
    <Layout>
      <Content className="flex flex-row p-5">
        <div className="w-1/2 rounded">
          <img src={login} alt="Login" />
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
              name="email"
              rules={[
                {
                  required: true,
                  message: "Insira seu email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                autoComplete="current-email"
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
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                autoComplete="current-password"
              />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-white text-[#001529] w-full mt-5 rounded-full"
                  >
                    Acessar conta
                  </Button>
                  <Button 
                  htmlType="button"
                  className="mt-5 bg-transparent border-none text-white w-full"
                  >
                    <Link to="/">Retornar</Link>
                  </Button>
                </>
              )}
            </Form.Item>
          </Form>
          {showSuccessAlert && (
            <Alert
              message="Login realizado com sucesso"
              type="success"
              showIcon
              className="mt-4"
            />
          )}
        </div>
      </Content>
    </Layout>
  );
};
