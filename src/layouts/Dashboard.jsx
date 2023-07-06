import Layout, { Header } from "antd/es/layout/layout";
import { Menu } from "../components/Menu";
import { ListUsers } from "../components/ListUsers";

export const Dashboard = () => {
  return (
    <div>
      <Layout>
        <Header>
          <Menu />
          <ListUsers />
        </Header>
      </Layout>
    </div>
  );
};
