import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Avatar, Menu as MenuAnt } from "antd";
import { Link } from "react-router-dom";
import { LoginContext } from "../App";
import { useContext } from "react";

export const Menu = () => {

  const { gravatar } = useContext(LoginContext);
  const { token } = useContext(LoginContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("gravatar");
  };

  const items = [
    {
      label: "Inicio",
      key: "mail",
      to: "/",
      icon: <HomeOutlined />,
    },
    !token
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
    ></MenuAnt>
  );
};
