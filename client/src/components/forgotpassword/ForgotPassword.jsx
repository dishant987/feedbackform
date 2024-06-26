import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import { IconButton, InputAdornment, Paper } from '@mui/material';
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingButton from '@mui/lab/LoadingButton';
import { useCookies } from 'react-cookie';

const defaultTheme = createTheme();

const ErrorMessage = ({ children }) => (
    <Typography variant="caption" color="error">
        <ErrorIcon style={{ marginRight: "5px", fontSize: '15px' }} />
        {children}
    </Typography>
);

const forgotSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required('New Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    conformPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

export default function ForgotPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const [cookies] = useCookies(['accessToken']);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleTogglePasswordVisibility1 = () => {
        setShowPassword1((prev) => !prev);
    };

    useEffect(() => {
        if (cookies.accessToken) {
            navigate('/feedback');
        }
    }, [cookies.accessToken]);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        if (!urlToken) {
            navigate('/login');
        }

        setToken(urlToken || "");
    }, []);

    // useEffect(() => {
    //     if (token.length > 0) {
    //         verifyUserEmail();
    //     }
    // }, [token]);

    const handleSubmit = async (values) => {
        let toastId = toast.loading('loading...');
        setLoading(true);
        console.log(values);

        try {
            const response = await axios.post('http://localhost:3000/api/verifyforgotpassword',
                {
                    token: token,
                    conformPassword: values.conformPassword
                }
            );

            console.log(response);

            if (response.status === 200 && response.data.message === "Password updated successfully") {
                toast.success(response.data.message, { id: toastId });
            }

            if (response.status === 200 && response.data.message === "Email Sent successfully and verify for login") {
                toast.success(response.data.message, { id: toastId });
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            if (error.response.status === 400 && error.response.data.error === "Token has expired or is invalid") {
                return toast.error(error.response.data.error, { id: toastId });
            }
            toast.error("Something went wrong, please try again later");
        } finally {
            setLoading(false);
            toastId = null;
        }
    };

    // const formatTime = (seconds) => {
    //     const minutes = Math.floor(seconds / 60);
    //     const secs = seconds % 60;
    //     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    // };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Paper sx={{ padding: '25px', marginTop: '200px' }}>
                    <Link to={'/login'}>
                        <Button variant='outlined' startIcon={<ArrowBack />}>
                        </Button>
                    </Link>
                    <Box
                        sx={{
                            marginTop: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography sx={{ paddingY: '10px' }} component="h1" variant="h5">
                            Forgot Password
                        </Typography>
                        {/* <Typography sx={{ paddingY: '10px' }} component="h2" variant="h6">
                            Link expires in: {formatTime(timeLeft)}
                        </Typography> */}
                        <Formik
                            initialValues={{
                                newPassword: '',
                                conformPassword: ''
                            }}
                            validationSchema={forgotSchema}
                            onSubmit={handleSubmit}
                        > {({ errors, touched, isValid }) => (
                            <Form>
                                <Box>
                                    <Field
                                        margin="normal"
                                        as={TextField}
                                        type={showPassword ? 'text' : 'password'}
                                        fullWidth
                                        error={errors.newPassword && touched.newPassword}
                                        helperText={errors.newPassword && touched.newPassword ? <ErrorMessage children={errors.newPassword} /> : null}
                                        id="newPassword"
                                        label="New Password"
                                        name="newPassword"
                                        autoComplete="new-password"
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

                                    <Field
                                        margin="normal"
                                        as={TextField}
                                        type={showPassword1 ? 'text' : 'password'}
                                        fullWidth
                                        error={errors.conformPassword && touched.conformPassword}
                                        helperText={errors.conformPassword && touched.conformPassword ? <ErrorMessage children={errors.conformPassword} /> : null}
                                        id="conformPassword"
                                        label="Confirm Password"
                                        name="conformPassword"
                                        autoComplete="new-password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleTogglePasswordVisibility1}
                                                        edge="end"
                                                    >
                                                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <LoadingButton
                                        type='submit'
                                        fullWidth sx={{ mt: 3, mb: 2 }}
                                        loading={loading}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        Send Link
                                    </LoadingButton>
                                </Box>
                            </Form>
                        )}
                        </Formik>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
