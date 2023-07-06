import { Routes as RoutesDom, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
// import { PerfilUser } from "./components/PerfilUsers";
import { NotFound } from "./components/NotFound";
import { LoginContext } from "./App";
import { useContext } from "react";
import { Dashboard } from "./layouts/Dashboard";

function Routes() {
  const { token } = useContext(LoginContext);

  return (
    <RoutesDom>
      {token ? (
        <>
          <Route path="/" element={<Dashboard />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
        </>
      )}

      <Route path="*" element={<NotFound />} />
    </RoutesDom>
  );
}

export default Routes;
