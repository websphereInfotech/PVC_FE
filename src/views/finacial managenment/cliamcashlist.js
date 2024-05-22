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
import { useDispatch } from 'react-redux';
import { deleteClaimCash, viewClaimCash, viewSingleclaimCash } from 'store/thunk';
import { useNavigate } from 'react-router';
import useCan from 'views/checkpermissionvalue';

const columns = [
  { id: 'touserId', label: 'User', align: 'center', minWidth: 100 },
  { id: 'amount', label: 'Amount', align: 'center', minWidth: 100 },
  { id: 'description', label: 'Description', align: 'center', minWidth: 100 },
  { id: 'edit', label: 'Edit', align: 'center', minWidth: 100 },
  { id: 'delete', label: 'Delete', align: 'center', minWidth: 100 }
];
const Claimcashlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canCreateClaimcash, canUpdateClaimcash, canDeleteClaimcash } = useCan();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  useEffect(() => {
    dispatch(viewClaimCash())
      .then((data) => {
        setPayments(data);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
      });
  }, [dispatch]);

  const handleMakePayment = () => {
    navigate('/claimcash');
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
      console.error('Error deleting user:', error);
    }
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
                        disabled={!canUpdateClaimcash()}
                      >
                        Edit
                      </Button>
                    ) : column.id === 'delete' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteConfirmation(payment.id)}
                        disabled={!canDeleteClaimcash()}
                      >
                        Delete
                      </Button>
                    ) : column.id === 'date' ? (
                      new Date(payment[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'touserId' ? (
                      payment.toUser?.username
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

export default Claimcashlist;
