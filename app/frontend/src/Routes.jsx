import { Routes as RoutesDom, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { NotFound } from "./components/NotFound";
import { LoginContext } from "./App";
import { useContext } from "react";
import { PerfilUser } from "./components/PerfilUser";
import { Dashboard } from "./layouts/Dashboard";

function Routes() {
  const { token } = useContext(LoginContext);

  return (
    <RoutesDom>
      {token ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users/:id" element={<PerfilUser />} />
        </>
      ) : (
        <>
          <Route path="/" element={<LoginForm />} />
        </>
      )}

      <Route path="*" element={<NotFound />} />
    </RoutesDom>
  );
}

export default Routes;
