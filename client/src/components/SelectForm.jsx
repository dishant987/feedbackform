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
        <Container  sx={{margin:'auto'}}>
            <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
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

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

                <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                    <FormControl sx={{ minWidth: 170 }}>
                        <InputLabel id="demo-simple-select-label">Select Form</InputLabel>
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
                    <Button sx={{ mt: 2, ml: '20px' }} size='large' variant="contained" type="submit">
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SelectForm;
