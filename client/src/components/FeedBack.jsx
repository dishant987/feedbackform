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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import CustomConfetti from './CustomConfetti';
import LoadingButton from '@mui/lab/LoadingButton';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';

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
            main: '#000000',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& $notchedOutline': {
                        borderColor: '#000000',
                    },
                },
            },
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffffff',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& $notchedOutline': {
                        borderColor: '#ffffff',
                    },
                },
            },
        },
    },
});

const blueTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#a7d219',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& $notchedOutline': {
                        borderColor: '#a7d219',
                    },
                },
            },
        },
    },
});

const greenTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#4caf50',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& $notchedOutline': {
                        borderColor: '#4caf50',
                    },
                },
            },
        },
    },
});

const themes = {
    light: lightTheme,
    dark: darkTheme,
    blue: blueTheme,
    green: greenTheme,
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
    const [cookies] = useCookies(['accessToken']);
    const [themeMode, setThemeMode] = useState('light');

    const navigate = useNavigate();

    useEffect(() => {
        const token = cookies.accessToken;

        if (token) {
            const decoded = jwtDecode(token);
            setDecodedToken(decoded);
        }
    }, [cookies.accessToken]);

    const handleSubmit = async (values) => {
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
                setShowConf(true);
                setTimeout(() => {
                    setShowConf(false);
                }, 4000);
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/logout');
                }, 5000);
            }
          
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong, please try again later');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const toggleThemeMode = (mode) => {
        setThemeMode(mode);
    };

    return (
        <ThemeProvider theme={themes[themeMode]}>
            {showConf && <CustomConfetti numberOfPieces={1500} />}


            <Box
                component="div"
                sx={{
                    background: themes[themeMode].palette.mode === 'light' ? 'linear-gradient(45deg, #b9e1f9 30%, #e9f0e2 90%)' : 'linear-gradient(45deg, #333333 30%, #111111 90%)',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'row',

                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <FormControl sx={{ minWidth: 190, position: 'fixed', top: '30px', right: '100px' }}>
                    <InputLabel id="demo-simple-select-label" sx={{ fontWeight: 'bold' }}>Select Mode</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Form"
                        onChange={(event) => toggleThemeMode(event.target.value)}
                        value={themeMode}
                        sx={{ borderColor: themes[themeMode].palette.primary.main }}
                    >
                        <MenuItem value={'light'}>Light Mode</MenuItem>
                        <MenuItem  value={'dark'}>Dark Mode</MenuItem>
                        <MenuItem value={'blue'}>Yellow Mode</MenuItem>
                        <MenuItem value={'green'}>Green Mode</MenuItem>
                    </Select>
                </FormControl>
                <Container maxWidth="sm">
                    <Typography
                        variant="h3"
                        sx={{
                            textAlign: 'center',
                            marginBottom: '20px',
                            color: themeMode === 'dark' ? '#ffffff' : undefined,
                        }}
                    >
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
                            >
                                {({ errors, touched, isValid, isSubmitting }) => (
                                    <Form>
                                        <Field
                                            as={TextField}
                                            autoFocus
                                            placeholder="Fullname"
                                            type="text"
                                            label="Name"
                                            name="name"
                                            fullWidth
                                            margin="normal"
                                            error={errors.name && touched.name}
                                            helperText={errors.name && touched.name ? errors.name : null}
                                            sx={{ borderColor: themes[themeMode].palette.primary.main }}
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
                                            helperText={errors.email && touched.email ? errors.email : null}
                                            sx={{ borderColor: themes[themeMode].palette.primary.main }}
                                        />

                                        <Field
                                            as={TextField}
                                            type="tel"
                                            label="Mobile No."
                                            name="phone"
                                            placeholder="+91 00000 00000"
                                            fullWidth
                                            margin="normal"
                                            error={errors.phone && touched.phone}
                                            helperText={errors.phone && touched.phone ? errors.phone : null}
                                            InputProps={{
                                                inputComponent: TextMaskCustom,
                                            }}
                                            sx={{ borderColor: themes[themeMode].palette.primary.main }}
                                        />

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
                                            helperText={errors.message && touched.message ? errors.message : null}
                                            sx={{ borderColor: themes[themeMode].palette.primary.main }}
                                        />

                                        <Box textAlign={'center'}>
                                            <Typography>Share your experience</Typography>
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
                                                    sx={{ mt: 4, mb: 2 }}
                                                    loading
                                                    variant="contained"
                                                >
                                                    Submit
                                                </LoadingButton>
                                            ) : (
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ mt: 6, mb: 2 }}
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
