import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import GavelIcon from '@mui/icons-material/Gavel';

const ImageSrc = require('../img/GlavImg.png');

const Overlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    width: '90%', // Add some margin for better spacing
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    margin: '0 5%', // Add margin for proper spacing from the edges
    borderRadius: '4rem',
}));

const CustomButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
    color: 'black',
    width: '100%', // Full width
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // More opaque on hover
    },
    '&:active': {
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // More transparent on active
    },
}));

const HomePage: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (timeLeft !== null) {
            timer = setInterval(() => {
                setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleStartMining = () => {
        setTimeLeft(8 * 60 * 60); // 8 hours in seconds
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <Box
            sx={{
                position: 'relative',
                textAlign: 'center',
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Box
                component="img"
                src={ImageSrc}
                alt="main"
                sx={{
                    maxWidth: '100%',
                    maxHeight: '40vh',
                    objectFit: 'contain',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '20%',
                    width: '90%',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0 5%',
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStartMining}
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        color: 'black',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        },
                        '&:active': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        },
                    }}
                >
                    Start Mining
                </Button>
            </Box>
            {timeLeft !== null && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '15%',
                        width: '90%',
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '0 5%',
                    }}
                >
                    <Typography variant="h5" color="white">
                        Time Left: {formatTime(timeLeft)}
                    </Typography>
                </Box>
            )}
            <Overlay>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
                    <CustomButton startIcon={<GavelIcon />} aria-label="mine">
                        Mine
                    </CustomButton>
                    <CustomButton startIcon={<AssignmentIcon />} aria-label="task">
                        Task
                    </CustomButton>
                    <CustomButton startIcon={<PeopleIcon />} aria-label="friends">
                        Friends
                    </CustomButton>
                </Box>
            </Overlay>
        </Box>
    );
};

export default HomePage;
