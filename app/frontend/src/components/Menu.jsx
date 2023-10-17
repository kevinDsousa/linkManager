import { useState , useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Menu as MenuAnt } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import jwt_decode from "jwt-decode";
import { LoginContext } from "../App";

export const Menu = () => {
  const { token } = useContext(LoginContext);
  const navigate = useNavigate();
  const [gravatarUrl, setGravatarUrl] = useState(""); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    location.reload();
  };

  const decodeToken = (token) => {
    try {
      const decoded = jwt_decode(token);
      return decoded;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return {};
    }
  };

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      const gravatarUrl = decodedToken.gravatarUrl;
      setGravatarUrl(gravatarUrl);
    }
  }, [token]);

  const emailFromToken = token ? decodeToken(token).email : "";

  const isKevinDiego = emailFromToken === "kevindiego@gmail.com";

  const items = [
    {
      label: "Inicio",
      key: "mail",
      to: "/dashboard",
      icon: <HomeOutlined />,
    },
    isKevinDiego && {
      label: "Novo usuário",
      key: "newuser",
      to: "/newuser",
      icon: <UserAddOutlined />,
    },
    {
      label: "Sair",
      key: "exit",
      onClick: handleLogout,
      icon: <LogoutOutlined />,
    },
    {
      key: "my-account",
      icon: <Avatar className="translate-y-2" size={36} src={gravatarUrl} />,
    },
  ];

  function generateLinks(items) {
    return items
      .flat()
      .filter(Boolean)
      .map((item) => ({
        ...item,
        label: item.to ? <Link to={item.to}>{item.label}</Link> : item.label,
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

export default Menu;
