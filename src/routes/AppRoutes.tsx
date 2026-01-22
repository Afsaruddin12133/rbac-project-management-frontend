import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard.tsx";
import Login from "../pages/Login.tsx";
import NotFound from "../pages/NotFound.tsx";
import RegisterViaInvite from "../pages/RegisterViaInvite.tsx";
import { ROUTES } from "./paths";
import RequireAuth from "./RequireAuth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.register} element={<RegisterViaInvite />} />
      <Route element={<RequireAuth />}>
        <Route path={ROUTES.root} element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
