import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
import LoadingButton from '@mui/lab/LoadingButton';
import {  useCookies } from 'react-cookie';
import ErrorIcon from '@mui/icons-material/Error';

const defaultTheme = createTheme();

const ErrorMessage = ({ children }) => (
    <Typography variant="caption" color="error">
        <ErrorIcon style={{ marginRight: "5px", fontSize: '15px' }} />
        {children}
    </Typography>
);

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);
    
    useEffect(() => {
        if (cookies.accessToken) {
            navigate('/feedback'); // Redirect to feedback if user is already logged in
        }
    }, [cookies, navigate]);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = async (values) => {
        const toastId = toast.loading("Logging In...");
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signin`, values, {
                withCredentials: true
            });

            if (response.data.statuscode === 200 && response.data.message === "Login SuccessFully") {
                const { accessToken, refreshToken } = response.data;

                // Set access token expiration to 1 day
                const accessExpires = new Date();
                accessExpires.setDate(accessExpires.getDate() + 1);

                // Set refresh token expiration to 10 days
                const refreshExpires = new Date();
                refreshExpires.setDate(refreshExpires.getDate() + 10);

                // Set cookies with respective expiration times
                setCookie('accessToken', accessToken, {  expires: accessExpires, secure: true, sameSite: 'Strict' });
                setCookie('refreshToken', refreshToken, {  expires: refreshExpires, secure: true, sameSite: 'Strict' });

                toast.success(response.data.message, { id: toastId });
                navigate('/selectform');
            } else {
                toast.error(response.data.message, { id: toastId });
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong, try again later", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square sx={{ borderRadius: 4 }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 0.5, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={LoginSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        as={TextField}
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        error={errors.email && touched.email}
                                        helperText={errors.email && touched.email ? <ErrorMessage>{errors.email}</ErrorMessage> : null}
                                    />
                                    <Field
                                        as={TextField}
                                        margin="normal"
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="current-password"
                                        error={errors.password && touched.password}
                                        helperText={errors.password && touched.password ? <ErrorMessage>{errors.password}</ErrorMessage> : null}
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
                                    <Grid container>
                                        <Grid item xs>
                                            <Link to="/forgotpasswordlink" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                    </Grid>
                                    {loading ? (
                                        <LoadingButton fullWidth sx={{ mt: 3, mb: 2 }} loading variant="contained">
                                            Submit
                                        </LoadingButton>
                                    ) : (
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={loading}
                                        >
                                            Sign In
                                        </Button>
                                    )}
                                    <Grid container>
                                        <Grid item xs>
                                            <Link to="/resentemailverify" variant="body2">
                                                Resend Email verification?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="/signup" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
