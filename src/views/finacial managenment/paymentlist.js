import React, { useState, useEffect } from 'react';
import { Typography, Button, Table, TableBody, TableRow, TableCell, Card, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getallPayment, paymentview } from 'store/thunk';

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'voucherno', label: 'Vendor', minWidth: 170, align: 'center' },
  { id: 'paymentdate', label: 'Date', minWidth: 170, align: 'center' },
  { id: 'billno', label: 'Invoice No.', minWidth: 170, align: 'center' },
  { id: 'mode', label: 'Mode', minWidth: 170, align: 'center' },
  { id: 'refno', label: 'Reference', minWidth: 170, align: 'center' },
  { id: 'amount', label: 'Amount', minWidth: 170, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'center' }
];

const PaymentListPage = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallPayment())
      .then((data) => {
        setPayments(data.data);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    // <Container>
    <Card style={{ width: '100%' }}>
      <Typography variant="h4" align="center" id="mycss">
        Payment List
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleMakePayment}>
        Make Payment
      </Button>
      <Table>
        <TableRow style={{ color: 'black', fontWeight: '0' }}>
          {columns.map((column) => (
            <TableCell key={column.id} variant="head" align={column.align} style={{ minWidth: column.minWidth }}>
              {column.label}
            </TableCell>
          ))}
        </TableRow>
        <TableBody>
          {payments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment) => (
            <TableRow key={payment.id}>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.id === 'action' ? (
                    <Button variant="outlined" color="secondary" onClick={() => handleViewPayment(payment?.id)}>
                      View
                    </Button>
                  ) : column.id === 'paymentdate' ? (
                    new Date(payment[column.id]).toLocaleDateString()
                  ) : (
                    payment[column.id]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={payments?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default PaymentListPage;
