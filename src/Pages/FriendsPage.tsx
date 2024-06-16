import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';
import DiamondIcon from '@mui/icons-material/Diamond';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface FriendsPageProps {
    userId: number;
    username: string;
}

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

const FriendsPage: React.FC = () => {
    const navigate = useNavigate();

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
            </Overlay>
        </Box>
    );
};

export default FriendsPage;
