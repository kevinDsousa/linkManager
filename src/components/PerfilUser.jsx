import { Layout, Input } from "antd";
import { Menu } from "./Menu";
import { CardUser } from "./CardUser";

export const PerfilUser = () => {
  return (
    <>
      <Menu />
      <Layout className="w-1/2 m-auto">
        <CardUser
          name={localStorage.getItem("name")}
          gravatarUrl={localStorage.getItem("gravatarUrl")}
        />
        <span>Adicione um link a seu perfil</span>
        <Input placeholder="Adicionar novo link" />
      </Layout>
    </>
  );
};
