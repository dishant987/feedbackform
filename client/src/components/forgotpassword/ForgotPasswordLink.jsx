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
import * as Yup from 'yup';
import { Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingButton from '@mui/lab/LoadingButton';
import { useCookies } from 'react-cookie';

const ErrorMessage = ({ children }) => (
  <Typography variant="caption" color="error">
    <ErrorIcon style={{ marginRight: "5px", fontSize: '15px' }} />
    {children}
  </Typography>
);

const forgotPassLinkSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function ForgotPasswordLink() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    if (cookies.accessToken) {
      navigate('/feedback');
    }
  }, [cookies.accessToken, navigate]);

  const handleSubmit = async (values) => {
    let toastId = toast.loading('Loading...');
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/forgotpasswordmail`, values);
      console.log(response);

      if (response.status === 200) {
        if (response.data.message === "Email is not verify") {
          toast.error(response.data.message, { id: toastId });
        } else if (response.data.message === "Email Sent successfully for forgot password") {
          toast.success(response.data.message, { id: toastId });
          navigate('/login');
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404 && error.response.data.error === "Email not Found") {
        toast.error(error.response.data.error, { id: toastId });
      } else {
        toast.error("Something went wrong, try again later.", { id: toastId });
      }
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper sx={{ padding: '25px', marginTop: '200px' }}>
        <Link to={'/login'}>
          <Button variant='outlined' startIcon={<ArrowBack />}>
            Back
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
          <Formik
            initialValues={{ email: '' }}
            validationSchema={forgotPassLinkSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Box sx={{ mt: 2 }}>
                  <Field
                    as={TextField}
                    fullWidth
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email ? <ErrorMessage>{errors.email}</ErrorMessage> : null}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                  <LoadingButton
                    type='submit'
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
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
  );
}
