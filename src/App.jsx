import Layout, { Footer, Header } from "antd/es/layout/layout";
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

      <Footer />
    </>
  );
}

export default App;
