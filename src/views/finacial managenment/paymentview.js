import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { paymentview } from 'store/thunk';
import { useParams } from 'react-router-dom';

const PaymentViewPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [payments, setPayments] = useState({});
  console.log(payments, '>>>>>>>>>>>>');

  useEffect(() => {
    dispatch(paymentview(id))
      .then((data) => {
        setPayments(data);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
      });
  }, [dispatch, id]);

  return (
    <Container>
      <Paper style={{ padding: '25px' }}>
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Payment Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">ID: {payments?.id}</Typography>
            <Typography variant="body1">Vendor: {payments?.voucherno}</Typography>
            <Typography variant="body1">Date: {payments?.paymentdate}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Bill No.: {payments?.billno}</Typography>
            <Typography variant="body1">Mode: {payments?.mode}</Typography>
            <Typography variant="body1">Reference No: {payments?.refno}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Amount: ₹{payments?.amount}</Typography>
            <Typography variant="body1">Email: {payments?.email}</Typography>
          </Grid>
        </Grid>
        {/* <Button variant="contained" color="secondary" style={{ marginTop: '16px' }}>
          Edit Payment
        </Button> */}
      </Paper>
    </Container>
  );
};

export default PaymentViewPage;
