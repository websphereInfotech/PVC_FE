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
  Grid,
  IconButton
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRecieveCash, fetchAllCustomersCash, getallCustomerledger, getallRecieveCash, viewRecieveCash } from 'store/thunk';
import useCan from 'views/checkpermissionvalue';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Customerledgerlist from '../Claim cash/customerledgerlist';

const columns = [
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'customer', label: 'Customer', align: 'center' },
  { id: 'amount', label: 'Amount', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [customerId, setcustomerId] = useState(null);
  const [customer, setcustomer] = useState([]);
  const [customername, setcustomername] = useState('');
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const showLedgerlist = false;

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
  const handleformDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFormDate(formattedDate);
  };
  const handletoDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setToDate(formattedDate);
  };
  const handleLedger = (customerId, formDate, toDate) => {
    dispatch(getallCustomerledger(customerId, formDate, toDate));
    navigate('/customerledgerlist');
    setSelectedId(customerId);
    sessionStorage.setItem('customerId', customerId);
    setFormDate(formDate);
    sessionStorage.setItem('customerformDate', formDate);
    setToDate(toDate);
    sessionStorage.setItem('customertoDate', toDate);
  };
  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleLedgerClick = () => {
    setOpenDrawer(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllCustomersCash());
        console.log(response);
        if (Array.isArray(response)) {
          const options = response.map((customer) => ({ value: customer.id, label: customer.customername }));
          setcustomer([...options]);
        }
      } catch (error) {
        console.error('Error fetching Purchase:', error);
      }
    };

    fetchData();
  }, [dispatch]);
  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      setcustomerId(selectedOption.value);
      setcustomername(selectedOption.label);
    }
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
      {showLedgerlist && <Customerledgerlist vendorId={vendorId} fromDate={formDate} toDate={toDate} />}
      <Typography variant="h4" align="center" id="mycss">
        Recieve Payment List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '16px' }}
          onClick={handleMakePayment}
          disabled={!canCreatePaymentrecievecash()}
        >
          Recieve Payment
        </Button>
        <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleLedgerClick}>
          Ledger
        </Button>
      </div>

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
                      new Date(payment[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'customer' ? (
                      payment.ReceiveCustomer.customername
                    ) : column.id === 'updatedBy' ? (
                      payment.receiveUpdate?.username
                    ) : column.id === 'createdBy' ? (
                      payment.receiveCreate?.username
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
      <Dialog open={openDrawer} onClose={handleCloseDrawer} PaperProps={{ style: { height: 'auto', width: '20%' } }}>
        <div style={{ display: 'flex', padding: '0px 24px', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Ledger Details</h3>
          <span>
            <IconButton onClick={handleCloseDrawer} style={{}}>
              <CloseIcon />
            </IconButton>
          </span>
        </div>
        <DialogContent style={{ position: 'reletive' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ paddingTop: '20px' }}>
              <Typography variant="subtitle1">
                Customer : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={customer}
                value={{ value: customerId, label: customername }}
                onChange={handleSelectChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                From Date: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formDate}
                onChange={(date) => handleformDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
                popperPlacement="bottom-start"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                To Date: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={toDate}
                onChange={(date) => handletoDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
                popperPlacement="top-center"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <Typography variant="subtitle1">action:</Typography>
              <Button
                onClick={() => handleLedger(customerId, formDate, toDate)}
                variant="contained"
                color="secondary"
                style={{ display: 'flex', justifyItems: 'center', padding: '8px' }}
              >
                Go
              </Button>
            </Grid> */}
            <Button
              onClick={() => handleLedger(customerId, formDate, toDate)}
              variant="contained"
              color="secondary"
              style={{ marginLeft: '60%' }}
            >
              GO
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PaymentrecieveList;
