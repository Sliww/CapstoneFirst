import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const Disclaimer = () => {
    useEffect(() => {
        const hasSeenDisclaimer = localStorage.getItem('disclaimerSeen');

        if (!hasSeenDisclaimer) {
            Swal.fire({
                title: 'DISCLAIMER!',
                text: `Gentile visitatore,

                        Questo sito web è stato creato esclusivamente a scopo accademico come parte di un progetto educativo.
    
                        Tutte le immagini sono utilizzate a scopo didattico, non commerciale. Non si vuole violare alcun diritto d'autore.`,
                icon: 'info',
                confirmButtonText: 'Ho capito',
                confirmButtonColor: '#28a745',
                width: '600px',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                backdrop: `
                    rgba(0,0,123,0.4)
                    left top
                    no-repeat
                `
            }).then(() => {
                localStorage.setItem('disclaimerSeen', 'true');
            });
        }
    }, []);

    return null;
};
