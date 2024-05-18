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
  DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRecieveCash, getallRecieveCash, viewRecieveCash } from 'store/thunk';
import useCan from 'views/checkpermissionvalue';

const columns = [
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'customer', label: 'Customer', align: 'center' },
  { id: 'amount', label: 'Amount', align: 'center' },
  { id: 'description', label: 'Description', align: 'center' },
  { id: 'edit', label: 'Edit', align: 'center' },
  { id: 'delete', label: 'Delete', align: 'center' }
];

const PaymentrecieveList = () => {
  const { canCreatePaymentrecievecash, canUpdatePaymentrecievecash, canDeletePaymentrecievecash } = useCan();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  useEffect(() => {
    dispatch(getallRecieveCash())
      .then((data) => {
        setPayments(data);
      })
      .catch((error) => {
        console.error('Error fetching payment recieve data:', error);
      });
  }, [dispatch]);

  const handleMakePayment = () => {
    navigate('/paymentrecieve');
  };

  const handleUpdatePayment = (id) => {
    dispatch(viewRecieveCash(id));
    navigate(`/paymentrecieve/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
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
      await dispatch(deleteRecieveCash(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    // <Container>
    <Card style={{ width: '100%', padding: '25px' }}>
      {/* <Card style={{ width: '100%' }}> */}
      <Typography variant="h4" align="center" id="mycss">
        Recieve Payment List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: '16px' }}
        onClick={handleMakePayment}
        disabled={!canCreatePaymentrecievecash()}
      >
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
                    {column.id === 'edit' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleUpdatePayment(payment.id)}
                        disabled={!canUpdatePaymentrecievecash()}
                      >
                        Edit
                      </Button>
                    ) : column.id === 'delete' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteConfirmation(payment.id)}
                        disabled={!canDeletePaymentrecievecash()}
                      >
                        Delete
                      </Button>
                    ) : column.id === 'date' ? (
                      new Date(payment[column.id]).toLocaleDateString()
                    ) : column.id === 'customer' ? (
                      payment.ReceiveCustomer.customername
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
    </Card>
  );
};

export default PaymentrecieveList;
