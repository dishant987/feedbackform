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
import LoadingButton from '@mui/lab/LoadingButton';
import { useCookies } from 'react-cookie';
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
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    useEffect(() => {
        if (cookies.accessToken) {
            navigate('/feedback'); // Redirect to feedback if user is already logged in
        }
    }, [cookies.accessToken, navigate]);
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = async (values) => {
        const toastId = toast.loading("Logging In...");
        setLoading(true); // Start loading
        try {
            const response = await axios.post('http://localhost:3000/api/users/signin', values);
            console.log(response.data);
            if (response.data.statuscode === 200 && response.data.message === "Login SuccessFully") {
                const { accessToken, refreshToken } = response.data;

                // Set access token expiration to 1 day
                const accessExpires = new Date();
                accessExpires.setDate(accessExpires.getDate() + 1);

                // Set refresh token expiration to 10 days
                const refreshExpires = new Date();
                refreshExpires.setDate(refreshExpires.getDate() + 10);

                // Set cookies with respective expiration times
                setCookie('accessToken', accessToken, { expires: accessExpires });
                setCookie('refreshToken', refreshToken, { expires: refreshExpires });
                toast.success(response.data.message, { id: toastId })

                navigate('/selectform')
            }
            if (response.data.statuscode === 401 && response.data.message === "Invalid User credentials") {
                toast.error(response.data.message, { id: toastId })
            }
            if (response.data.statuscode === 404 && response.data.message === "User does not exist") {
                toast.error(response.data.message, { id: toastId })
            }
            if (response.data.statuscode === 404 && response.data.message === "Email is Not Verify") {
                toast.error(response.data.message, { id: toastId })
            }
        } catch (error) {
            console.error(error);
            toast.error("Something wrong, try again later ")
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
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
                                        helperText={errors.email && touched.email ? <ErrorMessage children={errors.email} /> : null}
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
                                        helperText={errors.password && touched.password ? <ErrorMessage children={errors.password} /> : null}

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


                                    <Grid xs>
                                        <Link variant="body2" to={"/forgotpasswordlink"}>
                                            Forgot password?
                                        </Link>
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
                                            disabled={loading} // Disable button when loading
                                        >
                                            Sign In
                                        </Button>
                                    )}

                                    <Grid container>
                                        <Grid item xs>
                                            <Link variant="body2" to={"/resentemailverify"}>
                                                Resent Email verify?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to={"/signup"} variant="body2">
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
