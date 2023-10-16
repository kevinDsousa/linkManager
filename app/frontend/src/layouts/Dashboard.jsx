import Layout, { Header } from "antd/es/layout/layout";
import { Menu } from "../components/Menu";
import { PerfilUser } from "../components/PerfilUser";

export const Dashboard = () => {
  return (
    <div>
      <Layout>
        <Header>
          <Menu />
        </Header>
        <PerfilUser />
      </Layout>
    </div>
  );
};
