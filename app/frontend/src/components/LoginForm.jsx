import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Button, Form, Input, Alert } from "antd";
import login from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

const { Content } = Layout;

export const LoginForm = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await api.post('/login', {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        setSuccess("Login realizado com sucesso");
        localStorage.setItem("token", response.data.access_token);
        navigate("/dashboard");
        location.reload()
        
      } else {
        setError("Credencial inválida. Verifique seu email e senha.");
      }
    } catch (error) {
      setError("Login inválido, usuário ou senha incorreta");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [success, error]);

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
                    {/* <Link to="/">Retornar</Link> */}
                  </Button>
                </>
              )}
            </Form.Item>
          </Form>
          {success && (
            <Alert
              message={success}
              type="success"
              showIcon
              className="mt-4"
            />
          )}
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              className="mt-4"
            />
          )}
        </div>
      </Content>
    </Layout>
  );
};
