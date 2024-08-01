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
  Tooltip,
  IconButton,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Slider from '@mui/material/Slider';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IMaskInput } from 'react-imask';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import CustomConfetti from './CustomConfetti';


const customIcons = [
  { value: 1, icon: <SentimentVeryDissatisfiedIcon />, label: "Very Dissatisfied" },
  { value: 2, icon: <SentimentDissatisfiedIcon />, label: "Dissatisfied" },
  { value: 3, icon: <SentimentSatisfiedIcon />, label: "Neutral" },
  { value: 4, icon: <SentimentSatisfiedAltIcon />, label: "Satisfied" },
  { value: 5, icon: <SentimentVerySatisfiedIcon />, label: "Very Satisfied" },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required').matches(/^\+91 \d{5} \d{5}$/, 'Phone number must be in the format: +91 00000 00000'),
  message: Yup.string().required('Message is required'),
});

const PhoneMask = React.forwardRef(function PhoneMask(props, ref) {
  return (
    <IMaskInput
      {...props}
      ref={ref}
      mask="+91 00000 00000"
      definitions={{
        '0': /[0-9]/
      }}
      placeholder="+91 00000 00000"
    />
  );
});

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="+91 00000 00000"
      definitions={{
        '#': /^\d{5} \d{5}$/,
      }}
      placeholder="+91 00000 00000"
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const Feedback2 = () => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [showConf, setShowConf] = useState(false)
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);
  const navigate = useNavigate()

  useEffect(() => {
    const decoded = jwtDecode(cookies.accessToken);
    setDecodedToken(decoded);
  }, [cookies]);

  const handleSubmit = async (values) => {
    const { username } = decodedToken;
    setLoading(true)

    try {
      const response = await
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, {
          ...values,
          rating: rating,
          username: username
        }, {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        });

      console.log(response)
      if (response.status === 201 && response.data.message === "Submit Successfull") {

        setLoading(true)
        setShowConf(true);
        setTimeout(() => {
          setShowConf(false);
        }, 4000);
        setTimeout(() => {
          // navigate('/logout');
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false); // Stop loading
    }

  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#00796b',
      },
      background: {
        default: darkMode ? '#2c2a2a' : '#e0f2f1',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {showConf && <CustomConfetti numberOfPieces={1300} />}

      <Box
        component="div"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: theme.palette.background.default,
        }}
      >

        <IconButton
          sx={{ position: 'absolute', top: 16, right: 16 }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              marginBottom: '20px',
              background: 'linear-gradient(45deg, #c3c1c1 0%, #766767 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
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
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      as={TextField}
                      variant="filled"
                      placeholder="Fullname"
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
                      variant="filled"
                      placeholder="xyz123@gmail.com"
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
                      variant="filled"
                      label="Mobile No."
                      name="phone"
                      InputProps={{
                        inputComponent: TextMaskCustom,
                      }}

                      fullWidth
                      margin="normal"
                      error={errors.phone && touched.phone}
                      helperText={errors.phone && touched.phone ? errors.phone : null}
                    />

                    <Field
                      variant="filled"
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
                    />

                    <Box>
                      <Slider
                        aria-label="Feedback"
                        defaultValue={1}
                        getAriaValueText={(value) => `${value}`}
                        step={1}
                        marks={customIcons.map((icon) => ({ value: icon.value }))}
                        min={1}
                        max={5}
                        valueLabelDisplay="on"
                        onChange={(event, newValue) => setRating(newValue)}
                      />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {customIcons.map((icon) => (
                          <Tooltip key={icon.value} aria-label="Feedback" title={icon.label}>
                            <Box
                              aria-label="Feedback"
                              sx={{
                                transform: rating === icon.value ? 'scale(1.5)' : 'scale(1)',
                                transition: 'transform 0.2s ease',
                                '& svg': {
                                  fontSize: rating === icon.value ? 40 : 30, // Adjust icon size dynamically
                                },
                              }}
                            >
                              {icon.icon}
                            </Box>
                          </Tooltip>
                        ))}
                      </Box>
                    </Box>

                    <CardActions sx={{ justifyContent: 'center' }}>
                      <Button
                        type="submit"
                        fullWidth
                        disabled={loading}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Submit
                      </Button>
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

export default Feedback2;
