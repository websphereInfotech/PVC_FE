import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TablePagination,
  TableHead,
  TableContainer,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { IsStatusclaimCash, getuserbalance, viewRecieveClaimCash } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { useNavigate } from 'react-router';
// import { useNavigate } from 'react-router';

const useStyles = makeStyles(() => ({
  pending: {
    color: 'blue'
  },
  approve: {
    color: '#00CE00'
  },
  reject: {
    color: 'red'
  }
}));

const columns = [
  { id: 'date', label: 'Date', align: 'center', minWidth: 100 },
  { id: 'amount', label: 'Amount', align: 'center', minWidth: 100 },
  { id: 'description', label: 'Description', align: 'center', minWidth: 100 },
  { id: 'statusdate', label: 'Status Date', align: 'center', minWidth: 100 },
  { id: 'status', label: 'Status', align: 'center', minWidth: 100 }
];

const EmployeeStatus = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canIsapproveClaimcash } = useCan();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statuses, setStatuses] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [balance, setbalance] = useState(null);
  // const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(viewRecieveClaimCash());
        setPayments(data);
        const initialStatuses = data.reduce((acc, payment) => {
          acc[payment.id] = payment.isApproved === null ? 'Pending' : payment.isApproved ? 'Approve' : 'Reject';
          return acc;
        }, {});
        setStatuses(initialStatuses);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching receive claim cash data:', error);
      }
    };
    const balancedata = async () => {
      const balancedata = await dispatch(getuserbalance());
      setbalance(balancedata.balance);
    };
    fetchData();
    balancedata();
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (paymentId, event) => {
    const newStatus = event.target.value;
    if (newStatus === 'Approve') {
      const newStatus = event.target.value;
      if (newStatus === 'Approve') {
        const payment = payments.find((p) => p.id === paymentId);
        const isApproved = newStatus === 'Approve';
        if (balance < payment.amount) {
          setSelectedPaymentId(paymentId);
          setDialogOpen(true);
        } else {
          dispatch(IsStatusclaimCash(paymentId, payment.toUserId, isApproved))
            .then(() => {
              setStatuses({
                ...statuses,
                [paymentId]: newStatus
              });
            })
            .catch((error) => {
              console.error('Error updating recieve claim cash status:', error);
            });
        }
      }
    } else {
      const isApproved = newStatus === 'Approve';
      dispatch(IsStatusclaimCash(paymentId, payments.find((p) => p.id === paymentId).toUserId, isApproved))
        .then(() => {
          setStatuses({
            ...statuses,
            [paymentId]: newStatus
          });
        })
        .catch((error) => {
          console.error('Error updating recieve cliam cash status:', error);
        });
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPaymentId(null);
  };

  const handleDialogConfirm = () => {
    const paymentId = selectedPaymentId;
    const isApproved = true;
    dispatch(IsStatusclaimCash(paymentId, payments.find((p) => p.id === paymentId).toUserId, isApproved))
      .then(() => {
        setStatuses({
          ...statuses,
          [paymentId]: 'Approve'
        });
        handleDialogClose();
      })
      .catch((error) => {
        console.error('Error updating  recieve cliam cash status:', error);
        handleDialogClose();
      });
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Employee Status List
      </Typography>

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
                    {column.id === 'status' ? (
                      statuses[payment.id] === 'Pending' ? (
                        <Select
                          disabled={!canIsapproveClaimcash()}
                          value={statuses[payment.id]}
                          onChange={(event) => handleStatusChange(payment.id, event)}
                        >
                          <MenuItem value="Pending" className={classes.pending}>
                            Pending
                          </MenuItem>
                          <MenuItem value="Approve" className={classes.approve}>
                            Approve
                          </MenuItem>
                          <MenuItem value="Reject" className={classes.reject}>
                            Reject
                          </MenuItem>
                        </Select>
                      ) : (
                        <span className={classes[statuses[payment.id].toLowerCase()]}>{statuses[payment.id]}</span>
                      )
                    ) : column.id === 'user' ? (
                      payment.fromUser.username
                    ) : column.id === 'date' ? (
                      new Date(payment.updatedAt).toLocaleDateString('en-GB')
                    ) : column.id === 'statusdate' ? (
                      payment.date ? (
                        new Date(payment.date).toLocaleDateString('en-GB')
                      ) : (
                        '-'
                      )
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

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve this payment <br></br> because your balance is {balance}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDialogConfirm} color="secondary" variant="outlined">
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default EmployeeStatus;
