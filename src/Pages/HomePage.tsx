import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

const HomePage: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [lastShakeTime, setLastShakeTime] = useState(0);
    const [lastAcceleration, setLastAcceleration] = useState({ x: 0, y: 0, z: 0 });

    const ImageSrc = require('../img/GlavImg.png');

    useEffect(() => {
        const handleShake = (event: DeviceMotionEvent | null) => {
            const threshold = 0.5; // Пороговое значение для определения тряски
            const shakeTime = 200; // Время, в течение которого происходит тряска (мс)

            if (event && event.acceleration) {
                const { x, y, z } = event.acceleration;

                // Рассчитываем общую изменение акселерации
                const accelerationChange = Math.abs(x! - lastAcceleration.x) +
                    Math.abs(y! - lastAcceleration.y) +
                    Math.abs(z! - lastAcceleration.z);

                // Если общее изменение акселерации превышает порог и прошло достаточно времени с предыдущей тряски
                if (accelerationChange > threshold && Date.now() - lastShakeTime > shakeTime) {
                    setIsShaking(true);
                    setOpenModal(true);
                    setLastShakeTime(Date.now());
                } else {
                    setIsShaking(false);
                }

                // Обновляем последнее известное значение акселерации
                setLastAcceleration({ x: x!, y: y!, z: z! });
            }
        };

        if ('ondevicemotion' in window) {
            window.addEventListener('devicemotion', handleShake);
        }

        return () => {
            window.removeEventListener('devicemotion', handleShake);
        };
    }, []);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <img src={ImageSrc} alt="image" style={{ maxWidth: '100%', maxHeight: '50vh' }} />
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="primary" style={{ margin: '0 10px' }}>Button 1</Button>
                <Button variant="contained" color="primary" style={{ margin: '0 10px' }}>Button 2</Button>
                <Button variant="contained" color="primary" style={{ margin: '0 10px' }}>Button 3</Button>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Typography variant="body1">{isShaking ? 'Трясется' : 'Не трясется'}</Typography>
            </div>
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 4 }}>
                    <Typography variant="h5">Modal Title</Typography>
                    <Typography variant="body1">Modal content goes here...</Typography>
                    <Button variant="contained" color="primary" onClick={handleCloseModal} style={{ marginTop: '20px' }}>Close</Button>
                </Box>
            </Modal>
        </>
    );
};

export default HomePage;
