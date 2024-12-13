import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { DishSelection } from '../ReservationComponent/DishSelectionComponent/DishSelect';
import './reservation.css';
import { menus } from '../../data/menuConfigFrontend';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Reservation = () => {
    const [error, setError] = useState(null);
    const [availableDishes, setAvailableDishes] = useState([]);
    const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL_EPI;
    const navigate = useNavigate();

    const [reservationData, setReservationData] = useState({
        date: '',
        peopleCount: '',
        location: '',
        menuType: '',
        selectedDishes: [],
        intolerances: '',
        specialRequests: ''
    });

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch(`${BASE_URL}/dishes`);
                const data = await response.json();
                if (response.ok) {
                    setAvailableDishes(data.allDishes);
                } else {
                    throw new Error("Error loading dishes");
                }
            } catch (err) {
                setError({
                    title: "Error",
                    message: "Error loading dishes"
                });
            }
        };

        fetchDishes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Token not found");
            }

            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const userId = tokenData.id;

            const dishesById = {};
            availableDishes.forEach(dish => {
                dishesById[dish._id] = dish;
            });

            let selectedDishesByCategory;

            if (reservationData.menuType === 'minimal') {
                if (reservationData.selectedDishes.length !== 3) {
                    throw new Error('The minimal menu must have exactly 3 courses!');
                }

                const selectedDishes = reservationData.selectedDishes.map(id => dishesById[id]);
                
                const starterDish = selectedDishes.filter(dish => 
                    dish.category === 'Zuppa' || dish.category === 'Antipasto'
                );
                
                const mainDish = selectedDishes.filter(dish => 
                    dish.category === 'Primo' || dish.category === 'Secondo'
                );
                
                const dessertDish = selectedDishes.filter(dish => 
                    dish.category === 'Dolce'
                );

                if (starterDish.length !== 1) {
                    throw new Error('You must select ONE course between soup and antipasto!');
                }
                if (mainDish.length !== 1) {
                    throw new Error('You must select ONE course between first and second!');
                }
                if (dessertDish.length !== 1) {
                    throw new Error('You must select ONE dessert!');
                }

                selectedDishesByCategory = {
                    soupOrAppetizer: [starterDish[0]._id],
                    firstOrSecond: [mainDish[0]._id],
                    dessert: [dessertDish[0]._id]
                };
            } else {
                selectedDishesByCategory = {
                    soup: [],
                    appetizer: [],
                    firstCourse: [],
                    secondCourse: [],
                    dessert: []
                };

                reservationData.selectedDishes.forEach(dishId => {
                    const dish = dishesById[dishId];
                    switch (dish.category) {
                        case 'Zuppa':
                            selectedDishesByCategory.soup.push(dishId);
                            break;
                        case 'Antipasto':
                            selectedDishesByCategory.appetizer.push(dishId);
                            break;
                        case 'Primo':
                            selectedDishesByCategory.firstCourse.push(dishId);
                            break;
                        case 'Secondo':
                            selectedDishesByCategory.secondCourse.push(dishId);
                            break;
                        case 'Dolce':
                            selectedDishesByCategory.dessert.push(dishId);
                            break;
                    }
                });
            }

            const payload = {
                user: userId,
                date: reservationData.date,
                peopleCount: parseInt(reservationData.peopleCount),
                location: reservationData.location,
                menuType: reservationData.menuType,
                selectedDishes: selectedDishesByCategory,
                specialRequests: reservationData.specialRequests || '',
                intolerances: reservationData.intolerances || ''
            };

            const response = await fetch(`${BASE_URL}/reservation/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 403) {
                    await Swal.fire({
                        title: 'Prenotazione non disponibile',
                        text: 'Ci dispiace, ma le prenotazioni online sono disponibili solo per i residenti nel Lazio. Per prenotazioni fuori regione, contattaci direttamente via email: aledobre@info.com',
                        icon: 'info',
                        confirmButtonText: 'Ho capito',
                        confirmButtonColor: '#3085d6',
                        showCancelButton: true,
                        cancelButtonText: 'Chiudi',
                        cancelButtonColor: '#d33'
                    });
                    return;
                }

                if (data.errors) {
                    throw new Error(`Validation errors: ${data.errors.join(', ')}`);
                }
                throw new Error(data.error || data.message || 'Error creating reservation');
            }

            await Swal.fire({
                title: 'Prenotazione Confermata!',
                text: 'Verrai contattato al più presto per ricevere un preventivo dettagliato.',
                icon: 'success',
                confirmButtonText: 'Ho capito',
                confirmButtonColor: '#3085d6'
            });

            navigate('/');

        } catch (err) {
            setError({
                title: "Error creating reservation",
                message: err.message
            });
        }
    };

    const getPricePerPerson = (priceRanges, peopleCount) => {
        if (!peopleCount) return null;
        
        const range = priceRanges.find(
            range => peopleCount >= range.minPeople && peopleCount <= range.maxPeople
        );
        
        return range ? range.pricePerPerson : null;
    };

    return (
        <Container className="py-5">
            <Form onSubmit={handleSubmit}>
                <section className="mb-5">
                    <h3 className="mb-4 pt-5 pb-5">PRENOTAZIONE</h3>
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Data dell'evento</Form.Label>
                                <Form.Control
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={reservationData.date}
                                    onChange={(e) => setReservationData(prev => ({
                                        ...prev,
                                        date: e.target.value
                                    }))}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Numero di persone</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="2"
                                    max="40"
                                    value={reservationData.peopleCount}
                                    onChange={(e) => setReservationData(prev => ({
                                        ...prev,
                                        peopleCount: e.target.value
                                    }))}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Inserisci l'indirizzo"
                                    value={reservationData.location}
                                    onChange={(e) => setReservationData(prev => ({
                                        ...prev,
                                        location: e.target.value
                                    }))}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </section>

                <section className="mb-5">
                    <h3 className="mb-4">Scegli il Tipo di Menu</h3>
                    <Row>
                        {menus.map(menu => (
                            <Col md={6} lg={3} key={menu.name} className="mb-3">
                                <Card
                                    className={`menu-type-card ${reservationData.menuType === menu.name ? 'selected' : ''}`}
                                    onClick={() => setReservationData(prev => ({
                                        ...prev,
                                        menuType: menu.name,
                                        selectedDishes: []
                                    }))}
                                >
                                    <Card.Body>
                                        <Card.Title>{menu.name.toUpperCase()}</Card.Title>
                                        <Card.Text>{menu.description}</Card.Text>
                                        <small>
                                            {menu.displayRules.map((rule, index) => (
                                                <div key={index}>• {rule}</div>
                                            ))}
                                        </small>
                                        {reservationData.peopleCount && (
                                            <div className="mt-3">
                                                {getPricePerPerson(menu.priceRanges, parseInt(reservationData.peopleCount)) ? (
                                                    <strong className="text-success">
                                                        Prezzo medio per persona: €{getPricePerPerson(menu.priceRanges, parseInt(reservationData.peopleCount))}
                                                    </strong>
                                                ) : (
                                                    <span className="text-danger">
                                                        Numero di persone non valido per questo menu
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                {reservationData.menuType && (
                    <section className="mb-5">
                        <h3 className="mb-4">Seleziona i Piatti per il tuo Menu {reservationData.menuType.toUpperCase()}</h3>
                        <DishSelection
                            menuType={reservationData.menuType}
                            availableDishes={availableDishes}
                            selectedDishes={reservationData.selectedDishes}
                            onDishSelect={(newSelection) => setReservationData(prev => ({
                                ...prev,
                                selectedDishes: newSelection
                            }))}
                        />
                    </section>
                )}

                <section className="mb-5">
                    <h3 className="mb-4">Intolleranze e Richieste Speciali</h3>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Intolleranze o Allergie</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={reservationData.intolerances}
                                    onChange={(e) => setReservationData(prev => ({
                                        ...prev,
                                        intolerances: e.target.value
                                    }))}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Richieste Speciali</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={reservationData.specialRequests}
                                    onChange={(e) => setReservationData(prev => ({
                                        ...prev,
                                        specialRequests: e.target.value
                                    }))}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </section>

                <div>
                    <button
                        className='btn-saved'
                        type="submit"
                        size="lg"
                    >
                        Conferma Prenotazione
                    </button>
                </div>
            </Form>
        </Container>
    );
};
