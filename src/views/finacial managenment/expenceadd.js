import React from 'react';
import { Container, Typography, Button, TextField, MenuItem, Card } from '@mui/material';

const AddExpense = () => {
  const [expenseType, setExpenseType] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const handleExpenseTypeChange = (event) => {
    setExpenseType(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to backend
    console.log('Expense Type:', expenseType);
    console.log('Amount:', amount);
  };

  return (
    <Container maxWidth="sm">
      <Card style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" style={{ margin: '20px' }}>
          Add Expense
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Expense Type"
            value={expenseType}
            onChange={handleExpenseTypeChange}
            fullWidth
            required
            variant="outlined"
            sx={{ mb: 2 }}
          >
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Utilities">Utilities</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            type="number"
            label="Amount"
            value={amount}
            onChange={handleAmountChange}
            fullWidth
            required
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Expense
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default AddExpense;
