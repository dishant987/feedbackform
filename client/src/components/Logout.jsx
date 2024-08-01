import { Box, Button } from '@mui/material'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const [decodedToken, setDecodedToken] = useState(null);
    const navigate = useNavigate()


    const handleLogout = async () => {
        try {
            const res = await
                axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout`, {}, {
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`,
                    },
                })
            console.log(res);

            removeCookie('accessToken')
            toast.success('Logout successfull')
        } catch (error) {
            console.log(error);
            toast.error("somthing wrong try later")
        }
    }

    useEffect(() => {
        if (!cookies.accessToken) {
            navigate('/'); // Redirect to feedback if user is already logged in
        }
        const token = cookies.accessToken;

        if (token) {
            const decoded = jwtDecode(token);
            setDecodedToken(decoded);
        }
    }, [cookies.accessToken, navigate]);
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Button variant='contained' onClick={handleLogout}>
                Logout
            </Button>
        </Box>

    )
}

export default Logout