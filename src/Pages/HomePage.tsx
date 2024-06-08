import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const ImageSrc = require('../img/GlavImg.png');

  useEffect(() => {
    const handleShake = () => {
      setIsShaking(true); // Устанавливаем состояние "Трясется" при тряске
      setOpenModal(true); // Показываем модальное окно при тряске
    };

    if ('ondevicemotion' in window) {
      window.ondevicemotion = handleShake;
    }

    return () => {
      window.ondevicemotion = null;
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
