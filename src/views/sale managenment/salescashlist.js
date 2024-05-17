import React, { useState, useEffect } from 'react';
import {
  // Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TableContainer,
  TableHead,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SalesInvoiceCashview, deleteSalesinvoicecash, getallSalesInvoiceCash } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/checkpermissionvalue';

const columns = [
  // { id: 'debitnoteno', label: 'Debit Note No', minWidth: 100, align: 'center' },
  { id: 'date', label: 'Date.', minWidth: 100, align: 'center' },
  { id: 'customer', label: 'Customer', minWidth: 100, align: 'center' },
  { id: 'view', label: 'View', minWidth: 100, align: 'center' },
  { id: 'edit', label: 'Edit', minWidth: 100, align: 'center' },
  { id: 'delete', label: 'Delete', minWidth: 100, align: 'center' }
];

const Salescashlist = () => {
  const { canCreateSalescash, canUpdateSalescash, canViewSalescash, canDeleteSalescash } = useCan();
  const navigate = useNavigate();
  const [salescash, setsalescash] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchsalesinvoicecash = async () => {
      try {
        const data = await dispatch(getallSalesInvoiceCash());
        setsalescash(data.data);
      } catch (error) {
        console.error('Error fetching sales invoice:', error);
      }
    };

    fetchsalesinvoicecash();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddSalescash = () => {
    navigate('/salescash');
  };

  const handleUpdateSalescash = (id) => {
    dispatch(SalesInvoiceCashview(id));
    navigate(`/salescash/${id}`);
  };

  const handleViewsalescash = (id) => {
    dispatch(SalesInvoiceCashview(id));
    navigate(`/salescashview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handledeletesalescash = async () => {
    try {
      await dispatch(deleteSalesinvoicecash(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Sales Cash List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: '10px' }}
        onClick={handleAddSalescash}
        disabled={!canCreateSalescash()}
      >
        Create Sales Cash
      </Button>
      <TableContainer sx={{ maxHeight: 500 }}>
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
            {salescash?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'view' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        disabled={!canViewSalescash()}
                        onClick={() => handleViewsalescash(row.id)}
                      >
                        View
                      </Button>
                    ) : column.id === 'edit' ? (
                      <Button
                        disabled={!canUpdateSalescash()}
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleUpdateSalescash(row.id)}
                      >
                        Edit
                      </Button>
                    ) : column.id === 'delete' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        disabled={!canDeleteSalescash()}
                        onClick={() => handleDeleteConfirmation(row.id)}
                      >
                        Delete
                      </Button>
                    ) : column.id === 'date' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'customer' ? (
                      row.CashCustomer.customername
                    ) : (
                      row[column.id]
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
        count={salescash.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this Sales cash?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handledeletesalescash} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    // </Container>
  );
};

export default Salescashlist;
