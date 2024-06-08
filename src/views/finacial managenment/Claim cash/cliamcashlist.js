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
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { deleteClaimCash, viewClaimCash, viewSingleclaimCash, fetchAllClaimcashLedger } from 'store/thunk';
import { useNavigate } from 'react-router';
import useCan from 'views/permission managenment/checkpermissionvalue';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const columns = [
  { id: 'date', label: 'Date', align: 'center', minWidth: 100 },
  { id: 'fromUserId', label: 'Request', align: 'center', minWidth: 100 },
  { id: 'amount', label: 'Amount', align: 'center', minWidth: 100 },
  { id: 'description', label: 'Description', align: 'center', minWidth: 100 },
  { id: 'purpose', label: 'purpose', align: 'center', minWidth: 100 },
  { id: 'statusdate', label: 'Status Date', align: 'center', minWidth: 100 },
  { id: 'isApproved', label: 'Status', align: 'center', minWidth: 100 },
  { id: 'edit', label: 'Edit', align: 'center', minWidth: 100 },
  { id: 'delete', label: 'Delete', align: 'center', minWidth: 100 }
];
const Claimcashlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canCreateClaimcash, canUpdateClaimcash, canDeleteClaimcash, canViwAllClaimcashLedger } = useCan();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());

  useEffect(() => {
    dispatch(viewClaimCash())
      .then((data) => {
        setPayments(data);
      })
      .catch((error) => {
        console.error('Error fetching cliam cash data:', error);
      });
  }, [dispatch]);

  const handleMakePayment = () => {
    navigate('/claimcash');
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
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

  const handleLedger = (formDate, toDate) => {
    dispatch(fetchAllClaimcashLedger(formDate, toDate));
    navigate('/claimcashledger');
    setFormDate(formDate);
    sessionStorage.setItem('ClaimformDate', formDate);
    setToDate(toDate);
    sessionStorage.setItem('ClaimtoDate', toDate);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleUpdatePayment = (id) => {
    dispatch(viewSingleclaimCash(id));
    navigate(`/claimcash/${id}`);
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
      await dispatch(deleteClaimCash(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting cliam cash data:', error);
    }
  };
  const handleLedgerClick = () => {
    setOpenDrawer(true);
  };
  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Claim Cash List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '16px' }}
          onClick={handleMakePayment}
          disabled={!canCreateClaimcash()}
        >
          Claim Cash
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '16px' }}
          onClick={handleLedgerClick}
          disabled={!canViwAllClaimcashLedger()}
        >
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
                        disabled={!canUpdateClaimcash() || payment.isApproved === true || payment.isApproved === false}
                      >
                        Edit
                      </Button>
                    ) : column.id === 'delete' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteConfirmation(payment.id)}
                        disabled={!canDeleteClaimcash() || payment.isApproved === true || payment.isApproved === false}
                      >
                        Delete
                      </Button>
                    ) : column.id === 'date' ? (
                      new Date(payment.updatedAt).toLocaleDateString('en-GB')
                    ) : column.id === 'fromUserId' ? (
                      payment.toUser?.username
                    ) : column.id === 'isApproved' ? (
                      <span style={{ color: payment.isApproved === true ? '#00CE00' : payment.isApproved === false ? 'red' : 'blue' }}>
                        {payment.isApproved === true ? 'Approve' : payment.isApproved === false ? 'Reject' : 'Pending'}
                      </span>
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

            <Button onClick={() => handleLedger(formDate, toDate)} variant="contained" color="secondary" style={{ marginLeft: '60%' }}>
              GO
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Claimcashlist;
