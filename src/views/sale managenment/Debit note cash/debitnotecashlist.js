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
import { Debitnotecashviewdata, deleteDebitnotecash, getallDebitnotecash } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
  { id: 'debitnoteno', label: 'Debit Note No', minWidth: 100, align: 'center' },
  { id: 'debitdate', label: 'Date.', minWidth: 100, align: 'center' },
  { id: 'party', label: 'Party', minWidth: 100, align: 'center' },
  { id: 'createdBy', label: 'Created By', minWidth: 100, align: 'center' },
  { id: 'updatedBy', label: 'Updated By', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Debitnotecashlist = () => {
  const { canUpdateDebitnotecash, canViewDebitnotecash, canCreateDebitnotecash, canDeleteDebitnotecash } = useCan();
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
        const data = await dispatch(getallDebitnotecash());
        data.sort((a, b) => {
          const aNum = parseInt(a.debitnoteno);
          const bNum = parseInt(b.debitnoteno);
          return aNum - bNum;
        });
        setDebitnote(data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching debit note:', error);
      }
    };

    fetchDebitNote();
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddDebitnote = () => {
    navigate('/debitnotecash');
  };

  const handleUpdateDebitnote = (id) => {
    dispatch(Debitnotecashviewdata(id));
    navigate(`/debitnotecashupdate/${id}`);
  };

  const handleViewDebitnote = (id) => {
    dispatch(Debitnotecashviewdata(id));
    navigate(`/debitnotecashview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteDebitnote = async () => {
    try {
      await dispatch(deleteDebitnotecash(selectedId));
      setOpenConfirmation(false);
      setDebitnote((prevDebitNote) => prevDebitNote.filter((Debitnote) => Debitnote.id !== selectedId));
    } catch (error) {
      console.error('Error deleting debit note:', error);
    }
  };

  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Debit Note Cash List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: '10px' }}
        onClick={handleAddDebitnote}
        disabled={!canCreateDebitnotecash()}
      >
        Create Debit Note Cash
      </Button>
      <TableContainer sx={{ maxHeight: 500 }}>
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
            {Debitnote?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewDebitnotecash() ? 'Blue' : 'gray',
                            color: canViewDebitnotecash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewDebitnotecash() && { opacity: 1 }),
                            ...(!canViewDebitnotecash() && { opacity: 0.5 }),
                            ...(!canViewDebitnotecash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewDebitnote(row.id)}
                          disabled={!canViewDebitnotecash()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateDebitnotecash() ? 'green' : 'gray',
                            color: canUpdateDebitnotecash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateDebitnotecash() && { opacity: 1 }),
                            ...(!canUpdateDebitnotecash() && { opacity: 0.5 }),
                            ...(!canUpdateDebitnotecash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateDebitnote(row.id)}
                          disabled={!canUpdateDebitnotecash()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteDebitnotecash() ? 'Red' : 'gray',
                            color: canDeleteDebitnotecash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteDebitnotecash() && { opacity: 1 }),
                            ...(!canDeleteDebitnotecash() && { opacity: 0.5 }),
                            ...(!canDeleteDebitnotecash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteDebitnotecash()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'debitdate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.accountDebitNoCash.accountName
                    ) : column.id === 'createdBy' ? (
                      row.debitCreateUserCash?.username
                    ) : column.id === 'updatedBy' ? (
                      row.debitUpdateUserCash?.username
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

export default Debitnotecashlist;
