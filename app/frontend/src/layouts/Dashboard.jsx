import Layout, { Header } from "antd/es/layout/layout";
import { Menu } from "../components/Menu";
import { CardUser } from "../components/CardUser";

export const Dashboard = () => {
  return (
    <div>
      <Layout>
        <Header>
          <Menu />
        </Header>
        <CardUser />
      </Layout>
    </div>
  );
};
