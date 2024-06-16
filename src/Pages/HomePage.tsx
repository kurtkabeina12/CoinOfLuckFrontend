import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HammerIcon from '@mui/icons-material/Gavel'; // Imported for mining icon

const ImageSrc = require('../img/GlavImg.png');

const TopBar = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#1A1A1A',
}));

const Overlay = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: '#242424',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
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

const StyledMiningButton = styled(Button)(({ theme }) => ({
    flex: 1,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textTransform: 'none',
    backgroundColor: '#019863',
    borderRadius: '1rem',
    border: "1px solid #0000003b",
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    '&:hover': {
        backgroundColor: '#017A50',
    },
    '&:active': {
        backgroundColor: '#015A40',
    },
    '&.Mui-disabled': {
        color: 'rgba(255, 255, 255, 0.87)',
        backgroundColor: 'rgba(1, 152, 99, 0.5)',
    },
}));

const HomePage = () => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [coins, setCoins] = useState<number>(0);
    const [miningFinished, setMiningFinished] = useState<boolean>(false);
    const navigate = useNavigate();

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
                position: 'relative',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#1A1A1A',
                color: 'white',
                overflowX: 'hidden',
            }}
        >
            <TopBar>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <AccountCircleIcon sx={{ marginRight: '0.5rem' }} />
                    <Typography variant="caption">Имя пользователя</Typography>
                </Box>
            </TopBar>
            <Typography variant="h5" sx={{ padding: '20px 0' }}>Start mining now</Typography>
            <Box
                sx={{
                    width: '100%',
                    minHeight: '218px',
                    backgroundImage: `url(${ImageSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}
            />
            <Box sx={{ padding: '20px' }}>
                {timeLeft !== null && timeLeft > 0 ? (
                    <StyledMiningButton disabled>
                        <Typography variant="caption">Farming</Typography>
                        <Typography variant="caption">{formatTime(timeLeft)}</Typography>
                    </StyledMiningButton>
                ) : miningFinished ? (
                    <StyledMiningButton onClick={handleClaim}>
                        <Typography variant="caption">Claim $20</Typography>
                    </StyledMiningButton>
                ) : (
                    <StyledMiningButton onClick={handleStartMining}>
                        <Typography variant="caption">Start Farming</Typography>
                    </StyledMiningButton>
                )}
            </Box>
            <Overlay>
                <NavButton startIcon={<HammerIcon />} onClick={() => navigate('/')}>
                    <Typography variant="caption">Mining</Typography>
                </NavButton>
                <NavButton startIcon={<AssignmentIcon />} onClick={() => navigate('/tasks')}>
                    <Typography variant="caption">Tasks</Typography>
                </NavButton>
                <NavButton startIcon={<PeopleIcon />} onClick={() => navigate('/friends')}>
                    <Typography variant="caption">Friends</Typography>
                </NavButton>
            </Overlay>
        </Box>
    );
};

export default HomePage;
