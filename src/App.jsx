import Routes from "./Routes";
import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext(null);

function App() {
  const [name, setName] = useState('');
  const [token, setToken] = useState('')
  const [id, setId] = useState('')


  useEffect(() => {
    const name = localStorage.getItem("name") || '';
    const token = localStorage.getItem("token") || '';
    const id = localStorage.getItem("id") || '';
    setName(name);
    setToken(token)
    setId(id)
  }, []);
  
  return (
    <>
      <LoginContext.Provider value={{ name, setName, token, setToken, id, setId }}>
        <Routes />
      </LoginContext.Provider>
    </>
  );
}

export default App;
