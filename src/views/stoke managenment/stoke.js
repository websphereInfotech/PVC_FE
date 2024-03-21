import React, { useState } from 'react';
import { Container, Typography, Table, TableBody, TableRow, TableCell, IconButton, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StockManagement = () => {
  // Dummy stock data
  const [stock, setStock] = useState([
    { id: 1, name: 'Product A', quantity: 10, price: 100 },
    { id: 2, name: 'Product B', quantity: 20, price: 200 },
    { id: 3, name: 'Product C', quantity: 15, price: 150 }
  ]);

  // Function to handle deleting an item
  const handleDeleteItem = (id) => {
    setStock(stock.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <Card style={{ padding: '25px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Stock Management
        </Typography>
        <Table>
          <TableRow>
            <TableCell variant="head">Id</TableCell>
            <TableCell variant="head">Name</TableCell>
            <TableCell variant="head">Quantity</TableCell>
            <TableCell variant="head">Price</TableCell>
            <TableCell variant="head">Action</TableCell>
          </TableRow>
          <TableBody>
            {stock.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  {/* Edit button */}
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  {/* Delete button */}
                  <IconButton aria-label="delete" onClick={() => handleDeleteItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};

export default StockManagement;
