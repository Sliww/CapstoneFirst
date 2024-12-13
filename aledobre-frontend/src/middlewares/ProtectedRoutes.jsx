import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContextComp';

export const ProtectedRoutes = () => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export const AdminProtectedRoutes = () => {
    const { isLoggedIn, user } = useAuth();
    
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default ProtectedRoutes;