import Routes from "./Routes";
import { createContext, useEffect, useState } from "react";


export const LoginContext = createContext(null);

function App() {
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = localStorage.getItem("token") || '';
    setToken(token)

  }, []);
  
  return (
    <>
      <LoginContext.Provider value={{ token, setToken }}>
        <Routes />
      </LoginContext.Provider>
    </>
  );
}

export default App;
