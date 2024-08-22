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
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { deletePaymentbank, getAllPaymentbank, viewSinglePaymentBank, getAllPaymentbankLedger, fetchAllCustomers } from 'store/thunk';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import Paymentbankledgerlist from './paymentbankledgerlist';
import { Delete, Edit } from '@mui/icons-material';

const columns = [
  { id: 'voucherno', label: 'Voucher No.', align: 'center' },
  { id: 'paymentdate', label: 'Date', align: 'center' },
  { id: 'party', label: 'Party', align: 'center' },
  { id: 'amount', label: 'Amount', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Paymentbanklist = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canCreatePaymentBank, canUpdatePaymentBank, canDeletePaymentBank, canViewAllVendorLedger } = useCan();
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
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching payment bank data:', error);
      });
  }, [dispatch, navigate]);

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
      setPayments((prevPayment) => prevPayment.filter((payments) => payments.id !== selectedId));
    } catch (error) {
      console.error('Error deleting payment bank:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllCustomers());
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
        Payment List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '16px' }}
          onClick={handleMakePayment}
          disabled={!canCreatePaymentBank()}
        >
          Payment
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '16px' }}
          onClick={handleLedgerClick}
          disabled={!canViewAllVendorLedger()}
        >
          Ledger
        </Button>
      </div>
      <TableContainer>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment, index) => (
              <TableRow key={payment.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdatePaymentBank() ? 'green' : 'gray',
                            color: canUpdatePaymentBank() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdatePaymentBank() && { opacity: 1 }),
                            ...(!canUpdatePaymentBank() && { opacity: 0.5 }),
                            ...(!canUpdatePaymentBank() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdatePayment(payment.id)}
                          disabled={!canUpdatePaymentBank()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeletePaymentBank() ? 'Red' : 'gray',
                            color: canDeletePaymentBank() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeletePaymentBank() && { opacity: 1 }),
                            ...(!canDeletePaymentBank() && { opacity: 0.5 }),
                            ...(!canDeletePaymentBank() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(payment.id)}
                          disabled={!canDeletePaymentBank()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'paymentdate' ? (
                      new Date(payment[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      payment.accountPayment.accountName
                    ) : column.id === 'account' ? (
                      payment.paymentBankAccount.accountname
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
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
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
      <Dialog
        open={openDrawer}
        onClose={handleCloseDrawer}
        PaperProps={{
          style: {
            height: 'auto',
            width: isMobile ? '90%' : '18%',
            margin: isMobile ? '0' : 'auto',
            maxWidth: isMobile ? '80%' : 'none'
          }
        }}
      >
        <div style={{ display: 'flex', padding: '0px 24px', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Ledger Details</h3>
          <span>
            <IconButton onClick={handleCloseDrawer} style={{}}>
              <CloseIcon />
            </IconButton>
          </span>
        </div>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ paddingTop: '20px' }}>
              <Typography variant="subtitle1">
                Vendor : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={vendor}
                value={{ value: vendorId, label: vendorName }}
                onChange={handleSelectChange}
                menuPortalTarget={document.body}
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                    maxHeight: '300px',
                    overflowY: 'scroll'
                  }),
                  container: (provided) => ({
                    ...provided,
                    zIndex: 9999
                  }),
                  menuPortal: (provided) => ({
                    ...provided,
                    zIndex: 9999
                  })
                }}
              />
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
