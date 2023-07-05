import Layout, { Header } from "antd/es/layout/layout";
import { Menu } from "./components/Menu";
import Routes from "./Routes";
import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext(null);

function App() {
  const [name, setName] = useState('');
  const [token, setToken] = useState('')

  useEffect(() => {
    const name = localStorage.getItem("name") || '';
    const token = localStorage.getItem("token") || '';
    setName(name);
    setToken(token)
  }, []);
  
  return (
    <>
      <LoginContext.Provider value={{ name, setName, token, setToken }}>
        <Layout>
          <Header>
            <Menu />
          </Header>
        </Layout>
        <Routes />
      </LoginContext.Provider>
    </>
  );
}

export default App;
