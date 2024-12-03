import './myprofile.css';
import { Container, Row, Col, Card, Image, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import profilepic from '../../../../assets/profilepic.jpeg'

export const MyProfile = () => {
    
    const [userProfile, setUserProfile] = useState({
        name: 'Nome',
        surname: 'Cognome',
        email: 'email@example.com',
        telephone: '1234567890',
        dob: '1990-01-01',
        isLazioResident: true,
        password: 'password'
    });

    
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
                                    alt="Profile" 
                                />
                            </div>
                            <div className="profile-info">
                                <Form>
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
                                    <Button type="submit" className='mt-2'>
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
