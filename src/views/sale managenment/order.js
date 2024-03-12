import React from 'react';
import { Container, Typography, Button, Paper, Grid } from '@mui/material';

const OrderProcessingPage = () => {
  // Sample order data
  const orders = [
    { id: 1, customer: 'John Doe', items: ['Product A', 'Product B'], total: 150, status: 'Pending' },
    { id: 2, customer: 'Jane Smith', items: ['Product C', 'Product D'], total: 200, status: 'Processing' },
    { id: 3, customer: 'Alice Johnson', items: ['Product E'], total: 100, status: 'Shipped' }
    // Add more orders as needed
  ];

  const handleProcessOrder = (orderId) => {
    // Handle processing order logic here
    console.log(`Order ${orderId} processed`);
  };

  const handleCancelOrder = (orderId) => {
    // Handle canceling order logic here
    console.log(`Order ${orderId} canceled`);
  };

  return (
    <Container style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Order Processing
      </Typography>
      {orders.map((order) => (
        <Paper elevation={3} key={order.id} style={{ padding: '16px', marginBottom: '16px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Customer: {order.customer}</Typography>
              <Typography variant="subtitle1">Total: ${order.total}</Typography>
              <Typography variant="subtitle1">Status: {order.status}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Items:</Typography>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="contained" color="primary" onClick={() => handleProcessOrder(order.id)}>
                Process
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleCancelOrder(order.id)} style={{ marginLeft: '8px' }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
};

export default OrderProcessingPage;
