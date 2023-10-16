import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Menu as MenuAnt } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { LoginContext } from "../App";

export const Menu = () => {
  const { gravatar } = useContext(LoginContext);
  const { token } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    location.reload()
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const items = [
    {
      label: "Inicio",
      key: "mail",
      to: "/dashboard",
      icon: <HomeOutlined />,
    },
    !isLoggedIn
      ? {
          label: "Logar",
          key: "login",
          to: "/login",
          icon: <LoginOutlined />,
        }
      : [
          {
            label: "Sair",
            key: "exit",
            onClick: handleLogout,
            icon: <LogoutOutlined />,
          },
          localStorage.getItem("id") && {
            label: "Meus Links",
            key: "profile",
            to: `/users/${localStorage.getItem("id")}`,
            icon: <LinkOutlined />,
          },
          localStorage.getItem("id") && {
            label: `${localStorage.getItem("name")}`,
            key: "my-account",
            icon: (
              <Avatar className="translate-y-2" size={36} src={gravatar} />
            ),
          },
        ],
  ];

  function generateLinks(items) {
    return items
      .flat()
      .filter(Boolean)
      .map((item) => ({
        ...item,
        label: <Link to={item.to}>{item.label}</Link>,
      }));
  }

  return (
    <MenuAnt
      theme="dark"
      mode="horizontal"
      items={generateLinks(items)}
      className="flex items-center justify-center"
    ></MenuAnt>
  );
};
