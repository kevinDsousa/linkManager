import { Routes as RoutesDom, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { LoginForm } from "./components/LoginForm";
import { PerfilUser } from "./components/PerfilUsers";
import { NotFound } from "./components/NotFound";

function Routes() {
  return (
    <RoutesDom>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/users/:id" element={<PerfilUser />} />

      <Route path="*" element={<NotFound/>} />
    </RoutesDom>
  );
}

export default Routes;
