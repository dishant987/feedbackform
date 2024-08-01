import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Container, TextField, Typography, ThemeProvider, createTheme, styled } from '@mui/material';
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
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';



const theme = createTheme();


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

const customIcons = {
  1: {

    icon: <SentimentVeryDissatisfiedIcon fontSize='40px' color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon fontSize='40px' color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon fontSize='40px' color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon fontSize='40px' color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon fontSize='40px' color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}



const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
  '& .MuiRating-iconFilled .MuiSvgIcon-root': {
    fontSize: '3rem', // Adjust the size of the icons as needed
  },
}));

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  // phone: Yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  phone: Yup.string().required('Phone number is required').matches(/^\d{5} \d{5}$/, 'Phone number must be in the format: 00000 00000'),
  message: Yup.string().required('Message is required'),
});

const Feedback2 = () => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(-1);
  const [showConf, setShowConf] = useState(false)
  const [cookies] = useCookies(['accessToken']);

  const navigate = useNavigate()
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
    const { username } = decodedToken;
    console.log(username);
    setLoading(true)


    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, {
        ...values,
        rating: rating,
        username: username
      }, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });
      if (response.status === 201 && response.data.message === "Submit Successfull") {
        setShowConf(true)
        setTimeout(() => {
          setShowConf(false)
        }, 4000)
        toast.success(response.data.message)
        setTimeout(() => {
          navigate('/logout')
        }, 5000)
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false); // Stop loading
    }

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
            Feedback Form 2
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
                    variant="filled"
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
                    variant="filled"
                    placeholder='xyz123@gmail.com'
                    type="email"
                    label="Email"
                    name="email"
                    fullWidth
                    margin="normal"
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email ? errors.email : null}
                  />

                  {/* 
                                    <Field
                                        as={TextField}
                                        inputComponent={TextMaskCustom}
                                        type="tel"
                                        label="Mobile No."
                                        name="phone"
                                        placeholder='+91 00000 00000'
                                        fullWidth
                                        margin="normal"
                                        error={errors.phone && touched.phone}
                                        helperText={errors.phone && touched.phone ? errors.phone : null}
                                    /> */}
                  <Field
                    as={TextField}
                    variant="filled"
                    type="tel"
                    label="Mobile No."
                    name="phone"
                    placeholder='+91 00000 00000'
                    fullWidth
                    margin="normal"
                    error={errors.phone && touched.phone}
                    helperText={errors.phone && touched.phone ? errors.phone : null}
                    InputProps={{
                      inputComponent: TextMaskCustom,
                    }}
                  />


                  <Field
                    variant="filled"
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
                    <StyledRating
                    required
                      name="highlight-selected-only"
                      size='large'
                      defaultValue={0}
                      onChange={(e) => setRating(e.target.value)}
                      IconContainerComponent={IconContainer}
                      getLabelText={(value) => customIcons[value].label}
                      highlightSelectedOnly
                    />
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

export default Feedback2;
