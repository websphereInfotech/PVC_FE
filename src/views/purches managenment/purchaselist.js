import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Card } from '@material-ui/core';
import { getallPurchase, purchaseview } from 'store/thunk';
import { useDispatch } from 'react-redux';

const PurchaseOrderList = () => {
  const navigate = useNavigate();
  const [purchaseOrders, setpurchaseOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  console.log('Payments:', purchaseOrders);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getallPurchase())
      .then((data) => {
        setpurchaseOrders(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleaddpurchse = () => {
    navigate('/addpurchase');
  };

  const handleViewPurchase = (id) => {
    dispatch(purchaseview(id));
    navigate(`/purchaseview/${id}`);
  };
  const handleUpdatePurchase = (id) => {
    navigate(`/addpurchase/${id}`);
    console.log('id', id);
  };
  return (
    <Container>
      <Card style={{ padding: '24px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Purchase Order List
        </Typography>
        <Button variant="contained" style={{ margin: '16px', backgroundColor: '#425466' }} onClick={handleaddpurchse}>
          Create New Purchase Order
        </Button>
        <Table>
          <TableRow>
            <TableCell variant="head">Bill No.</TableCell>
            <TableCell variant="head">Mobile No.</TableCell>
            <TableCell variant="head">Vendor</TableCell>
            <TableCell variant="head">Bill Date</TableCell>
            <TableCell variant="head">PO No.</TableCell>
            <TableCell variant="head">Action</TableCell>
          </TableRow>
          <TableBody>
            {purchaseOrders?.data?.map((order) => (
              <TableRow key={order?.id}>
                <TableCell>{order?.id}</TableCell>
                <TableCell>{order?.mobileno}</TableCell>
                <TableCell>{order?.vendor}</TableCell>
                <TableCell>{new Date(order?.date).toLocaleDateString()}</TableCell>
                <TableCell>{order?.pono}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleViewPurchase(order?.id)}>
                    View
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleUpdatePurchase(order?.id)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && <div>Loading...</div>}
      </Card>
    </Container>
  );
};

export default PurchaseOrderList;
