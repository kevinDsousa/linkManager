import { useEffect, useState, useContext } from "react";
import { Layout } from "antd";
import { CardUser } from "./CardUser";
import jwt_decode from "jwt-decode";
import { LoginContext } from "../App";

export const PerfilUser = () => {
  const [userData, setUserData] = useState({ name: "", gravatarUrl: "", email: '', links: "" });
  const { token } = useContext(LoginContext);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token);

        if (decoded) {
          const name = decoded.name;
          const gravatarUrl = decoded.gravatarUrl;
          const links = decoded.links;
          const email = decoded.email;
          setUserData({
            name,
            gravatarUrl,
            email,
            links,
          });
        } else {
          console.error("Token inválido ou malformado.");
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      console.log("Token não encontrado.");
    }
  }, [token]);

  return (
    <>
      <Layout className="w-1/2 m-auto mt-10 h-screen">
        <CardUser name={userData.name} email={userData.email} gravatarUrl={userData.gravatarUrl} links={userData.links} />
      </Layout>
    </>
  );
};
