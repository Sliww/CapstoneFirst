import './navbar.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Logo } from './LogoComponent/Logo';
import { LinksMenu } from './LinksMenu/LinksMenuComponent';
import { HamburgerMenu } from './HamburgerMenuComponent/HamburgerMenu';
import { LoginSingUp } from './LoginSingUpComponent/LoginSingUp';

export const Navbar = () => {
    return (
        <Container fluid className='personal navbarBackground'>
            <Row className='p-2 align-items-center' style={{ flexWrap: 'nowrap' }}>
                <Col className='d-flex align-items-center gap-4'>
                    <Col xs='auto' className='p-0'>
                        <Logo />
                    </Col>
                    <Col xs='auto' className='p-0'>
                        <LinksMenu />
                    </Col>
                </Col>
                <Col className='d-flex justify-content-end align-items-center gap-5'>
                    <div className='d-none d-md-flex '>
                        <LoginSingUp />
                    </div>
                    <HamburgerMenu />
                </Col>
            </Row>
        </Container>
    )
}