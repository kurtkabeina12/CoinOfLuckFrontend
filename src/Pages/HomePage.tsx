import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';
import DiamondIcon from '@mui/icons-material/Diamond';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ImageSrc = require('../img/GlavImg.png');

const TopBar = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    width: '90%',
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
    width: '90%',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '1rem',
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    '& .MuiButton-startIcon': {
        margin: 0,
        marginBottom: theme.spacing(0.5),
    },
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:active': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
}));

const StyledFarmingButton = styled(Button)(({ theme }) => ({
    flex: 1,
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textTransform: 'none',
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    backgroundImage: 'linear-gradient(to right, gold, rgba(255, 255, 255, 0.4))',
    borderRadius: '1rem',
    border: "1px solid #0000003b",
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    '&:hover': {
        backgroundColor: 'rgba(128, 128, 128, 0.9)',
    },
    '&:active': {
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
    },
    '&.Mui-disabled': {
        color: 'rgba(0, 0, 0, 0.87)',
        backgroundColor: 'rgba(128, 128, 128, 0.3)',
    },
}));

const HomePage: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [coins, setCoins] = useState<number>(0);
    const [miningFinished, setMiningFinished] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleShowCurrentURL = () => {
        const currentURL = window.location.href;
        alert(`Current URL: ${currentURL}`);
    };

    useEffect(() => {
        const endTime = localStorage.getItem('endTime');
        const storedCoins = localStorage.getItem('coins');
        const miningStatus = localStorage.getItem('miningFinished') === 'true';

        if (storedCoins) {
            setCoins(Number(storedCoins));
        }

        if (endTime) {
            const timeRemaining = Math.floor((Number(endTime) - Date.now()) / 1000);
            if (timeRemaining > 0) {
                setTimeLeft(timeRemaining);
            } else {
                setTimeLeft(0);
                setMiningFinished(true);
                localStorage.setItem('miningFinished', 'true');
                localStorage.removeItem('endTime');
            }
        } else if (miningStatus) {
            setTimeLeft(0);
            setMiningFinished(true);
        }

        let timer: NodeJS.Timeout;
        if (timeLeft !== null && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev !== null && prev > 0) {
                        return prev - 1;
                    } else {
                        setMiningFinished(true);
                        localStorage.setItem('miningFinished', 'true');
                        clearInterval(timer);
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleStartMining = () => {
        const endTime = Date.now() + 10 * 1000; // 10 seconds for testing
        localStorage.setItem('endTime', endTime.toString());
        localStorage.removeItem('miningFinished');
        setMiningFinished(false);
        setTimeLeft(10); // 10 seconds
    };

    const handleClaim = () => {
        setCoins((prev) => {
            const newTotal = prev + 20;
            localStorage.setItem('coins', newTotal.toString());
            return newTotal;
        });
        setTimeLeft(null);
        setMiningFinished(false);
        localStorage.removeItem('endTime');
        localStorage.removeItem('miningFinished');
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
                backgroundColor: '#f0f0f0',
            }}
        >
            <TopBar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountCircleIcon sx={{ marginRight: '0.5rem' }} />
                    <Typography variant="caption">Имя пользователя</Typography>
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
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6" gutterBottom>Coins: {coins}</Typography>
                {timeLeft !== null && timeLeft > 0 ? (
                    <StyledFarmingButton disabled>
                        <Typography variant="caption">Farming</Typography>
                        <Typography variant="caption">{formatTime(timeLeft)}</Typography>
                    </StyledFarmingButton>
                ) : miningFinished ? (
                    <StyledFarmingButton onClick={handleClaim}>
                        <Typography variant="caption">Claim $20</Typography>
                    </StyledFarmingButton>
                ) : (
                    <StyledFarmingButton onClick={handleStartMining}>
                        <Typography variant="caption">Start Farming</Typography>
                    </StyledFarmingButton>
                )}
            </Box>
            <Overlay>
                <NavButton startIcon={<DiamondIcon />} onClick={() => navigate('/')}>
                    <Typography variant="caption">Mine</Typography>
                </NavButton>
                <NavButton startIcon={<AssignmentIcon />} onClick={() => navigate('/tasks')}>
                    <Typography variant="caption">Task</Typography>
                </NavButton>
                <NavButton startIcon={<PeopleIcon />} onClick={() => navigate('/friends')}>
                    <Typography variant="caption">Friends</Typography>
                </NavButton>
                <NavButton onClick={handleShowCurrentURL}>
                    <Typography variant="caption">Show Current URL</Typography>
                </NavButton>
            </Overlay>
        </Box>
    );
};

export default HomePage;
