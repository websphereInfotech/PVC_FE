import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableRow, TableCell, Card } from '@mui/material';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getallPayment, paymentview } from 'store/thunk';

const PaymentListPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(1);
  const dispatch = useDispatch();
  console.log('Payments:', payments);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getallPayment())
      .then((data) => {
        setPayments(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleMakePayment = () => {
    navigate('/payment');
    console.log('Payment made');
  };

  const handleViewPayment = (id) => {
    dispatch(paymentview(id));
    navigate(`/paymentview/${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Card style={{ padding: '25px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Payment List
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleMakePayment}
          style={{ margin: '10px', color: 'white', display: 'flex', justifyContent: 'end' }}
        >
          Make Payment
        </Button>
        <Table>
          {/* <TableHead> */}
          <TableRow style={{ color: 'black', fontWeight: '0' }}>
            <TableCell variant="head">ID</TableCell>
            <TableCell variant="head">Vendor</TableCell>
            <TableCell variant="head">Date</TableCell>
            <TableCell variant="head">Invoice No.</TableCell>
            <TableCell variant="head">Mode</TableCell>
            <TableCell variant="head">Reference</TableCell>
            <TableCell variant="head">Amount</TableCell>
            {/* <TableCell variant="head">Email</TableCell> */}
            <TableCell variant="head">Action</TableCell>
          </TableRow>
          {/* </TableHead> */}
          <TableBody>
            {payments?.data?.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment?.id}</TableCell>
                <TableCell>{payment?.voucherno}</TableCell>
                <TableCell>{new Date(payment?.paymentdate).toLocaleDateString()}</TableCell>
                <TableCell>{payment?.billno}</TableCell>
                <TableCell>{payment?.mode}</TableCell>
                <TableCell>{payment?.refno}</TableCell>
                <TableCell>₹{payment?.amount}</TableCell>
                {/* <TableCell>{payment?.email}</TableCell> */}
                <TableCell>
                  {console.log(payment?.id, 'paymentId')}
                  <Button variant="outlined" color="secondary" onClick={() => handleViewPayment(payment?.id)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Pagination
        count={Math.ceil(payments.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
      />
      {isLoading && <div>Loading...</div>}
    </Container>
  );
};

export default PaymentListPage;
