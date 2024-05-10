
import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Container, TextField, Typography, ThemeProvider, createTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import CustomConfetti from './CustomConfetti';
import LoadingButton from '@mui/lab/LoadingButton';
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast';

const theme = createTheme();

theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '3rem',
    },
    color: 'gray',
};

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    message: Yup.string().required('Message is required'),
});

const FeedBack = () => {
    const [decodedToken, setDecodedToken] = useState(null);
    const [rating, setRating] = useState(2);
    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(-1);
    const [showConf, setShowConf] = useState(false)
    const [cookies] = useCookies(['accessToken']);
  

    // const decoded = jwt_decode(token);
    // setDecodedToken(decoded);
    useEffect(() => {
        const token = cookies.accessToken;
    
        if (token) {
          const decoded = jwtDecode(token);
          setDecodedToken(decoded);
        }
      }, [cookies.accessToken]);

    const handleSubmit = async (values) => {
        const {username} = decodedToken;
        console.log(username);
        setLoading(true)
        setShowConf(true)
        setTimeout(() => {
            setShowConf(false)
        }, 4000)
        console.log(values, rating);
        try {
            const response = await axios.post('http://localhost:3000/api/feedback', {
                ...values,
                rating: rating,
                username:username
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`,
                },
            });
            if (response.status === 201 && response.data.message === "ho gaya lund submit") {
                
                toast.success(response.data.message)
            }
            console.log(response);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong, please try again later");
        } finally {
            setLoading(false); // Stop loading
        }
        console.log('Form submitted:', values);
    };

    return (
        <ThemeProvider theme={theme}>
            {showConf && (
                <CustomConfetti numberOfPieces={1500} />
            )}
            <Box
                component="div"
                sx={{
                    background: 'linear-gradient(45deg, #b9e1f9 30%, #e9f0e2 90%)',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >

                <Container maxWidth="sm">
                    <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                        Feedback Form
                    </Typography>
                    <Card sx={{ padding: '20px', margin: 'auto' }}>
                        <CardContent>
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    phone: '',
                                    message: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    handleSubmit(values);
                                    setSubmitting(false);
                                }}
                            >{({ errors, touched, isValid, isSubmitting }) => (
                                <Form>
                                    <Field
                                        as={TextField}
                                        autoFocus
                                        placeholder='Fullname'
                                        type="text"
                                        label="Name"
                                        name="name"
                                        fullWidth
                                        margin="normal"
                                        error={errors.name && touched.name}
                                        helperText={errors.name && touched.name ? errors.name : null}
                                    />


                                    <Field
                                        as={TextField}
                                        placeholder='xyz123@gmail.com'
                                        type="email"
                                        label="Email"
                                        name="email"
                                        fullWidth
                                        margin="normal"
                                        error={errors.email && touched.email}
                                        helperText={errors.email && touched.email ? errors.email : null}
                                    />


                                    <Field
                                        as={TextField}
                                        type="tel"
                                        label="Mobile No."
                                        name="phone"
                                        placeholder='+91 00000 00000'
                                        fullWidth
                                        margin="normal"
                                        error={errors.phone && touched.phone}
                                        helperText={errors.phone && touched.phone ? errors.phone : null}
                                    />


                                    <Field
                                        as={TextField}
                                        label="Message"
                                        placeholder='Add your comments...'
                                        name="message"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        margin="normal"
                                        error={errors.message && touched.message}
                                        helperText={errors.message && touched.message ? errors.message : null}
                                    />


                                    <Box textAlign={'center'}>
                                        <Typography>Share your experience</Typography>
                                        <Rating
                                            name="hover-feedback"
                                            value={rating}
                                            precision={0.5}
                                            getLabelText={getLabelText}
                                            onChange={(event, newValue) => {
                                                setRating(newValue);
                                            }}
                                            onChangeActive={(event, newHover) => {
                                                setHover(newHover);
                                            }}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        {rating !== null && (
                                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                                        )}
                                    </Box>

                                    <CardActions sx={{ justifyContent: 'center' }}>

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
                                                Submit
                                            </Button>
                                        )}
                                    </CardActions>
                                </Form>
                            )}
                            </Formik>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default FeedBack;

