import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Container, TextField, Typography, ThemeProvider, createTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { IMaskInput } from 'react-imask';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

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
    fullname: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phonenumber: Yup.string().required('Phone number is required').matches(/^\d{5} \d{5}$/, 'Phone number must be in the format: 00000 00000'),
    message: Yup.string().required('Message is required'),
});

const AdminEditData = () => {
    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(-1);
    const [singleData, setSingleData] = useState({});
    const [cookies] = useCookies(['adminaccessToken']);
    const { id } = useParams();
    const [rating, setRating] = useState(null);
    const navigate = useNavigate();



    const fetchData = async () => {

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getfeedbackdata/${id}`, {
                headers: {
                    Authorization: `Bearer ${cookies.adminaccessToken}`,
                },
            })

            setSingleData(response.data.data || {});

            setRating(response.data.data.rating)
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, []);

    async function handleSubmit(values) {


        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/editfeedbackdata`, {
                ...values,
                rating: rating,
                id: id
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.adminaccessToken}`,
                },
            });

            if (response.status === 200 && response.data.message === "Feedback updated successfully") {
               
                toast.success(response.data.message)
                 navigate('/feedbackdata');
            }
            if (response.status === 404 && response.data.message === "Feedback not found") {
               
                toast.error(response.data.message)
            }
           
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong, please try again later");
        }

    };


    return (
     

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
                        Update Feedback Form
                    </Typography>
                    <Card sx={{ padding: '20px', margin: 'auto' }}>
                        <CardContent>
                            <Formik
                                initialValues={{
                                    fullname: '',
                                    email: '',
                                    phonenumber: '',
                                    message: '',
                                    ...singleData,
                                }}
                                validationSchema={validationSchema}
                                enableReinitialize={true}
                                onSubmit={(values, { setSubmitting }) => {
                                    handleSubmit(values);
                                    console.log(values);
                                    setSubmitting(false);
                                }}
                            >
                                {({ errors, touched, isValid, isSubmitting }) => (
                                    <Form>
                                        <Field
                                            as={TextField}
                                            autoFocus
                                            placeholder='Fullname'
                                            type="text"
                                            label="Name"
                                            name="fullname"
                                            fullWidth
                                            margin="normal"
                                            error={errors.fullname && touched.fullname}
                                            helperText={errors.fullname && touched.fullname ? errors.fullname : null}
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
                                            name="phonenumber"
                                            placeholder='+91 00000 00000'
                                            fullWidth
                                            margin="normal"
                                            error={errors.phonenumber && touched.phonenumber}
                                            helperText={errors.phonenumber && touched.phonenumber ? errors.phonenumber : null}
                                            InputProps={{
                                                inputComponent: TextMaskCustom,
                                            }}
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

                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}

                                                // disabled={loading}
                                            >
                                                Submit
                                            </Button>
                                            <Button

                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={() => navigate('/feedbackdata')}
                                                // disabled={loading}
                                            >
                                                Back
                                            </Button>
                                        </CardActions>
                                    </Form>
                                )}
                            </Formik>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
      
    );
};

export default AdminEditData;
