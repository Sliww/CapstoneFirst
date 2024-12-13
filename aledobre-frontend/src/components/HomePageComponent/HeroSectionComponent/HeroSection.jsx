import './hero.css'
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
    return (
        <Container fluid className='background-tradition'>
            <Row>
                <Col className='mt-5 pe-0 ps-0'>
                    <header>
                        <div className='hero-background p-5 text-center'>
                            <div className='overlay'/>
                            
                            <div className='content-wrapper'>
                                <div className='d-flex flex-column justify-content-between h-100'>
                                    <div className='text-white text-center'>
                                        <h1 className='mb-3 focus-in-expand'>La Polonia a Casa Tua</h1>
                                        <h4 className='mb-3 text-focus-in'>Prenota il tuo chef a domicilio in pochi click, e lasciati sorprendere dai sapori autentici della Polonia</h4>
                                    </div>
                                    <div className='text-center'>
                                        <Link to="/prenota" className='btn btn-outline-light btn-lg'>
                                            Prenota ora
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </Col>
            </Row>
        </Container>
    )
}
