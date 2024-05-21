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
  DialogContent,
  DialogTitle,
  IconButton,
  Grid
} from '@mui/material';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { fetchAllVendorsCash, getallPaymentCash, getallVendorledger } from 'store/thunk';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const columns = [
  { id: 'user', label: 'User', align: 'center', minWidth: 100 },
  { id: 'amount', label: 'Amount', align: 'center', minWidth: 100 },
  { id: 'description', label: 'Description', align: 'center', minWidth: 100 },
  { id: 'approve', label: 'Approve', align: 'center', minWidth: 100 },
  { id: 'reject', label: 'Reject', align: 'center', minWidth: 100 }
];
const Recieveclaimcashlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [vendorId, setvendorId] = useState(null);
  const [vendor, setvendor] = useState([]);
  const [vendorname, setvendorname] = useState('');
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());

  useEffect(() => {
    dispatch(getallPaymentCash())
      .then((data) => {
        setPayments(data.data);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
      });
  }, [dispatch]);

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
  const handleLedger = (vendorId, formDate, toDate) => {
    dispatch(getallVendorledger(vendorId, formDate, toDate));
    navigate('/ledgerlist');
    setSelectedId(vendorId);
    sessionStorage.setItem('vendorId', vendorId);
    setFormDate(formDate);
    sessionStorage.setItem('formDate', formDate);
    setToDate(toDate);
    sessionStorage.setItem('toDate', toDate);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllVendorsCash());
        if (Array.isArray(response)) {
          const options = response.map((vendor) => ({ value: vendor.id, label: vendor.vendorname }));
          setvendor([...options]);
        }
      } catch (error) {
        console.error('Error fetching Purchase:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      setvendorId(selectedOption.value);
      setvendorname(selectedOption.label);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Recieve Claim Cash List
      </Typography>

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
                    {column.id === 'approve' ? (
                      <Button variant="outlined" color="success">
                        Approve
                      </Button>
                    ) : column.id === 'reject' ? (
                      <Button variant="outlined" color="error">
                        Reject
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

      <Dialog open={openDrawer} onClose={handleCloseDrawer} PaperProps={{ style: { height: '450px', width: '20%' } }}>
        <DialogTitle style={{ backgroundColor: 'white', position: 'absoulate', fontSize: '16px' }}>Ledger Details</DialogTitle>
        <DialogContent style={{ position: 'reletive' }}>
          <IconButton onClick={handleCloseDrawer} style={{ position: 'fixed', left: '57%', top: '27%' }}>
            <CloseIcon />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ paddingTop: '55px' }}>
              <Typography variant="subtitle1">
                Vendor : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select color="secondary" options={vendor} value={{ value: vendorId, label: vendorname }} onChange={handleSelectChange} />
            </Grid>
            {/* <AnchorVendorDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} /> */}
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
            <Grid item xs={12}>
              <Typography variant="subtitle1">action:</Typography>
              <Button
                onClick={() => handleLedger(vendorId, formDate, toDate)}
                variant="contained"
                color="secondary"
                style={{ display: 'flex', justifyItems: 'center', padding: '8px' }}
              >
                Go
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Recieveclaimcashlist;
