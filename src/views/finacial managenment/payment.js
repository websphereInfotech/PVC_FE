import React from 'react';
import { Container, Typography, TextField, Button, Grid, Card } from '@mui/material';

const PaymentPage = () => {
  return (
    <Container>
      <Card>
        <Typography variant="h4" align="center" style={{ padding: '20px' }}>
          Payment
        </Typography>
        <Grid container spacing={2} style={{ padding: '10px' }}>
          <Grid item xs={12}>
            <TextField fullWidth label="Payment Amount" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Card Number" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Expiry Date" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="CVV" variant="outlined" />
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary">
              Pay Now
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default PaymentPage;
