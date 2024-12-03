import './tradition.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Dishes } from './DishesTraditionComponent/dishes';
import rynek from '../../assets/rynek.webp'

export const Tradition = () => {
    return (
        <>
            <Container fluid className='background-tradition'>
                <Row>
                    <Col className='p-5'>
                        <strong><h1 className='text-center text-white'>LA TRADIZIONE</h1></strong>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-around pb-5'>
                    <Col xs={12} lg={5} className='fade-in-left rynek-img d-flex justify-content-center align-items-center'>
                        <img src={rynek} alt='Tradizione' className='img-fluid' />
                    </Col>
                    <Col xs={12} lg={6} className='fade-in-right d-flex justify-content-center align-items-center mt-3'>
                        <p className='text-white text-center text-lg-start text-tradition'>
                            La cucina <strong>polacca</strong> è un riflesso della sua storia ricca e complessa, plasmata dai cambiamenti <strong>sociali</strong> e <strong>culturali</strong> avvenuti nel corso dei secoli. Questo patrimonio culinario nasce dall’incontro e dalla reinterpretazione di influenze provenienti da altre tradizioni gastronomiche, tra cui quella <strong>russa, tedesca, francese, italiana ed ebraica</strong>. Ogni invasione e scambio culturale ha lasciato un’impronta, arricchendo i sapori e le tecniche culinarie. Oggi, la cucina polacca si distingue per la sua varietà e l’equilibrio tra <strong>piatti sostanziosi</strong> e <strong>delicate prelibatezze</strong>, capaci di raccontare una <strong>storia unica attraverso il gusto</strong>.
                        </p>
                    </Col>
                </Row>
                
            </Container>
            <Container fluid className='background-tradition-2'>
                <Dishes />
            </Container>
        </>
    );
}