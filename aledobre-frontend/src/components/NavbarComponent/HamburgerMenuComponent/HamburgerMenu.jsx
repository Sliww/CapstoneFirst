import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import { useAuth } from '../../../context/AuthContextComp';
import burgerMenu from '../../../assets/menu.svg'
import prenotazione from '../../../assets/booking.svg'
import './hamburgermenu.css';

export const HamburgerMenu = () => {
    const [show, setShow] = useState(false);
    const { isLoggedIn, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleLogout = () => {
        logout();
        handleClose();
        navigate('/');
        window.location.reload();
    };

    const isAdmin = user?.role === 'admin';

    return (
        <>
            <button onClick={handleShow} className="buttonMenuBurger">
                <div className='threeLines'>
                    <img src={burgerMenu} alt="menu" />
                </div>
            </button>

            <Offcanvas placement="end" show={show} onHide={handleClose} className="offColorBackground">
                <Offcanvas.Header className='headerText'>
                    <Offcanvas.Title>
                        <strong>Menu</strong>
                    </Offcanvas.Title>
                    <Button
                        variant="close"
                        onClick={handleClose}
                        aria-label="Close"
                        className="offcanvas-close-button"
                    />
                </Offcanvas.Header>
                <Offcanvas.Body className='bodyText'>
                    <ul className='d-flex flex-column gap-3 menuLinksOffcanvas'>
                        {isLoggedIn ? (
                            <>
                                <Link to='/profilo' onClick={handleClose}>
                                    <li>Profilo</li>
                                </Link>
                                {isAdmin && (
                                    <Link to='/admin-panel' onClick={handleClose}>
                                        <li>Pannello di gestione</li>
                                    </Link>
                                )}
                                <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                    Logout
                                </li>
                            </>
                        ) : (
                            <>
                                <Link to='/login' onClick={handleClose}>
                                    <li>Login</li>
                                </Link>
                                <Link to='/signup' onClick={handleClose}>
                                    <li>Sign Up</li>
                                </Link>
                            </>
                        )}
                        <hr />
                        <Link className='d-flex align-items-center justify-content-between gap-5' to='/prenota' onClick={handleClose}>
                            <li>Prenota</li>
                            <img src={prenotazione} alt="prenotazione" className='icon-small' />
                        </Link>
                        <Link to='/latradizione' onClick={handleClose}>
                            <li>La Tradizione</li>
                        </Link>
                        <Link to='/contatti' onClick={handleClose}>
                            <li>Contatti</li>
                        </Link>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default HamburgerMenu;
