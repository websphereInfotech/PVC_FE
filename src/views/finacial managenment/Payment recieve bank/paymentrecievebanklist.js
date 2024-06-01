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
  // IconButton,
  // Grid
} from '@mui/material';
// import Select from 'react-select';
// import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { deletePaymentRecievebank, getAllPaymentRecievebank, viewSinglePaymentRecieveBank } from 'store/thunk';
import { useNavigate } from 'react-router';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Ledgerlist from '../Claim cash/ledger';
import useCan from 'views/checkpermissionvalue';

const columns = [
  { id: 'paymentdate', label: 'Date', align: 'center' },
  { id: 'customer', label: 'Customer', align: 'center' },
  { id: 'amount', label: 'Amount', align: 'center' },
  { id: 'account', label: 'Company', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'edit', label: 'Edit', align: 'center' },
  { id: 'delete', label: 'Delete', align: 'center' }
];
const Paymentrecievebanklist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canCreatePaymentBank, canUpdatePaymentBank, canDeletePaymentBank } = useCan();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  // const [openDrawer, setOpenDrawer] = useState(false);
  // const [vendorId, setvendorId] = useState(null);
  // const [vendor, setvendor] = useState([]);
  // const [vendorname, setvendorname] = useState('');
  // const [toDate, setToDate] = useState(new Date());
  // const [formDate, setFormDate] = useState(new Date());
  // const showLedgerlist = false;

  useEffect(() => {
    dispatch(getAllPaymentRecievebank())
      .then((data) => {
        setPayments(data);
      })
      .catch((error) => {
        console.error('Error fetching payment recieve bank data:', error);
      });
  }, [dispatch]);

  const handleMakePayment = () => {
    navigate('/paymentrecievebank');
  };
  // const handleformDateChange = (date) => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const formattedDate = `${year}-${month}-${day}`;
  //   setFormDate(formattedDate);
  // };
  // const handletoDateChange = (date) => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const formattedDate = `${year}-${month}-${day}`;
  //   setToDate(formattedDate);
  // };
  // const handleLedger = (vendorId, formDate, toDate) => {
  //   dispatch(getallVendorledger(vendorId, formDate, toDate));
  //   navigate('/ledgerlist');
  //   setSelectedId(vendorId);
  //   sessionStorage.setItem('vendorId', vendorId);
  //   setFormDate(formDate);
  //   sessionStorage.setItem('formDate', formDate);
  //   setToDate(toDate);
  //   sessionStorage.setItem('toDate', toDate);
  // };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleUpdatePayment = (id) => {
    dispatch(viewSinglePaymentRecieveBank(id));
    navigate(`/paymentrecievebank/${id}`);
  };

  // const handleCloseDrawer = () => {
  //   setOpenDrawer(false);
  // };

  // const handleLedgerClick = () => {
  //   setOpenDrawer(true);
  // };

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
    } catch (error) {
      console.error('Error deleting pyament recieve bank:', error);
    }
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await dispatch(fetchAllVendors());
  //       if (Array.isArray(response)) {
  //         const options = response.map((vendor) => ({ value: vendor.id, label: vendor.accountname }));
  //         setvendor([...options]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching payment bank:', error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch]);

  // const handleSelectChange = (selectedOption) => {
  //   if (selectedOption && selectedOption.label) {
  //     setvendorId(selectedOption.value);
  //     setvendorname(selectedOption.label);
  //   }
  // };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      {/* {showLedgerlist && <Ledgerlist vendorId={vendorId} fromDate={formDate} toDate={toDate} />} */}
      <Typography variant="h4" align="center" id="mycss">
        Payment Recieve Bank List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '16px' }}
          onClick={handleMakePayment}
          disabled={!canCreatePaymentBank()}
        >
          Payment Recieve Bank
        </Button>
        {/* <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleLedgerClick}>
          Ledger
        </Button> */}
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
                    ) : column.id === 'customer' ? (
                      payment.customerBank?.accountname
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
      {/* <Dialog open={openDrawer} onClose={handleCloseDrawer} PaperProps={{ style: { height: 'auto', width: '20%' } }}>
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
                Vendor : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select color="secondary" options={vendor} value={{ value: vendorId, label: vendorname }} onChange={handleSelectChange} />
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
                popperPlacement="bottem-start"
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
      </Dialog> */}
    </Card>
  );
};

export default Paymentrecievebanklist;
