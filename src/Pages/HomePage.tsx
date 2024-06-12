import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';
import DiamondIcon from '@mui/icons-material/Diamond';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const ImageSrc = require('../img/GlavImg.png');
const BackgroundImage = require('../img/Fon1.png');

const TopBar = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    backdropFilter: 'blur(5px)',
    borderRadius: '2rem',
    margin: theme.spacing(2),
}));

const Overlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    borderRadius: '2rem',
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

const StyledFarmingButton = styled(Button)(({ theme }) => ({
    flex: 1,
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textTransform: 'none',
    backgroundColor: 'rgba(128, 128, 128, 0.7)', // Semi-transparent gray
    backgroundImage: 'linear-gradient(to right, gold, rgba(255, 255, 255, 0.4))', // Gold gradient from left to right
    borderRadius: '1rem',
    border: "1px solid #0000003b",
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    '&:hover': {
        backgroundColor: 'rgba(128, 128, 128, 0.9)', // More opaque on hover
    },
    '&:active': {
        backgroundColor: 'rgba(128, 128, 128, 0.5)', // More transparent on active
    },
    '&.Mui-disabled': {
        color: 'rgba(0, 0, 0, 0.87)',
        backgroundColor: 'rgba(128, 128, 128, 0.3)', // More transparent when disabled
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
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <TopBar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountCircleIcon sx={{ marginRight: '0.5rem' }} />
                    <Typography variant="caption">Имя пользователя</Typography>
                </Box>
                <Box>
                    <Button startIcon={<MonetizationOnIcon />} sx={{ color: 'white' }}></Button>
                    <Button startIcon={<DiamondIcon />} sx={{ color: 'white' }}></Button>
                </Box>
            </TopBar>
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
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <StyledFarmingButton onClick={handleStartMining} disabled={timeLeft !== null}>
                    {timeLeft !== null ? (
                        <>
                            <Typography variant="caption">Farming</Typography>
                            <Typography variant="caption">{formatTime(timeLeft)}</Typography>
                        </>
                    ) : (
                        <Typography variant="caption">Start Farming</Typography>
                    )}
                </StyledFarmingButton>
            </Box>
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
