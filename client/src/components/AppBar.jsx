import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';

function AppNavBar() {
    const [open, setOpen] = useState(false);
    const [cookies, , removeCookie] = useCookies(['accessToken', 'refreshToken']);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleLogout = () => {
        removeCookie('accessToken');
        removeCookie('refreshToken');
        toast.success('Logout successful');
    };

    const isLoggedIn = !!cookies.accessToken;

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            <Typography
                                variant="h6"
                                color="darkblue"
                                sx={{
                                    padding: 2,
                                    fontSize: {
                                        xs: '1.2rem',
                                        sm: '1.4rem',
                                        md: '1.6rem',
                                        lg: '1.8rem',
                                    },
                                }}
                            >
                                Feedback System
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 1.5,
                                alignItems: 'center',
                            }}
                        >
                            {isLoggedIn ? (
                                <Button
                                    sx={{ borderRadius: 4 }}
                                    color="primary"
                                    variant='outlined'
                                    size="small"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Link to={'/login'}>
                                        <Button
                                            sx={{ borderRadius: 4, color: 'white' }}
                                            color="primary"
                                            variant='outlined'
                                            size="small"
                                        >
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link to={"/signup"}>
                                        <Button
                                            sx={{ borderRadius: 4 }}
                                            color="primary"
                                            variant="contained"
                                            size="small"
                                        >
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </Box>
                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            <Button
                                variant="text"
                                color="primary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ minWidth: '30px', p: '4px' }}
                            >
                                <MenuIcon />
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        minWidth: '60vw',
                                        p: 2,
                                        backgroundColor: 'background.paper',
                                        flexGrow: 1,
                                    }}
                                >
                                    {isLoggedIn ? (
                                        <>
                                            <MenuItem>
                                                <Button
                                                    color="primary"
                                                    variant="outlined"
                                                    onClick={handleLogout}
                                                    sx={{ width: '100%' }}
                                                >
                                                    Logout
                                                </Button>
                                            </MenuItem>
                                        </>
                                    ) : (
                                        <>
                                            <MenuItem>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    component="a"
                                                    href="/signup"
                                                  
                                                    sx={{ width: '100%' }}
                                                >
                                                    Sign Up
                                                </Button>
                                            </MenuItem>
                                            <MenuItem>
                                                <Button
                                                    color="primary"
                                                    variant="outlined"
                                                    component="a"
                                                    href="/login"
                                                  
                                                    sx={{ width: '100%' }}
                                                >
                                                    Sign In
                                                </Button>
                                            </MenuItem>
                                        </>
                                    )}
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

AppNavBar.propTypes = {
    mode: PropTypes.oneOf(['dark', 'light']).isRequired,
    toggleColorMode: PropTypes.func.isRequired,
};

export default AppNavBar;
