import React from 'react';
import { Container, Typography, TextField, Button, Grid, MenuItem, Card } from '@mui/material';

const AddCompanyForm = () => {
  const [country, setCountry] = React.useState('');
  const [state, setState] = React.useState('');
  const [currency, setCurrency] = React.useState('');

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Card style={{ padding: '20px' }}>
        <Typography
          variant="h4"
          align="center"
          style={{
            margin: '10px',
            padding: '10px',
            backgroundColor: '#425466',
            borderRadius: '10px',
            color: 'white'
          }}
        >
          Add Company
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Company Name
              </Typography>
              <TextField label="Company Name" fullWidth required color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Email Id
              </Typography>
              <TextField label="Email Id" fullWidth required color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Contact No.
              </Typography>
              <TextField label="Contact No." fullWidth required color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Mobile No.
              </Typography>
              <TextField label="Mobile No." fullWidth required color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Contact Person Name
              </Typography>
              <TextField label="Contact Person Name" fullWidth required color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                GST No.
              </Typography>
              <TextField label="GST No." fullWidth color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Address
              </Typography>
              <TextField label="Address" fullWidth required color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Country
              </Typography>
              <TextField label="Country" fullWidth select color="secondary" value={country} onChange={handleCountryChange}>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                State
              </Typography>
              <TextField label="State" fullWidth select color="secondary" value={state} onChange={handleStateChange}>
                <MenuItem value="New York">New York</MenuItem>
                <MenuItem value="California">California</MenuItem>
                {/* Add more states as needed */}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Pincode
              </Typography>
              <TextField label="Pincode" fullWidth required color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Cin
              </Typography>
              <TextField label="Cin" fullWidth color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Website
              </Typography>
              <TextField label="Website" fullWidth color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Currency
              </Typography>
              <TextField label="Currency" fullWidth select color="secondary" value={currency} onChange={handleCurrencyChange}>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="CAD">CAD</MenuItem>
                {/* Add more currencies as needed */}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                PAN No
              </Typography>
              <TextField label="PAN No" fullWidth required color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Company Suffix
              </Typography>
              <TextField label="Company Suffix" fullWidth required color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Wallet Balance
              </Typography>
              <TextField label="Wallet Balance" fullWidth required color="secondary" />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', borderRadius: '10px' }}>
              <Button type="submit" variant="contained" color="secondary">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
};

export default AddCompanyForm;
