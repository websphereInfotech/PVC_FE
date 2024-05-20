import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TablePagination,
  TableHead,
  TableContainer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  // Drawer,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { getallPaymentCash, paymentCashDelete, paymentCashview } from 'store/thunk';
import { useNavigate } from 'react-router';

const columns = [
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'vendor', label: 'Vendor', align: 'center' },
  { id: 'amount', label: 'Amount', align: 'center' },
  { id: 'description', label: 'Description', align: 'center' },
  { id: 'edit', label: 'Edit', align: 'center' },
  { id: 'delete', label: 'Delete', align: 'center' },
  { id: 'ledger', label: 'Ledger', align: 'center' }
];
const columnsnew = [
  { id: 'vendor', label: 'Vendor', align: 'center' },
  { id: 'fromdate', label: 'From Date', align: 'center' },
  { id: 'todate', label: 'To Date', align: 'center' },
  { id: 'go', label: 'Go', align: 'center' }
];
const PaymentListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    dispatch(getallPaymentCash())
      .then((data) => {
        setPayments(data.data);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
      });
  }, [dispatch]);

  const handleMakePayment = () => {
    navigate('/paymentcash');
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleUpdatePayment = (id) => {
    dispatch(paymentCashview(id));
    navigate(`/paymentcash/${id}`);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedPayment(null);
  };

  const handleLedgerClick = (payment) => {
    setSelectedPayment(payment);
    setOpenDrawer(true);
    console.log(openDrawer);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handledelete = async () => {
    try {
      await dispatch(paymentCashDelete(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Payment Cash List
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleMakePayment}>
        Payment Cash
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
                    {column.id === 'edit' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleUpdatePayment(payment.id)}>
                        Edit
                      </Button>
                    ) : column.id === 'delete' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleDeleteConfirmation(payment.id)}>
                        Delete
                      </Button>
                    ) : column.id === 'ledger' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleLedgerClick(payment, openDrawer)}>
                        Ledger
                      </Button>
                    ) : column.id === 'date' ? (
                      new Date(payment[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'vendor' ? (
                      payment.PaymentVendor.vendorname
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
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this ?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handledelete} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDrawer} onClose={handleCloseDrawer} PaperProps={{ style: { width: '500px' } }}>
        <DialogTitle>Ledger Details</DialogTitle>
        <DialogContent>
          <IconButton onClick={handleCloseDrawer} style={{ position: 'absolute', right: 12, top: 5 }}>
            <CloseIcon />
          </IconButton>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columnsnew.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedPayment && (
                  <TableRow>
                    {columnsnew.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'go' ? (
                          <Button variant="outlined" color="secondary" href="/ledgerlist">
                            Go
                          </Button>
                        ) : column.id === 'vendor' ? (
                          // selectedPayment.PaymentVendor?.vendorname
                          'demo'
                        ) : column.id === 'fromdate' ? (
                          // selectedPayment.fromDate
                          'date'
                        ) : column.id === 'todate' ? (
                          // selectedPayment.toDate
                          'date'
                        ) : null}
                      </TableCell>
                    ))}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PaymentListPage;
