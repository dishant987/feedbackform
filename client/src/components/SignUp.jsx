import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import { ErrorOutlineOutlined, ErrorOutlineTwoTone, Visibility, VisibilityOff } from '@mui/icons-material';
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

export default function ResentEmail() {

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate()
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    if (cookies.accessToken) {
      navigate('/feedback'); // Redirect to feedback if user is already logged in
    }
  }, [cookies]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short').max(40, 'Too Long').required('Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+]).+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*()-_=+).'
      ),
  });

  const handleSubmit = async (values) => {
    const toastId = toast.loading("loading...");
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`, values);

      if (response.data.statuscode == 409 && response.data.message == "User with email or username already exists") {
        toast.error(response.data.message, { id: toastId })

      }
      if (response.data.statuscode == 200 && response.data.message == "Email sent Successfully and Verify your mail for login") {
        toast.success(response.data.message, { id: toastId })
        navigate('/login')
      }
    } catch (error) {
      console.error(error);

      toast.error("Something wrong, try again later ", { id: toastId })
    } finally {
      setLoading(false); // Stop loading
      toast.dismiss(toastId)
    }
  };

  return (

    <>
      <Container component="main" maxWidth="sm" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CssBaseline />
        <Paper elevation={6} sx={{ borderRadius: 4, paddingX: 4, paddingY: 4, width: '90%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: ''
              }}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          autoFocus
                          fullWidth
                          error={Boolean(errors.username && touched.username)}
                          helperText={errors.username && touched.username ? <ErrorMessage>{errors.username}</ErrorMessage> : null}
                          id="username"
                          label="User Name"
                          name="username"
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          error={Boolean(errors.email && touched.email)}
                          helperText={errors.email && touched.email ? <ErrorMessage>{errors.email}</ErrorMessage> : null}
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          error={Boolean(errors.password && touched.password)}
                          helperText={errors.password && touched.password ? <ErrorMessage>{errors.password}</ErrorMessage> : null}
                          name="password"
                          label="Password"
                          type={showPassword ? 'text' : 'password'}
                          id="password"
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
                      </Grid>
                    </Grid>
                    <LoadingButton
                      type="submit"
                      fullWidth
                      sx={{ mt: 3, mb: 2 }}
                      loading={loading}
                      variant="contained"
                    >
                      Submit
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link to={"/login"} variant="body2">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Container>
    </>

  );
}
