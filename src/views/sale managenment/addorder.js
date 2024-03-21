import React from 'react';
import { Container, Typography, TextField, Button, Grid, Card } from '@mui/material';

const AddOrderForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Container>
      <Card style={{ padding: '25px' }}>
        <Typography variant="h4" align="center" id="mycss" gutterBottom>
          Add Order
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Customer Name</Typography>
              <TextField fullWidth label="Enter customer name" variant="outlined" color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Email</Typography>
              <TextField fullWidth label="Enter email" variant="outlined" color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Phone Number</Typography>
              <TextField fullWidth label="Enter phone number" variant="outlined" color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Address</Typography>
              <TextField fullWidth label="Enter address" variant="outlined" color="secondary" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">items</Typography>
              <TextField fullWidth label="Enter item" variant="outlined" color="secondary" />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="secondary">
                Add Order
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
};

export default AddOrderForm;
