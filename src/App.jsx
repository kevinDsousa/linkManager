import Layout, { Header } from "antd/es/layout/layout";
import { Menu } from "./components/Menu"
import Routes from "./Routes";

function App() {
  return (
    <>
      <Layout>
        <Header>
          <Menu />
        </Header>
      </Layout>

      <Routes />
    </>
  );
}

export default App;
