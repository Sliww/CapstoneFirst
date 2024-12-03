import './linksmenu.css';
import { Link } from "react-router-dom"

export const LinksMenu = () => {
    return (
        <ul className="menuLinks p-0 d-flex gap-5 mb-0">
            <Link to='/'>
                <li>Home</li>
            </Link>
            <div className="d-none d-lg-flex gap-5">
                <Link to='/prenota'>
                    <li>Prenota</li>
                </Link>
                <Link to='/latradizione'>
                    <li>La Tradizione</li>
                </Link>
                <Link to='/contatti'>
                    <li>Contatti</li>
                </Link>
            </div>
        </ul>
    )
}