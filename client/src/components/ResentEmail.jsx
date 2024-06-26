import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import { IconButton, InputAdornment, Paper } from '@mui/material';
import { ArrowBack, ErrorOutlineOutlined, ErrorOutlineTwoTone, Visibility, VisibilityOff } from '@mui/icons-material';
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

export default function SignUp() {


    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate()
    const [cookies] = useCookies(['accessToken']);

    useEffect(() => {
        if (cookies.accessToken) {
            navigate('/feedback'); // Redirect to feedback if user is already logged in
        }
    }, [cookies.accessToken]);



    const SignupSchema = Yup.object().shape({

        email: Yup.string().email('Invalid email').required('Required'),

    });

    const handleSubmit = async (values) => {
        let toastId = toast.loading('loading...')
        setLoading(true); // Start loading
        try {
            const response = await axios.post('http://localhost:3000/api/resentmail', values);
            console.log(response);

            if (response.status == 200 && response.data.message == "Email is already verifyed") {
                toast.success(response.data.message, { id: toastId })

            }

            if (response.status == 200 && response.data.message == "Email Sent successfully and verify for login") {
                toast.success(response.data.message, { id: toastId })
                navigate('/login')
            }
        } catch (error) {
            console.error(error);
            if (error.response.status == 404 && error.response.data.error == "Email not Found") {
                return toast.error(error.response.data.error, { id: toastId })

            }
            toast.error("Something wrong, try again later ")
        } finally {
            setLoading(false); // Stop loading
            toastId = null;
        }
    };

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

                        <Formik
                            initialValues={{

                                email: '',

                            }}
                            validationSchema={SignupSchema}
                            onSubmit={handleSubmit}
                        > {({ errors, touched, isValid }) => (
                            <Form>
                                <Box sx={{ mt: 2 }}>



                                    <Field
                                        as={TextField}

                                        fullWidth
                                        error={errors.email && touched.email}
                                        helperText={errors.email && touched.email ? <ErrorMessage children={errors.email} /> : null}
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />





                                    <LoadingButton
                                        type='submit'
                                        fullWidth sx={{ mt: 3, mb: 2 }}
                                        loading={loading}
                                        loadingPosition="end"
                                        variant="contained"
                                    >
                                        Resent
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
