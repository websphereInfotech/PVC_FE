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
  MenuItem
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { IsStatusclaimCash, viewRecieveClaimCash } from 'store/thunk';
import useCan from 'views/checkpermissionvalue';

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
  { id: 'user', label: 'Sender', align: 'center', minWidth: 100 },
  { id: 'amount', label: 'Amount', align: 'center', minWidth: 100 },
  { id: 'description', label: 'Description', align: 'center', minWidth: 100 },
  { id: 'status', label: 'Status', align: 'center', minWidth: 100 }
];

const Recieveclaimcashlist = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { canIsapproveClaimcash } = useCan();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    dispatch(viewRecieveClaimCash())
      .then((data) => {
        setPayments(data);
        const initialStatuses = data.reduce((acc, payment) => {
          acc[payment.id] = payment.isApproved === null ? 'Pending' : payment.isApproved ? 'Approve' : 'Reject';
          return acc;
        }, {});
        setStatuses(initialStatuses);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
      });
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (paymentId, event) => {
    const newStatus = event.target.value;
    const isApproved = newStatus === 'Approve';
    dispatch(IsStatusclaimCash(paymentId, payments.find((p) => p.id === paymentId).toUserId, isApproved))
      .then(() => {
        setStatuses({
          ...statuses,
          [paymentId]: newStatus
        });
      })
      .catch((error) => {
        console.error('Error updating payment status:', error);
      });
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
    </Card>
  );
};

export default Recieveclaimcashlist;
