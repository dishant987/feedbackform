import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useCookies } from 'react-cookie';

const defaultTheme = createTheme();

export default function AdminLogin() {

    const [showPassword, setShowPassword] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['adminaccessToken']);
    const navigate = useNavigate()

    useEffect(() => {
        if (cookies.adminaccessToken) {
            navigate('/feedbackdata');
        }
    }, [cookies.adminaccessToken, navigate]);
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin`, values);
            if (response.status === 200 && response.data.message === 'Login successful') {
                const { adminaccessToken, adminrefreshToken } = response.data
                const expires = new Date();
                expires.setDate(expires.getDate() + 1);

                setCookie('adminaccessToken', adminaccessToken, { expires })
                toast.success('Login successful')
                navigate('/feedbackdata')
            }

        } catch (error) {
            if (error.response.status === 401 && error.response.data.message === "Invalid user credentials") {
                toast.error(error.response.data.message)
            }
            if (error.response.status === 404 && error.response.data.message === "User does not exist") {
                toast.error(error.response.data.message)
            }
            if (error.response.status === 403 && error.response.data.message === "Only admins can access this route") {
                toast.error(error.response.data.message)
            }
            console.log(error.response);
        }
    };

    return (

        <Grid container alignItems={'center'} marginTop={'140px'} justifyContent={'center'} component="main" >
            {/* <CssBaseline /> */}

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} >
                <Box
                    sx={{
                        my: 4,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Admin Login
                    </Typography>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field
                                    margin="normal"
                                    as={TextField}

                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={errors.email && touched.email}
                                    helperText={errors.email && touched.email ? errors.email : null}
                                />
                                <Field
                                    margin="normal"
                                    as={TextField}

                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    error={errors.password && touched.password}
                                    helperText={errors.password && touched.password ? errors.password : null}
                                    InputProps={{
                                        endAdornment: (

                                            <InputAdornment position="end">

                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleTogglePasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    
                                >
                                    Sign In
                                </Button>

                            </Form>
                        )}
                    </Formik>
                </Box>
            </Grid>
        </Grid>

    );
}
