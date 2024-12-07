import { useAuth } from "../middlewares/ProtectedRoutes";
import { jwtDecode as jwt } from "jwt-decode";

const useSession = () => {
    const session = useAuth();
    const decodedSession = session ? jwt(session) : null;

    return decodedSession;
}

export default useSession;