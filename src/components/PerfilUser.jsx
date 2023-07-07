import { Layout, Input } from "antd";
import { Menu } from "./Menu";

export const PerfilUser = () => {

  return (
    <>
      <Menu />
      <Layout>
        <Input placeholder="Adicionar novo link" />
      </Layout>
    </>
  );
};
