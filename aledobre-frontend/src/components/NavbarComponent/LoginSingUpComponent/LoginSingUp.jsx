import './loginsignup.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContextComp';

export const LoginSingUp = () => {
    const { isLoggedIn, logout } = useAuth();
    
    return (
        <span className='loginSignUp d-flex gap-3'>
            {isLoggedIn ? (
                <>
                    <Link className='profile' to='/profilo'>
                        <strong>Profilo</strong>
                    </Link>
                    <button 
                        className='logout' 
                        onClick={logout}
                        style={{ border: 'none', background: 'none', color: 'inherit', cursor: 'pointer' }}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link className='login' to='/login'>
                        Login
                    </Link>
                    <Link className='signUp' to='/signup'>
                        Sign Up
                    </Link>
                </>
            )}
        </span>
    );
};
