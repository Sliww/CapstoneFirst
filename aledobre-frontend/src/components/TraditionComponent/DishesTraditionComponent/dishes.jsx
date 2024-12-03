import './dishes.css';
import { Row, Col } from 'react-bootstrap';

import pierogi from '../../../assets/pierogi.webp';
import zupy from '../../../assets/zupy.jpg';
import pyzy from '../../../assets/pyzy.webp';
import ziem from '../../../assets/ziem.jpg';
import crocchette from '../../../assets/krokiety.jpg';
import surowki from '../../../assets/surowki.jpg';
import dolci from '../../../assets/dolci.webp';

const dishesData = [
    {
        name: 'PIEROGI',
        description: 'I pierogi sono sicuramente il piatto più iconico della cucina polacca. Sono ravioli che possono essere riempiti con una vasta varietà di ingredienti, come carne macinata, formaggio, verdure, salse e possono essere addirittura dolci farcendoli con la frutta.',
        image: pierogi,
    },
    {
        name: 'ZUPPE',
        description: 'Le zuppe sono un pilastro della cucina polacca, perfette per riscaldare il cuore e il palato. Tra le più famose troviamo il barszcz, una zuppa di barbabietole dal sapore unico, e il zurek, a base di segale fermentata e servito spesso con salsiccia e uova. Ovviamente vanno menzionate anche la zuppa di pomodori, la zuppa di cetrioli e i flaki una zuppa di trippa.',
        image: zupy,
    },
    {
        name: 'PYZY E KOPYTKA',
        description: 'I pyzy e i kopytka sono gnocchi della tradizione polacca. I pyzy sono più grandi e ripieni, spesso di carne o formaggio, mentre i kopytka, simili agli gnocchi italiani, sono realizzati con patate e accompagnati da salse o condimenti saporiti.',
        image: pyzy,
    },
    {
        name: 'PLACKI ZIEMNIACZANE',
        description: 'I placki ziemniaczane sono deliziose frittelle di patate croccanti all\'esterno e morbide dentro. Perfette da gustare con panna acida, salsa di funghi o una spolverata di zucchero per chi li ama dolci.',
        image: ziem,
    },
    {
        name: 'KROKIETY',
        description: 'I krokiety sono involtini di crêpes farciti con carne, funghi o formaggio, arrotolati, impanati e fritti. Sono un accompagnamento classico a zuppe come il barszcz, per un\'esperienza davvero autentica.',
        image: crocchette,
    },
    {
        name: 'INSALATINE',
        description: 'Le insalatine polacche, "salatki o suròwki", sono contorni freschi e saporiti. A base di verdure grattugiate come cavolo, carote e cetrioli, sono insaporite con aceto, panna acida o maionese, perfette per bilanciare i piatti più ricchi.',
        image: surowki,
    },
    {
        name: 'DOLCI',
        description: 'La Polonia ha una vasta varietà di dolci, ricchi di sapori e tradizione. I pączki sono soffici bomboloni ripieni di marmellata o crema, perfetti per ogni occasione speciale. Il sernik, un cheesecake a base di twaróg, un formaggio tipico, è amato per la sua consistenza cremosa. I makowiec, rotoli ripieni di semi di papavero, sono un classico delle festività. Non può mancare la szarlotka, la versione polacca della torta di mele, spesso servita calda con una pallina di gelato.',
        image: dolci,
    },
];

export const Dishes = () => {
    return (
        <>
            {dishesData.map((dish, index) => (
                <Row key={index} className='d-flex align-items-center justify-content-center p-4'>
                    <Col xs={10} lg={5} className='imgDishes d-flex d-lg-none justify-content-center align-items-center'>
                        <img src={dish.image} alt={dish.name} className='img-fluid' />
                    </Col>
                    <Col xs={12} lg={5} className='d-flex justify-content-center align-items-center mb-3 mb-md-0'>
                        <div className='d-flex flex-column text-description gap-3'>
                            <h3 className='text-black text-center text-lg-end'>{dish.name}</h3>
                            <p className='text-black text-center text-lg-end'>{dish.description}</p>
                        </div>
                    </Col>
                    <Col xs={10} md={5} className='imgDishes d-none d-lg-flex justify-content-center align-items-center'>
                        <img src={dish.image} alt={dish.name} className='img-fluid' />
                    </Col>
                </Row>
            ))}
        </>
    );
}
