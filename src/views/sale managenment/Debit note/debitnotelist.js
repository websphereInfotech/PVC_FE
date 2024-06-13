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
  DialogTitle,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Debitnoteviewdata, deleteDebitnote, getallDebitnote } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
  { id: 'debitnoteno', label: 'Debit Note No', minWidth: 100, align: 'center' },
  { id: 'debitdate', label: 'Date.', minWidth: 100, align: 'center' },
  { id: 'customer', label: 'Customer', minWidth: 100, align: 'center' },
  { id: 'createdBy', label: 'Created By', minWidth: 100, align: 'center' },
  { id: 'updatedBy', label: 'Updated By', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Debitnotelist = () => {
  const { canUpdateDebitnote, canViewDebitnote, canCreateDebitnote, canDeleteDebitnote } = useCan();
  const navigate = useNavigate();
  const [Debitnote, setDebitnote] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchDebitNote = async () => {
      try {
        const data = await dispatch(getallDebitnote());
        data.sort((a, b) => {
          const aNum = parseInt(a.invoiceno);
          const bNum = parseInt(b.invoiceno);
          return aNum - bNum;
        });
        setDebitnote(data);
      } catch (error) {
        console.error('Error fetching debit note:', error);
      }
    };

    fetchDebitNote();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddDebitnote = () => {
    navigate('/debitnote');
  };

  const handleUpdateDebitnote = (id) => {
    dispatch(Debitnoteviewdata(id));
    navigate(`/debitnote/${id}`);
  };

  const handleViewDebitnote = (id) => {
    dispatch(Debitnoteviewdata(id));
    navigate(`/Debitnoteview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteDebitnote = async () => {
    try {
      await dispatch(deleteDebitnote(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting debit note:', error);
    }
  };

  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Debit Note List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: '10px' }}
        onClick={handleAddDebitnote}
        disabled={!canCreateDebitnote()}
      >
        Create Debit Note
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
            {Debitnote?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      // <Button
                      //   variant="outlined"
                      //   color="secondary"
                      //   disabled={!canViewDebitnote()}
                      //   onClick={() => handleViewDebitnote(row.id)}
                      // >
                      //   View
                      // </Button>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewDebitnote() ? 'Blue' : 'gray',
                            color: canViewDebitnote() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewDebitnote() && { opacity: 1 }),
                            ...(!canViewDebitnote() && { opacity: 0.5 }),
                            ...(!canViewDebitnote() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewDebitnote(row.id)}
                          disabled={!canViewDebitnote()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateDebitnote() ? 'green' : 'gray',
                            color: canUpdateDebitnote() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateDebitnote() && { opacity: 1 }),
                            ...(!canUpdateDebitnote() && { opacity: 0.5 }),
                            ...(!canUpdateDebitnote() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateDebitnote(row.id)}
                          disabled={!canUpdateDebitnote()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteDebitnote() ? 'Red' : 'gray',
                            color: canDeleteDebitnote() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteDebitnote() && { opacity: 1 }),
                            ...(!canDeleteDebitnote() && { opacity: 0.5 }),
                            ...(!canDeleteDebitnote() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteDebitnote()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : // column.id === 'edit' ? (
                    //   <Button
                    //     disabled={!canUpdateDebitnote()}
                    //     variant="outlined"
                    //     color="secondary"
                    //     onClick={() => handleUpdateDebitnote(row.id)}
                    //   >
                    //     Edit
                    //   </Button>
                    // ) : column.id === 'delete' ? (
                    //   <Button
                    //     variant="outlined"
                    //     color="secondary"
                    //     disabled={!canDeleteDebitnote()}
                    //     onClick={() => handleDeleteConfirmation(row.id)}
                    //   >
                    //     Delete
                    //   </Button>
                    // ) :
                    column.id === 'debitdate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'customer' ? (
                      row.DebitCustomer.accountname
                    ) : column.id === 'createdBy' ? (
                      row.debitCreateUser?.username
                    ) : column.id === 'updatedBy' ? (
                      row.debitUpdateUser?.username
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
        rowsPerPageOptions={[8, 25, 100]}
        component="div"
        count={Debitnote.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this Debit note?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDeleteDebitnote} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    // </Container>
  );
};

export default Debitnotelist;
