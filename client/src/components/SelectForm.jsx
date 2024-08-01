import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AppNavBar from './AppBar';

const SelectForm = () => {
  const [form, setForm] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(form);
  };

  return (
    <Container sx={{ paddingTop : 16, maxWidth: 'md' }}>
      <AppNavBar />
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            mb: 2,
            fontSize: {
              xs: '2rem', // Small screens
              sm: '2.5rem', // Medium screens
              md: '3rem', // Large screens
              lg: '3.5rem', // Extra large screens
            },
          }}
        >
          Select&nbsp;
          <Typography
            component="span"
            variant="h3"
            sx={{
              color: (theme) =>
                theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
            }}
          >
            Form
          </Typography>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mx: 'auto',
            maxWidth: '500px',
            gap: 2,
          }}
        >
          <form onSubmit={handleSubmit} style={{ width: '60%' }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="form-select-label" sx={{ fontWeight: 'bold' }}>
                Select Form
              </InputLabel>
              <Select
                labelId="form-select-label"
                id="form-select"
                value={form}
                label="Select Form"
                onChange={handleChange}
                sx={{ borderRadius: 1 }}
              >
                <MenuItem value={'/feedback'}>Form 1</MenuItem>
                <MenuItem value={'/feedback2'}>Form 2</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ width: '100%', height: '54px', borderRadius: 1 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default SelectForm;
