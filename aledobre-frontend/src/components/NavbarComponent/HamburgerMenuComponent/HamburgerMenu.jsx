import { useState } from 'react';
import { Link } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import burgerMenu from '../../../assets/menu.svg'
import prenotazione from '../../../assets/booking.svg'
import reviews from '../../../assets/reviews.svg'
import './hamburgermenu.css';

export const HamburgerMenu = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

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
                        <Link to='/profilo'>
                            <li>Profilo</li>
                        </Link>
                        <Link to='/login'>
                            <li>Login</li>
                        </Link>
                        <Link to='/signup'>
                            <li>Sign Up</li>
                        </Link>
                        <hr />
                        <Link className='d-flex align-items-center justify-content-between gap-5' to='/prenota'>
                            <li>Prenota</li>
                            <img src={prenotazione} alt="prenotazione" className='icon-small' />
                        </Link>
                        <Link to='/latradizione'>
                            <li>La Tradizione</li>
                        </Link>
                        <Link className='d-flex align-items-center justify-content-between gap-5' to='/recensioni'>
                            <li>Recensioni</li>
                            <img src={reviews} alt="recensioni" className='icon-small' />
                        </Link>
                        <Link to='/contatti'>
                            <li>Contatti</li>
                        </Link>
                        <Link to='/chisiamo'>
                            <li>Chi Siamo</li>
                        </Link>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default HamburgerMenu;
