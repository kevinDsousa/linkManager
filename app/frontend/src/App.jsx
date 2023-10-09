import Routes from "./Routes";
import { createContext, useEffect, useState } from "react";


export const LoginContext = createContext(null);

function App() {
  const [name, setName] = useState('');
  const [token, setToken] = useState('')
  const [id, setId] = useState('')
  const [gravatar, setGravatar] = useState('')


  useEffect(() => {
    const name = localStorage.getItem("name") || '';
    const token = localStorage.getItem("token") || '';
    const id = localStorage.getItem("id") || '';
    const gravatar = localStorage.getItem("gravatarUrl") || '';
    setName(name);
    setToken(token)
    setId(id)
    setGravatar(gravatar)
  }, []);
  
  return (
    <>
      <LoginContext.Provider value={{ name, setName, token, setToken, id, setId, setGravatar, gravatar }}>
        <Routes />
      </LoginContext.Provider>
    </>
  );
}

export default App;
