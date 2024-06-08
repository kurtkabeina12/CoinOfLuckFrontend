import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const ImageSrc = require('../img/GlavImg.png');

  useEffect(() => {
    const handleShake = (event: DeviceMotionEvent | null) => {
        const threshold = 15; 
      
        // Проверяем, если данные о тряске доступны и превышают пороговое значение
        if (event && event.acceleration) {
          if (
            Math.abs(event.acceleration.x ?? 0) > threshold ||
            Math.abs(event.acceleration.y ?? 0) > threshold ||
            Math.abs(event.acceleration.z ?? 0) > threshold
          ) {
            setIsShaking(true);
            setOpenModal(true);
          } else {
            setIsShaking(false);
          }
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
