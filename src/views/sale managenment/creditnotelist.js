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
import { Creditnoteviewdata, deleteCreditnote, getallCreditnote } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/checkpermissionvalue';

const columns = [
  { id: 'creditnoteNo', label: 'Credit Note No', minWidth: 170, align: 'center' },
  { id: 'creditdate', label: 'Date.', minWidth: 170, align: 'center' },
  { id: 'customer', label: 'Customer', minWidth: 170, align: 'center' },
  { id: 'view', label: 'View', minWidth: 100, align: 'center' },
  { id: 'edit', label: 'Edit', minWidth: 100, align: 'center' },
  { id: 'delete', label: 'Delete', minWidth: 100, align: 'center' }
];

const Creditnotelist = () => {
  const { canUpdateCreditnote, canViewCreditnote, canCreateCreditnote, canDeleteCreditnote } = useCan();
  const navigate = useNavigate();
  const [Creditnote, setCreditnote] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchcreditnote = async () => {
      try {
        const data = await dispatch(getallCreditnote());
        data.sort((a, b) => {
          const aNum = parseInt(a.creditnoteNo);
          const bNum = parseInt(b.creditnoteNo);
          return aNum - bNum;
        });
        setCreditnote(data);
      } catch (error) {
        console.error('Error fetching Credit note:', error);
      }
    };

    fetchcreditnote();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddCreditnote = () => {
    navigate('/creditnote');
  };

  const handleUpdateDebitnote = (id) => {
    dispatch(Creditnoteviewdata(id));
    navigate(`/creditnote/${id}`);
  };

  const handleViewDebitnote = (id) => {
    dispatch(Creditnoteviewdata(id));
    navigate(`/creditnoteview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteDebitnote = async () => {
    try {
      await dispatch(deleteCreditnote(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Credit Note List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: '10px' }}
        onClick={handleAddCreditnote}
        disabled={!canCreateCreditnote()}
      >
        Create Credit Note
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
            {Creditnote?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'view' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        disabled={!canViewCreditnote()}
                        onClick={() => handleViewDebitnote(row.id)}
                      >
                        View
                      </Button>
                    ) : column.id === 'edit' ? (
                      <Button
                        disabled={!canUpdateCreditnote()}
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleUpdateDebitnote(row.id)}
                      >
                        Edit
                      </Button>
                    ) : column.id === 'delete' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        disabled={!canDeleteCreditnote()}
                        onClick={() => handleDeleteConfirmation(row.id)}
                      >
                        Delete
                      </Button>
                    ) : column.id === 'creditdate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'customer' ? (
                      row.CreditCustomer.accountname
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
        count={Creditnote.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this Credit Note?</DialogContent>
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

export default Creditnotelist;
