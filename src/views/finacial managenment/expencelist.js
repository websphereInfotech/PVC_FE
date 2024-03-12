import React from 'react';
import { Container, Typography, Button, Table, TableBody, TableRow, TableCell, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ExpensePage = () => {
  const navigate = useNavigate();
  // Dummy expense data
  const expenses = [
    { id: 1, expense: 'Food', amount: 50, status: 'Pending' },
    { id: 2, expense: 'Transport', amount: 30, status: 'Paid' },
    { id: 3, expense: 'Housing', amount: 200, status: 'Pending' }
  ];

  const handleAddExpense = () => {
    // Navigate to /addexpense page
    navigate('/addexpense');
  };

  const handleViewExpense = () => {
    // Navigate to /addexpense page
    navigate('/viewexpense');
  };

  return (
    <Container>
      <Card>
        <Typography variant="h4" align="center" style={{ margin: '20px' }}>
          Expense
        </Typography>
        <Button variant="contained" color="primary" style={{ margin: '16px' }} onClick={handleAddExpense}>
          Add Expense
        </Button>
        <Table>
          <TableRow>
            <TableCell variant="head">Expense</TableCell>
            <TableCell variant="head">Amount</TableCell>
            <TableCell variant="head">Status</TableCell>
            <TableCell variant="head">Action</TableCell>
          </TableRow>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.expense}</TableCell>
                <TableCell>${expense.amount}</TableCell>
                <TableCell>{expense.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={handleViewExpense}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};

export default ExpensePage;
