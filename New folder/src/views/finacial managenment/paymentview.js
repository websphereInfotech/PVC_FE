import React from 'react';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';

const PaymentViewPage = () => {
  return (
    <Container>
      <Paper style={{ padding: '25px' }}>
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Payment Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">ID: 1</Typography>
            <Typography variant="body1">Vendor: VendorB</Typography>
            <Typography variant="body1">Date: 2024-03-07</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Invoice No.: INV002</Typography>
            <Typography variant="body1">Mode: Cash</Typography>
            <Typography variant="body1">Reference: REF002</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Amount: $150</Typography>
            <Typography variant="body1">Status: Paid</Typography>
          </Grid>
        </Grid>
        <Button variant="contained" color="secondary" style={{ marginTop: '16px' }}>
          Edit Payment
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentViewPage;
