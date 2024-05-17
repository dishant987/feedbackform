import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

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
    <Container sx={{ textAlign: 'center' }}>
      <Typography
        variant="h1"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',

          fontSize: 'clamp(3.5rem, 10vw, 4rem)',
        }}
      >
        Select&nbsp;
        <Typography
          component="span"
          variant="h1"
          sx={{
            fontSize: 'clamp(3rem, 10vw, 4rem)',
            color: (theme) =>
              theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
          }}
        >
          Form
        </Typography>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'15px' }}>

        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel id="demo-simple-select-label" sx={{fontWeight:'bold'}}>Select Form</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form}
              label="Select Form"
              onChange={handleChange}
             
            >
              <MenuItem value={'/feedback'}>Form 1</MenuItem>
              <MenuItem value={'/feedback2'}>Form 2</MenuItem>
            </Select>
          </FormControl>
          <Button sx={{  ml: '20px',height:'54px' }} size='large' variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SelectForm;
