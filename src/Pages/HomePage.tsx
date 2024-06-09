import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';
import DiamondIcon from '@mui/icons-material/Diamond';
import AssignmentIcon from '@mui/icons-material/Assignment';

const ImageSrc = require('../img/GlavImg.png');

const Overlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    width: '95%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    borderRadius: '2rem',
    margin: theme.spacing(2),
}));

const NavButton = styled(Button)(({ theme }) => ({
    flex: 1,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textTransform: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
    borderRadius: '1rem',
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    '& .MuiButton-startIcon': {
        margin: 0,
        marginBottom: theme.spacing(0.5),
    },
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly more opaque on hover
    },
    '&:active': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // More transparent on active
    },
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
        setTimeLeft(8 * 60 * 60); 
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
                margin: '0 5%',
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
                    bottom: '30%',
                    width: '90%',
                    display: 'flex',
                    justifyContent: 'center',
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
                        bottom: '25%',
                        width: '90%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h5" color="white">
                        Time Left: {formatTime(timeLeft)}
                    </Typography>
                </Box>
            )}
            <Overlay>
                <NavButton startIcon={<DiamondIcon />}>
                    <Typography variant="caption">Mine</Typography>
                </NavButton>
                <NavButton startIcon={<AssignmentIcon />}>
                    <Typography variant="caption">Task</Typography>
                </NavButton>
                <NavButton startIcon={<PeopleIcon />}>
                    <Typography variant="caption">Friends</Typography>
                </NavButton>
            </Overlay>
        </Box>
    );
};

export default HomePage;
