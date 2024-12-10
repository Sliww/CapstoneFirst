import React, { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import './signup.css';

export const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        dob: '',
        email: '',
        telephone: '',
        password: '',
        isLazioResident: false
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = {};
        if (!formData.name.match(/^[A-Za-z\s]{2,20}$/)) {
            newErrors.name = 'Il nome deve contenere solo lettere (2-20 caratteri)';
        }
        if (!formData.surname.match(/^[A-Za-z\s]{2,20}$/)) {
            newErrors.surname = 'Il cognome deve contenere solo lettere (2-20 caratteri)';
        }
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'Email non valida';
        }
        if (!formData.telephone.match(/^[0-9]{10}$/)) {
            newErrors.telephone = 'Il numero deve contenere 10 cifre';
        }
        if (!formData.password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[?!-_])[A-Za-z0-9?!-_]{8,}$/)) {
            newErrors.password = 'La password deve contenere almeno 8 caratteri, una maiuscola, un numero e un carattere speciale';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            Object.values(newErrors).forEach(error => {
                toast.error(error);
            });
            return;
        }

        const loadingToast = toast.loading('Registrazione in corso...');

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/user/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success('Registrazione completata con successo!', {
                    id: loadingToast,
                    duration: 4000
                });
                
                
                setFormData({
                    name: '',
                    surname: '',
                    dob: '',
                    email: '',
                    telephone: '',
                    password: '',
                    isLazioResident: false
                });
            } else {
                const data = await response.json();
                
                toast.error(data.message || 'Errore durante la registrazione', {
                    id: loadingToast
                });
            }
        } catch (error) {
            console.error('Errore:', error);
            
            toast.error('Errore durante la registrazione. Riprova più tardi.', {
                id: loadingToast
            });
        }
    };

    return (
        <Container>
            <Toaster 
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        style: {
                            background: 'green',
                        },
                    },
                    error: {
                        duration: 4000,
                        style: {
                            background: '#973131',
                        },
                    },
                    loading: {
                        style: {
                            background: '#333',
                        },
                    },
                }}
            />
            
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <Card className="my-profile-card mt-5">
                        <Card.Body>
                            <h2 className="text-center text-white mb-4">Registrazione</h2>
                            
                            <div className="profile-info text-white">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formName" className='pb-4'>
                                        <Form.Label>Nome *</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="name" 
                                            value={formData.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formSurname" className='pb-4'>
                                        <Form.Label>Cognome *</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="surname" 
                                            value={formData.surname}
                                            onChange={handleChange}
                                            isInvalid={!!errors.surname}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.surname}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formDob" className='pb-4'>
                                        <Form.Label>Data di Nascita *</Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            name="dob" 
                                            value={formData.dob}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail" className='pb-4'>
                                        <Form.Label>Email *</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            name="email" 
                                            value={formData.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formTelephone" className='pb-4'>
                                        <Form.Label>Telefono *</Form.Label>
                                        <Form.Control 
                                            type="tel" 
                                            name="telephone" 
                                            value={formData.telephone}
                                            onChange={handleChange}
                                            isInvalid={!!errors.telephone}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.telephone}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formPassword" className='pb-4'>
                                        <Form.Label>Password *</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            name="password" 
                                            value={formData.password}
                                            onChange={handleChange}
                                            isInvalid={!!errors.password}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formIsLazioResident" className='pb-4'>
                                        <Form.Check 
                                            type="checkbox"
                                            label="Sono residente nel Lazio"
                                            name="isLazioResident"
                                            checked={formData.isLazioResident}
                                            onChange={handleChange}
                                            className="text-white"
                                        />
                                    </Form.Group>

                                    <button type="submit" className='btns-common mt-2'>
                                        Registrati
                                    </button>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

