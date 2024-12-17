import './myprofile.css';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { ManageReservation } from './ManageReservationComponent/ManageReservation';
import Swal from 'sweetalert2';

export const MyProfile = () => {
    
    const [userProfile, setUserProfile] = useState({
        name: '',
        surname: '',
        email: '',
        telephone: '',
        dob: '',
        isLazioResident: false,
        password: ''
    });

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            const cleanToken = token.replace(/^"|"$/g, '');
            
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${cleanToken}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                const userData = data.user || data;
                
                setUserProfile({
                    name: userData.name || '',
                    surname: userData.surname || '',
                    email: userData.email || '',
                    telephone: userData.telephone || '',
                    dob: userData.dob ? userData.dob.split('T')[0] : '',
                    isLazioResident: userData.isLazioResident || false,
                    password: ''
                });
            } else {
                console.error('Error', response.status);
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                await Swal.fire({
                    title: 'Errore',
                    text: 'Token non trovato. Effettua nuovamente il login.',
                    icon: 'error',
                    confirmButtonColor: '#dc3545'
                });
                return;
            }

            const cleanToken = token.replace(/^"|"$/g, '');

            const updatedProfile = Object.fromEntries(
                Object.entries(userProfile).filter(([_, value]) => 
                    value !== '' && value !== undefined
                )
            );

            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/users/update`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${cleanToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProfile)
            });

            if (response.ok) {
                await Swal.fire({
                    title: 'Successo!',
                    text: 'Profilo aggiornato con successo',
                    icon: 'success',
                    confirmButtonColor: '#28a745'
                });
                fetchUserProfile();
            } else {
                const errorData = await response.json();
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    await Swal.fire({
                        title: 'Sessione Scaduta',
                        text: 'Effettua nuovamente il login',
                        icon: 'warning',
                        confirmButtonColor: '#ffc107'
                    });
                } else {
                    await Swal.fire({
                        title: 'Errore',
                        text: errorData.message || 'Errore nell\'aggiornamento del profilo',
                        icon: 'error',
                        confirmButtonColor: '#dc3545'
                    });
                }
            }
        } catch (error) {
            console.error('Errore dettagliato:', error);
            await Swal.fire({
                title: 'Errore di Connessione',
                text: 'Errore nella connessione al server. Riprova più tardi.',
                icon: 'error',
                confirmButtonColor: '#dc3545'
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <Card className="my-profile-card mt-5">
                        <Card.Body>
                            <h2 className="text-center text-white mb-4">Modifica Profilo</h2>
                            
                            <div className="profile-info text-white">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formName" className='pb-4'>
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="name" 
                                            value={userProfile.name} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formSurname" className='pb-4'>
                                        <Form.Label>Cognome</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="surname" 
                                            value={userProfile.surname} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail" className='pb-4'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            name="email" 
                                            value={userProfile.email} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formTelephone" className='pb-4'>
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="telephone" 
                                            value={userProfile.telephone} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formDob" className='pb-4'>
                                        <Form.Label>Data di Nascita</Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            name="dob" 
                                            value={userProfile.dob} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formIsLazioResident" className='pb-4'>
                                        <Form.Label>Residente nel Lazio</Form.Label>
                                        <Form.Check 
                                            type="checkbox" 
                                            name="isLazioResident" 
                                            checked={userProfile.isLazioResident} 
                                            onChange={e => handleChange({ target: { name: 'isLazioResident', value: e.target.checked } })} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword" className='pb-4'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            name="password" 
                                            value={userProfile.password} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                    <button type="submit" className='btns-common mt-2'>
                                        Salva Modifiche
                                    </button>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ManageReservation />
        </Container>
    );
};
