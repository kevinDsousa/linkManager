import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Button, Form, Input, Alert, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import { Menu } from "../components/Menu";

const { Content } = Layout;

export const Newuser = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await api.post("/users", {
        name: values.name,
        email: values.email,
        gravatarUrl: values.gravatarUrl,
        password: values.password,
        admin: values.admin === "admin" ? true : false,
      });
      if (response.status === 200) {
        setSuccess("Cadastro de novo usuário realizado com sucesso");
        localStorage.setItem("token", response.data.access_token);
        navigate("/dashboard");
        location.reload();
      } else {
        setError("Credencial inválida");
      }
    } catch (error) {
      setError("Informações inválidas");
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
      <Menu />
      <Content className="flex flex-row p-5">
        <div className="rounded"></div>
        <div className="bg-[#001529] rounded p-5 w-full flex flex-col items-center justify-center">
          <h2 className="text-white text-3xl font-bold font-mono text-center mb-2">
            Cadastrar novo usuário
          </h2>
          <Form
            name="horizontal_newuser"
            layout="vertical"
            onFinish={onFinish}
            className="flex flex-col gap-5"
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Insira seu nome!",
                },
              ]}
            >
              <Input placeholder="Nome" />
            </Form.Item>
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
            <Form.Item name="gravatarUrl">
              <Input placeholder="URL do Gravatar" />
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
                placeholder="Senha"
                autoComplete="current-password"
              />
            </Form.Item>
            <span className="text-white ">Admin</span>
              <Radio.Group>
                <Radio value="admin" className="text-white font-mono text-lg">Sim</Radio>
              </Radio.Group>
            <Form.Item shouldUpdate>
              {() => (
                <>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-white text-[#001529] w-full mt-5 rounded-full"
                  >
                    Adicionar usuário
                  </Button>
                  <Button
                    htmlType="button"
                    className="mt-5 bg-transparent border-none text-white w-full"
                  ></Button>
                </>
              )}
            </Form.Item>
          </Form>

          {success && (
            <Alert message={success} type="success" showIcon className="mt-4" />
          )}
          {error && (
            <Alert message={error} type="error" showIcon className="mt-4" />
          )}
        </div>
      </Content>
    </Layout>
  );
};
