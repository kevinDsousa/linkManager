import { UserOutlined, HomeOutlined, LoginOutlined } from "@ant-design/icons";
import { Menu as MenuAnt } from "antd";
import { Link } from "react-router-dom";
// import { isLogado } from "../auth";

export const Menu = () => {

  const items = [
    {
      label: "Home",
      key: "mail",
      to: "/home",
      icon: <HomeOutlined />,
    },
    {
      label: "Usuários",
      key: "app",
      to: "/users",
      icon: <UserOutlined />,
    },
    {
      label: "Login",
      key: "login",
      to: "/login",
      icon: <LoginOutlined />,
    },
  ];

  function genarateLinks(items) {
    return items.filter(Boolean).map((item) => ({
      ...item,
      label: <Link to={item.to}>{item.label}</Link>,
    }));
  }

  return <MenuAnt theme="dark" mode="horizontal" items={genarateLinks(items)}></MenuAnt>;
}
