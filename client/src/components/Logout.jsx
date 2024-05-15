import { Box, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const navigate = useNavigate()
    
    const handleLogout =  ()=>{
           removeCookie('accessToken')
           toast.success('Logout successfull')
    }
    useEffect(() => {
        if (!cookies.accessToken) {
            navigate('/'); // Redirect to feedback if user is already logged in
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