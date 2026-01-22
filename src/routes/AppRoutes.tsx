import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import RegisterViaInvite from "../pages/RegisterViaInvite";
import { ROUTES } from "./paths";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.register} element={<RegisterViaInvite />} />
      <Route path={ROUTES.root} element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
