import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const defaultTheme = createTheme();

export default function AdminLogin() {

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:3000/api/admin', values);
            console.log(response.data);
          
        } catch (error) {
            console.error(error);
            toast.error("Somthing wrong try after sometime ")
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container alignItems={'center'} marginTop={'140px'}  justifyContent={'center'} component="main" sx={{ height: 'auto' }}>
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
        </ThemeProvider>
    );
}
