import React from 'react';
import { Container, Typography, Button, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Card } from '@material-ui/core';

const PurchaseOrderList = () => {
  const navigate = useNavigate();
  // Dummy purchase order data
  const purchaseOrders = [
    {
      id: 1,
      billNo: 'PO-001',
      billGenerator: 'John Doe',
      vendor: 'Vendor A',
      billType: 'Regular',
      totalAmount: 1000,
      billDate: '2024-03-10',
      status: 'Pending'
    },
    {
      id: 1,
      billNo: 'PO-002',
      billGenerator: 'Jane Smith',
      vendor: 'Vendor B',
      billType: 'Urgent',
      totalAmount: 1500,
      billDate: '2024-03-16',
      status: 'Paid'
    }
  ];

  const handleaddpurchse = () => {
    navigate('/addpurchase');
  };

  return (
    <Container style={{ padding: '24px' }}>
      <Card>
        <Typography variant="h4" align="center" style={{ margin: '16px' }}>
          Purchase Order List
        </Typography>
        <Button variant="contained" color="primary" style={{ margin: '16px' }} onClick={handleaddpurchse}>
          Create New Purchase Order
        </Button>
        <Table>
          <TableRow>
            <TableCell variant="head">Bill No.</TableCell>
            <TableCell variant="head">Bill Generator</TableCell>
            <TableCell variant="head">Vendor</TableCell>
            <TableCell variant="head">Bill Type</TableCell>
            <TableCell variant="head">Total Amount</TableCell>
            <TableCell variant="head">Bill Date</TableCell>
            <TableCell variant="head">Status</TableCell>
            <TableCell variant="head">Action</TableCell>
          </TableRow>
          <TableBody>
            {purchaseOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.billNo}</TableCell>
                <TableCell>{order.billGenerator}</TableCell>
                <TableCell>{order.vendor}</TableCell>
                <TableCell>{order.billType}</TableCell>
                <TableCell>${order.totalAmount}</TableCell>
                <TableCell>{order.billDate}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary">
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

export default PurchaseOrderList;
