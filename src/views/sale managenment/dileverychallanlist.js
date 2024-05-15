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
import { Deliverychallanview, getallDeliverychallan, deleteDileveryChallan } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/checkpermissionvalue';

const columns = [
  { id: 'challanno', label: 'Challan No', minWidth: 100, align: 'center' },
  { id: 'date', label: 'Date', minWidth: 100, align: 'center' },
  { id: 'customer', label: 'Customer', minWidth: 100, align: 'center' },
  { id: 'view', label: 'View', minWidth: 100, align: 'center' },
  { id: 'edit', label: 'Edit', minWidth: 100, align: 'center' },
  { id: 'delete', label: 'Delete', minWidth: 100, align: 'center' }
];

const DileveryChallanList = () => {
  const { canViewDeliverychallan, canDeleteDeliverychallan, canCreateDeliverychallan, canUpdateDeliverychallan } = useCan();
  const navigate = useNavigate();
  const [deliverychallan, setdeliverychallan] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // all delivery challan api called
  useEffect(() => {
    const fetchDeliverychallan = async () => {
      try {
        const data = await dispatch(getallDeliverychallan());
        setdeliverychallan(data);
      } catch (error) {
        console.error('Error fetching delivery challan:', error);
      }
    };

    fetchDeliverychallan();
  }, [dispatch]);

  // set pagination to change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // how much row show in one page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //navigate page on create deliverychallan
  const handleAddDeliverychallan = () => {
    navigate('/deliverychallan');
  };

  //passed id for view single data
  const handleViewDeliverychallan = (id) => {
    dispatch(Deliverychallanview(id));
    navigate(`/deliverychallanview/${id}`);
  };

  //passed id for update data
  const handleUpdateDeliverychallan = (id) => {
    dispatch(Deliverychallanview(id));
    navigate(`/deliverychallan/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedUserId(id);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteDileveryChallan(selectedUserId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    // <Container>
    <Card style={{ padding: '25px', width: '100%' }}>
      <Typography variant="h4" align="center" id="mycss">
        Dilevery Challan List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: '16px' }}
        onClick={handleAddDeliverychallan}
        disabled={!canCreateDeliverychallan()}
      >
        Create Delivery Challan
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
            {deliverychallan?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'view' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        disabled={!canViewDeliverychallan()}
                        onClick={() => handleViewDeliverychallan(order.id)}
                      >
                        View
                      </Button>
                    ) : column.id === 'edit' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleUpdateDeliverychallan(order.id)}
                        disabled={!canUpdateDeliverychallan()}
                      >
                        Edit
                      </Button>
                    ) : column.id === 'delete' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteConfirmation(order.id)}
                        disabled={!canDeleteDeliverychallan()}
                      >
                        Delete
                      </Button>
                    ) : column.id === 'date' ? (
                      new Date(order[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'customer' ? (
                      order.DeliveryCustomer.accountname
                    ) : (
                      order[column.id]
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
        count={deliverychallan?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this Challan?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    // </Container>
  );
};

export default DileveryChallanList;
