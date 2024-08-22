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
  useMediaQuery
} from '@mui/material';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import {
  deletePaymentRecievebank,
  fetchAllCustomers,
  getAllPaymentRecievebank,
  getAllPaymentRecievebankLedger,
  viewSinglePaymentRecieveBank
} from 'store/thunk';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import Paymentbankrecieveledgerlist from './paymentbankrecieveledgerlist';
import { Delete, Edit } from '@mui/icons-material';
import { useTheme } from '@emotion/react';

const columns = [
  { id: 'voucherno', label: 'Voucher No.', align: 'center' },
  { id: 'paymentdate', label: 'Date', align: 'center' },
  { id: 'party', label: 'Party', align: 'center' },
  { id: 'amount', label: 'Amount', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];
const Paymentrecievebanklist = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canCreatePaymentRecieveBank, canUpdatePaymentRecieveBank, canDeletePaymentRecieveBank, canViewAllCustomerLedger } = useCan();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [customerId, setcustomerId] = useState(null);
  const [customer, setcustomer] = useState([]);
  const [customername, setcustomername] = useState('');
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const showLedgerlist = false;

  useEffect(() => {
    dispatch(getAllPaymentRecievebank())
      .then((data) => {
        setPayments(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching payment recieve bank data:', error);
      });
  }, [dispatch, navigate]);

  const handleMakePayment = () => {
    navigate('/paymentrecievebank');
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
    dispatch(getAllPaymentRecievebankLedger(customerId, formDate, toDate));
    navigate('/paymentrecievebankledgerlist');
    setcustomerId(customerId);
    sessionStorage.setItem('PRcustomerId', customerId);
    setFormDate(formDate);
    sessionStorage.setItem('PRformDate', formDate);
    setToDate(toDate);
    sessionStorage.setItem('PRtoDate', toDate);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleUpdatePayment = (id) => {
    dispatch(viewSinglePaymentRecieveBank(id));
    navigate(`/paymentrecievebank/${id}`);
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

  const handledelete = async () => {
    try {
      await dispatch(deletePaymentRecievebank(selectedId));
      setOpenConfirmation(false);
      setPayments((prevPayment) => prevPayment.filter((payment) => payment.id !== selectedId));
    } catch (error) {
      console.error('Error deleting pyament recieve bank:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllCustomers());
        if (Array.isArray(response)) {
          const options = response.map((customer) => ({ value: customer.id, label: customer.accountname }));
          setcustomer([...options]);
        }
      } catch (error) {
        console.error('Error fetching payment bank:', error);
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

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      {showLedgerlist && <Paymentbankrecieveledgerlist customerId={customerId} fromDate={formDate} toDate={toDate} />}
      <Typography variant="h4" align="center" id="mycss">
        Receipt List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '16px' }}
          onClick={handleMakePayment}
          disabled={!canCreatePaymentRecieveBank()}
        >
          Receipt
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '16px' }}
          onClick={handleLedgerClick}
          disabled={!canViewAllCustomerLedger()}
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
                            backgroundColor: canUpdatePaymentRecieveBank() ? 'green' : 'gray',
                            color: canUpdatePaymentRecieveBank() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdatePaymentRecieveBank() && { opacity: 1 }),
                            ...(!canUpdatePaymentRecieveBank() && { opacity: 0.5 }),
                            ...(!canUpdatePaymentRecieveBank() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdatePayment(payment.id)}
                          disabled={!canUpdatePaymentRecieveBank()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeletePaymentRecieveBank() ? 'Red' : 'gray',
                            color: canDeletePaymentRecieveBank() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeletePaymentRecieveBank() && { opacity: 1 }),
                            ...(!canDeletePaymentRecieveBank() && { opacity: 0.5 }),
                            ...(!canDeletePaymentRecieveBank() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(payment.id)}
                          disabled={!canDeletePaymentRecieveBank()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'paymentdate' ? (
                      new Date(payment[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      payment.accountReceipt?.accountName
                    ) : column.id === 'account' ? (
                      payment.receiveBank?.accountname
                    ) : column.id === 'createdBy' ? (
                      payment.bankCreateUser?.username
                    ) : column.id === 'updatedBy' ? (
                      payment.bankUpdateUser?.username
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
          <Button onClick={handledelete} variant="contained" color="secondary">
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
        <div style={{ display: 'flex', padding: '0px 20px', justifyContent: 'space-between', alignItems: 'center' }}>
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
                Customer : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={customer}
                value={{ value: customerId, label: customername }}
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
                selected={formDate}
                onChange={(date) => handleformDateChange(date)}
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
                selected={toDate}
                onChange={(date) => handletoDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
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

export default Paymentrecievebanklist;
