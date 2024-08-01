

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


const AdminViewFeedback = () => {

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




  return (
    <ThemeProvider theme={theme}>

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
            View Feedback Form
          </Typography>
          <Card sx={{ padding: '20px', margin: 'auto' }}>
            <CardContent>


              <TextField



                type="text"

                name="fullname"
                value={singleData.fullname}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}

              />


              <TextField

                value={singleData.email}
                type="email"

                name="email"
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField

                type="tel"
                value={singleData.phonenumber}
                fullWidth
                margin="normal"

                InputProps={{
                  inputComponent: TextMaskCustom,
                  readOnly: true,
                }}
              />


              <TextField


                value={singleData.message}

                multiline
                rows={4}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                margin="normal"

              />


              <Box textAlign={'center'}>
                <Typography>Share your experience</Typography>
                <Rating

                  name="hover-feedback"
                  value={rating}
                  precision={0.5}
                  getLabelText={getLabelText}
                  readOnly
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {rating !== null && (
                  <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                )}
              </Box>

              <CardActions sx={{ justifyContent: 'center' }}>


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


            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AdminViewFeedback;
