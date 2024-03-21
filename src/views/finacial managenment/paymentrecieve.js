import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableRow, TableCell, Card } from '@mui/material';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Paymentrecieve = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    // Dummy payment data
    const dummyPayments = [
      {
        id: 1,
        vendor: 'Vendor A',
        date: '2024-03-07',
        invoiceNo: 'INV-0021',
        mode: 'Cash',
        reference: 'REF-001',
        amount: 150,
        status: 'Pending'
      },
      {
        id: 2,
        vendor: 'Vendor B',
        date: '2024-03-07',
        invoiceNo: 'INV-002',
        mode: 'Cash',
        reference: 'REF-002',
        amount: 150,
        status: 'Paid'
      }
    ];
    setPayments(dummyPayments);
    setIsLoading(false);
  }, []);

  const handleViewPayment = () => {
    navigate(`/paymentview`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Card style={{ padding: '25px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Payment Recieve List
        </Typography>
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
            <TableCell variant="head">Status</TableCell>
            <TableCell variant="head">Action</TableCell>
          </TableRow>
          {/* </TableHead> */}
          <TableBody>
            {payments.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.vendor}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.invoiceNo}</TableCell>
                <TableCell>{payment.mode}</TableCell>
                <TableCell>{payment.reference}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleViewPayment(payment.id)}>
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

export default Paymentrecieve;
