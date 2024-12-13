import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkTokenValidity = () => {
        const token = localStorage.getItem('token');
        
        if (token) {
            try {
                const cleanToken = token.replace(/"/g, '');
                const decodedToken = jwtDecode(cleanToken);
                
                if (decodedToken.exp * 1000 < Date.now()) {
                    logout(false);
                    return false;
                }
                
                setUser({
                    role: decodedToken.role,
                    name: decodedToken.name,
                });
                setIsLoggedIn(true);
                return true;
            } catch (error) {
                console.error('Error checking token:', error);
                logout(false);
                return false;
            }
        }
        setIsLoading(false);
        return false;
    };

    useEffect(() => {
        checkTokenValidity();
        setIsLoading(false);
        
        const interval = setInterval(() => {
            checkTokenValidity();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const login = (token) => {
        if (token) {
            localStorage.setItem('token', token);
            try {
                const cleanToken = token.replace(/"/g, '');
                const decodedToken = jwtDecode(cleanToken);
                
                if (decodedToken.exp * 1000 < Date.now()) {
                    logout(false);
                    return;
                }

                setUser({
                    role: decodedToken.role,
                    name: decodedToken.name,
                });
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Error in login:', error);
                logout(false);
            }
        }
    };

    const logout = (shouldRedirect = true) => {
        localStorage.removeItem('token');
        setUser(null);
        setIsLoggedIn(false);
        
        if (shouldRedirect) {
            window.location.href = '/login';
        }
    };

    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            login, 
            logout, 
            user,
            checkTokenValidity 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
