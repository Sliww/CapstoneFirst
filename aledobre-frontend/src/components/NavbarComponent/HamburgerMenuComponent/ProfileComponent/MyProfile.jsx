import './myprofile.css';
import { Container, Row, Col, Card, Image, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import profilepic from '../../../../assets/profilepic.jpeg'

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
            const tokenString = localStorage.getItem('token');
            if (!tokenString) {
                console.error('Token non trovato nel localStorage');
                return;
            }

            const token = JSON.parse(tokenString);
            
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Dati ricevuti:', data);
                
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
                console.error('Errore nella risposta:', response.status);
            }
        } catch (error) {
            console.error('Errore nella richiesta:', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/users/update`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userProfile)
            });

            if (response.ok) {
                alert('Profilo aggiornato con successo!');
            } else {
                alert('Errore nell\'aggiornamento del profilo');
            }
        } catch (error) {
            console.error('Errore nella richiesta:', error);
            alert('Errore nella richiesta di aggiornamento');
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
                    <Card className="my-profile-card">
                        <Card.Body>
                            <div className="profile-image-container">
                                <Image 
                                    src={profilepic}
                                    roundedCircle 
                                    className="profile-image" 
                                    alt="ProfilePicture" 
                                />
                            </div>
                            <div className="profile-info text-white">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="name" 
                                            value={userProfile.name} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formSurname">
                                        <Form.Label>Cognome</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="surname" 
                                            value={userProfile.surname} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            name="email" 
                                            value={userProfile.email} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formTelephone">
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="telephone" 
                                            value={userProfile.telephone} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formDob">
                                        <Form.Label>Data di Nascita</Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            name="dob" 
                                            value={userProfile.dob} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formIsLazioResident">
                                        <Form.Label>Residente nel Lazio</Form.Label>
                                        <Form.Check 
                                            type="checkbox" 
                                            name="isLazioResident" 
                                            checked={userProfile.isLazioResident} 
                                            onChange={e => handleChange({ target: { name: 'isLazioResident', value: e.target.checked } })} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            name="password" 
                                            value={userProfile.password} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>
                                    <Button type="submit" className='btns-common mt-2'>
                                        Salva Modifiche
                                    </Button>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
