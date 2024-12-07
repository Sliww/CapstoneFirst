import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        
        if (token) {
            try {
                
                const cleanToken = token.replace(/"/g, '');
                const decodedToken = jwtDecode(cleanToken);
                
                
                setUser({
                    role: decodedToken.role,
                    name: decodedToken.name,
                });
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Error in login:', error);
            }
        }
    }, []);

    const login = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const cleanToken = token.replace(/"/g, '');
                const decodedToken = jwtDecode(cleanToken);
                setUser({
                    role: decodedToken.role,
                    name: decodedToken.name,
                    
                });
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Error in login:', error);
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsLoggedIn(false);
        setTimeout(() => {
            window.location.href = '/';
            window.location.reload();
        }, 1000);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
