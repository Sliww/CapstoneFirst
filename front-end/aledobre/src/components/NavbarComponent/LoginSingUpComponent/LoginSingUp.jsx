import './loginsignup.css';
import { Link } from 'react-router-dom';

export const LoginSingUp = () => {
    return (
        <span className='loginSignUp d-flex gap-2'>
            <Link className='login' to='/login'>
                Login
            </Link>
            <Link className='signUp' to='/signup'>
                Sign Up
            </Link>
        </span>
    )
}
