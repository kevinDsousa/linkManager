import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Loading } from "../components/Loading";
import { Menu, List, Space } from "antd";
import api from "../services/api";
import { LoginOutlined, DashboardOutlined } from "@ant-design/icons";

export const Home = () => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );
  const [loading, setLoading] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !userLoaded) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.sub;
      api
        .get(`/users/${userId}`)
        .then((response) => {
          const userData = response.data;
          localStorage.setItem("userInfo", JSON.stringify(userData));
          setUserInfo(userData);
        })
        .catch((error) => {
          console.error("Erro ao obter informações do usuário:", error);
        })
        .finally(() => {
          setLoading(false);
          setUserLoaded(true);
        });
    } else if (userInfo) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [userInfo, userLoaded]);

  const token = localStorage.getItem("token");

  const menuItems = token
    ? [
        {
          key: "dashboard",
          to: "/dashboard",
          icon: <DashboardOutlined />,
          onClick: () => (window.location.href = "/dashboard"),
        },
      ]
    : [
        {
          key: "login",
          to: "/login",
          icon: <LoginOutlined />,
          onClick: () => (window.location.href = "/login"),
        },
      ];

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Menu
        theme="dark"
        mode="horizontal"
        className="w-full h-14 flex items-center justify-end"
        items={menuItems}
      />

      {loading ? (
        <Loading />
      ) : userInfo ? (
        <Space direction="vertical" className="flex items-center justify-center gap-5">
          <img
            className="rounded w-40 h-40"
            src={userInfo.gravatarUrl}
            alt={userInfo.name}
          />
          <span className="font-mono font-semibold">Name: {userInfo.name}</span>
          <span className="font-mono font-semibold">
            Email: {userInfo.email}
          </span>

          <List
            header={<div>Links</div>}
            bordered
            dataSource={userInfo.links}
            renderItem={(item) => (
              <List.Item>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </List.Item>
            )}
          />
        </Space>
      ) : (
        <span>
          Nenhum usuário encontrado. Faça login para ver as informações.
        </span>
      )}
    </div>
  );
};
