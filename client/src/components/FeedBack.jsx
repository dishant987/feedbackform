import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    TextField,
    Typography,
    ThemeProvider,
    createTheme,
    Box,
    Rating,
    IconButton,
    Grid,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import CustomConfetti from './CustomConfetti';
import LoadingButton from '@mui/lab/LoadingButton';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="00000 00000"
            definitions={{
                '#': /^\d{5} \d{5}$/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000',
        },
        background: {
            default: '#f5f5f5',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#f5f5f5',
        },
        background: {
            default: '#333',
        },
    },
});

const themes = {
    light: lightTheme,
    dark: darkTheme,
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
    phone: Yup.string().required('Phone number is required').matches(/^\d{5} \d{5}$/, 'Phone number must be in the format: 00000 00000'),
    message: Yup.string().required('Message is required'),
});


const FeedBack = () => {
    const [decodedToken, setDecodedToken] = useState(null);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(-1);
    const [showConf, setShowConf] = useState(false);
    const [cookies] = useCookies(['accessToken', 'refreshToken']);
    const [themeMode, setThemeMode] = useState('light');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setShowConf(false)
        navigate('/logout');
    };

    const navigate = useNavigate();

    useEffect(() => {
        const decoded = jwtDecode(cookies.accessToken);
        setDecodedToken(decoded);
    }, [cookies]);

    // const handleSubmit = async (values) => {
    //     const { username } = decodedToken;
    //     setLoading(true);
    //     console.log(values)
    //     try {
    //         const response = await axios.post(
    //             `${import.meta.env.VITE_BACKEND_URL}/api/feedback`,
    //             {
    //                 ...values,
    //                 rating: rating,
    //                 username: username,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${cookies.accessToken}`,
    //                 },
    //             }
    //         );
    //         console.log(response.data)
    //         if (response.status === 201 && response.data.message === 'Submit Successfull') {
    //             setLoading(true)
    //             setShowConf(true);
    //             setTimeout(() => {
    //                 setShowConf(false);
    //             }, 4000);
    //             setTimeout(() => {
    //                 navigate('/logout');
    //             }, 5000);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error('Something went wrong, please try again later');
    //     } finally {
    //         setLoading(false); // Stop loading
    //     }
    // };

    const handleSubmit = async (values) => {

        setShowConf(true);
        handleOpen()
        const { username } = decodedToken;
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/feedback`,
                {
                    ...values,
                    rating: rating,
                    username: username,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`,
                    },
                }
            );

            if (response.status === 201 && response.data.message === 'Submit Successfull') {
                toast.success(response.data.message)
                handleOpen()
            }

        } catch (error) {
            console.error('Error during submission:', error);
            toast.error('Something went wrong, please try again later');
        } finally {
            setLoading(false); // Ensure loading is stopped
        }
    };


    const toggleThemeMode = (mode) => {
        setThemeMode(mode);
    };

    return (
        <ThemeProvider theme={themes[themeMode]}>
            {showConf && <CustomConfetti numberOfPieces={700} />}

            <Modal
                hideBackdrop={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={
                        {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            display: 'flex',
                            flexDirection:'column',
                            justifyContent: 'center',
                            alignItems:'center',
                            gap:'20px',
                            boxShadow: 24,
                            borderRadius: 1.5,
                            p: 4,
                        }
                    }
                >
                    <Typography fontSize={'large'} sx={{
                        
                        color: themeMode === 'dark' ? '#ffffff' : '#000000'
                    }}>FeedBack Completed next step </Typography>
                    <Button variant='contained' onClick={() => handleClose()} >Continue</Button>
                </Box>
            </Modal>
            <Box
                component="div"
                sx={{
                    background: themes[themeMode].palette.mode === 'light'
                        ? 'linear-gradient(45deg, #b9e1f9 30%, #e9f0e2 90%)'
                        : 'linear-gradient(45deg, #333 30%, #111 90%)',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                }}
            >
                <Box
                    sx={{
                        position: 'fixed',
                        top: 16,
                        right: 16,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <IconButton
                        sx={{ mr: 2 }}
                        onClick={() => toggleThemeMode(themeMode === 'light' ? 'dark' : 'light')}
                        color="inherit"
                    >
                        {themeMode === 'light' ? <Brightness4Icon fontSize='large' sx={{ color: 'black' }} /> : <Brightness7Icon fontSize='large' sx={{ color: 'white' }} />}
                    </IconButton>
                </Box>
                <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            marginBottom: 4,
                            color: themeMode === 'dark' ? '#ffffff' : '#000000',
                        }}
                    >
                        Feedback Form
                    </Typography>
                    <Card sx={{ padding: 3, boxShadow: 3 }}>
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
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <Field
                                            as={TextField}
                                            autoFocus
                                            placeholder="Full Name"
                                            type="text"
                                            label="Name"
                                            name="name"
                                            fullWidth
                                            margin="normal"
                                            error={errors.name && touched.name}
                                            helperText={errors.name && touched.name ? <ErrorMessage>{errors.name}</ErrorMessage> : null}
                                        />

                                        <Field
                                            as={TextField}
                                            placeholder="xyz123@gmail.com"
                                            type="email"
                                            label="Email"
                                            name="email"
                                            fullWidth
                                            margin="normal"
                                            error={errors.email && touched.email}
                                            helperText={errors.email && touched.email ? <ErrorMessage>{errors.email}</ErrorMessage> : null}
                                        />



                                        <Grid >
                                            <Field
                                                as={TextField}
                                                type="tel"
                                                label="Mobile No."
                                                name="phone"
                                                placeholder="00000 00000"
                                                fullWidth
                                                margin="normal"
                                                error={errors.phone && touched.phone}
                                                helperText={errors.phone && touched.phone ? <ErrorMessage>{errors.phone}</ErrorMessage> : null}
                                                InputProps={{
                                                    inputComponent: TextMaskCustom,
                                                }}
                                            />
                                        </Grid>


                                        <Field
                                            as={TextField}
                                            label="Message"
                                            placeholder="Add your comments..."
                                            name="message"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            margin="normal"
                                            error={errors.message && touched.message}
                                            helperText={errors.message && touched.message ? <ErrorMessage>{errors.message}</ErrorMessage> : null}
                                        />

                                        <Box textAlign={'center'} sx={{ mb: 4 }}>
                                            <Typography sx={{
                                                color: themeMode === 'dark' ? '#ffffff' : '#000000'
                                            }}>Share your experience</Typography>
                                            <Rating
                                                name="hover-feedback"
                                                sx={{ fontSize: '36px' }}
                                                value={rating}
                                                precision={0.5}
                                                getLabelText={getLabelText}
                                                onChange={(event, newValue) => {
                                                    setRating(newValue);
                                                }}
                                                onChangeActive={(event, newHover) => {
                                                    setHover(newHover);
                                                }}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="large" />}
                                            />
                                            {rating !== null ? (
                                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                                            ) : (
                                                <Box sx={{ ml: 2 }}></Box>
                                            )}
                                        </Box>

                                        <CardActions sx={{ justifyContent: 'center' }}>
                                            {loading ? (
                                                <LoadingButton
                                                    fullWidth
                                                    loading={loading}
                                                    variant="contained"
                                                >
                                                    Loading...
                                                </LoadingButton>
                                            ) : (
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    disabled={loading}
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
