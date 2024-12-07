import { Outlet, Navigate } from "react-router-dom";

export const useAuth = () => {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;