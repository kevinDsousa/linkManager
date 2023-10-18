import { Routes as RoutesDom, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { NotFound } from "./components/NotFound";
import { LoginContext } from "./App";
import { useContext } from "react";
import { PerfilUser } from "./components/PerfilUser";
import { Dashboard } from "./layouts/Dashboard";
import { Home } from "./layouts/Home";
import { Newuser } from "./layouts/NewUser";
import ListUser from "./layouts/ListUser";

function Routes() {
  const { token } = useContext(LoginContext);

  return (
    <RoutesDom>
      {token ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users/:id" element={<PerfilUser />} />
          <Route path="/newusers" element={<Newuser />} />
          <Route path="/listusers" element={<ListUser />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
        </>
      )}

      <Route path="*" element={<NotFound />} />
    </RoutesDom>
  );
}

export default Routes;
