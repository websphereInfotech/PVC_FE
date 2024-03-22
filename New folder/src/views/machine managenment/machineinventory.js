import React, { useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Card } from '@mui/material';

const MachineInventoryPage = () => {
  // Sample machine data (replace with actual data fetched from backend)
  const [machines, setMachines] = useState([
    { id: 1, name: 'Machine A', modelNumber: 'ABC123', quantity: 5, location: 'Warehouse A' },
    { id: 2, name: 'Machine B', modelNumber: 'XYZ789', quantity: 3, location: 'Warehouse B' }
    // Add more machine objects as needed
  ]);
  console.log(setMachines);
  return (
    <Container>
      <Card style={{ padding: '25px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Machine Inventory
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableRow>
              <TableCell variant="head">ID</TableCell>
              <TableCell variant="head">Machine Name</TableCell>
              <TableCell variant="head">Model Number</TableCell>
              <TableCell variant="head">Quantity</TableCell>
              <TableCell variant="head">Location</TableCell>
            </TableRow>
            <TableBody>
              {machines.map((machine) => (
                <TableRow key={machine.id}>
                  <TableCell>{machine.id}</TableCell>
                  <TableCell>{machine.name}</TableCell>
                  <TableCell>{machine.modelNumber}</TableCell>
                  <TableCell>{machine.quantity}</TableCell>
                  <TableCell>{machine.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

export default MachineInventoryPage;
