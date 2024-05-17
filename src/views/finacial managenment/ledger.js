import React, { useState, useEffect } from 'react';
import { Typography, Button, Table, TableBody, TableRow, TableCell, Card, TablePagination, TableHead, TableContainer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getallPayment } from 'store/thunk';

const columns = [
  { id: 'paymentdate', label: 'From Date', align: 'center', minWidth: 100 },
  { id: 'paymentdate', label: 'To Date', align: 'center', minWidth: 100 },
  { id: 'voucherno', label: 'Vendor', align: 'center', minWidth: 100 },
  { id: 'go', label: 'Go', align: 'center', minWidth: 100 }
];

const Ledgerlist = () => {
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
        console.error('Error fetching payment recieve data:', error);
      });
  }, [dispatch]);

  const handleMakePayment = () => {
    navigate('/paymentrecieve');
    // console.log('Payment made');
  };

  //   const handleViewPayment = (id) => {
  //     dispatch(paymentview(id));
  //     navigate(`/paymentview/${id}`);
  //   };

  const handleUpdatePayment = (id) => {
    // console.log('id',id);
    navigate(`/payment/${id}`);
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
    <Card style={{ width: '100%', padding: '25px' }}>
      {/* <Card style={{ width: '100%' }}> */}
      <Typography variant="h4" align="center" id="mycss">
        Recieve Payment List
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleMakePayment}>
        Recieve Payment
      </Button>
      <TableContainer>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'lightgrey', color: 'white' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment) => (
              <TableRow key={payment.id}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'go' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleUpdatePayment(payment?.id)}>
                        Delete
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
      </TableContainer>
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

export default Ledgerlist;
