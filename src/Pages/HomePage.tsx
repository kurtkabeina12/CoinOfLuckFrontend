import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

interface Acceleration {
    x: number;
    y: number;
    z: number;
}

const HomePage: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const ImageSrc = require('../img/GlavImg.png');
    const [prevAcceleration, setPrevAcceleration] = useState<Acceleration>({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        const handleShake = (event: DeviceMotionEvent) => {
            const threshold = 3; // Пороговое значение для определения тряски
            const { x, y, z } = event.acceleration || { x: 0, y: 0, z: 0 };

            const deltaX = Math.abs((x || 0) - prevAcceleration.x);
            const deltaY = Math.abs((y || 0) - prevAcceleration.y);
            const deltaZ = Math.abs((z || 0) - prevAcceleration.z);

            // Проверяем, если изменение ускорения превышает пороговое значение
            if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
                setIsShaking(true);
                setOpenModal(true);
            } else {
                setIsShaking(false);
            }

            // Обновляем предыдущие значения ускорений
            setPrevAcceleration({ x: x || 0, y: y || 0, z: z || 0 });
        };

        if ('ondevicemotion' in window) {
            window.addEventListener('devicemotion', handleShake);
        }

        return () => {
            window.removeEventListener('devicemotion', handleShake);
        };
    }, [prevAcceleration]);

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
