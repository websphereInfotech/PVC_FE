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
  IconButton,
  Grid
} from '@mui/material';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { deletePaymentbank, fetchAllVendors, getAllPaymentbank, viewSinglePaymentBank, getAllPaymentbankLedger } from 'store/thunk';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import Paymentbankledgerlist from './paymentbankledgerlist';

const columns = [
  { id: 'paymentdate', label: 'Date', align: 'center' },
  { id: 'vendor', label: 'Vendor', align: 'center' },
  { id: 'amount', label: 'Amount', align: 'center' },
  { id: 'account', label: 'Company', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'edit', label: 'Edit', align: 'center' },
  { id: 'delete', label: 'Delete', align: 'center' }
];

const Paymentbanklist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canCreatePaymentBank, canUpdatePaymentBank, canDeletePaymentBank } = useCan();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [vendorId, setVendorId] = useState(null);
  const [vendor, setVendor] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const showLedgerlist = false;

  useEffect(() => {
    dispatch(getAllPaymentbank())
      .then((data) => {
        setPayments(data);
      })
      .catch((error) => {
        console.error('Error fetching payment bank data:', error);
      });
  }, [dispatch]);

  const handleMakePayment = () => {
    navigate('/paymentbank');
  };

  const handleFormDateChange = (date) => {
    const formattedDate = formatDate(date);
    setFormDate(formattedDate);
  };

  const handleToDateChange = (date) => {
    const formattedDate = formatDate(date);
    setToDate(formattedDate);
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      setVendorId(selectedOption.value);
      setVendorName(selectedOption.label);
    }
  };

  const handleLedger = (vendorId, formDate, toDate) => {
    dispatch(getAllPaymentbankLedger(vendorId, formDate, toDate));
    console.log(vendorId, 'PvendorId');
    console.log(formDate, 'PformDate');
    console.log(toDate, 'PtoDate');
    navigate('/paymentbankledgerlist');
    setVendorId(vendorId);
    sessionStorage.setItem('PbankvendorId', vendorId);
    setFormDate(formDate);
    sessionStorage.setItem('PformDate', formDate);
    setToDate(toDate);
    sessionStorage.setItem('PtoDate', toDate);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleUpdatePayment = (id) => {
    dispatch(viewSinglePaymentBank(id));
    navigate(`/paymentbank/${id}`);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleLedgerClick = () => {
    setOpenDrawer(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deletePaymentbank(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting payment bank:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllVendors());
        if (Array.isArray(response)) {
          const options = response.map((vendor) => ({ value: vendor.id, label: vendor.accountname }));
          setVendor([...options]);
        }
      } catch (error) {
        console.error('Error fetching payment bank:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      {showLedgerlist && <Paymentbankledgerlist vendorId={vendorId} fromDate={formDate} toDate={toDate} />}
      <Typography variant="h4" align="center" id="mycss">
        Payment Bank List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '16px' }}
          onClick={handleMakePayment}
          disabled={!canCreatePaymentBank()}
        >
          Payment Bank
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
                        disabled={!canUpdatePaymentBank()}
                      >
                        Edit
                      </Button>
                    ) : column.id === 'delete' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteConfirmation(payment.id)}
                        disabled={!canDeletePaymentBank()}
                      >
                        Delete
                      </Button>
                    ) : column.id === 'paymentdate' ? (
                      new Date(payment[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'vendor' ? (
                      payment.paymentData.accountname
                    ) : column.id === 'account' ? (
                      payment.paymentBank.accountname
                    ) : column.id === 'createdBy' ? (
                      payment.paymentCreateUser.username
                    ) : column.id === 'updatedBy' ? (
                      payment.paymentUpdateUser.username
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
          <Button onClick={handleDelete} variant="contained" color="secondary">
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
        <DialogContent style={{ position: 'relative' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ paddingTop: '20px' }}>
              <Typography variant="subtitle1">
                Vendor : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select color="secondary" options={vendor} value={{ value: vendorId, label: vendorName }} onChange={handleSelectChange} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                From Date: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={new Date(formDate)}
                onChange={(date) => handleFormDateChange(date)}
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
                selected={new Date(toDate)}
                onChange={(date) => handleToDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
                popperPlacement="top-center"
              />
            </Grid>
            <Button
              onClick={() => handleLedger(vendorId, formDate, toDate)}
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

export default Paymentbanklist;
