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
import { Creditnoteviewdata, deleteCreditnote, getallCreditnote } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
  { id: 'creditnoteNo', label: 'Credit Note No', minWidth: 170, align: 'center' },
  { id: 'creditdate', label: 'Date.', minWidth: 170, align: 'center' },
  { id: 'customer', label: 'Customer', minWidth: 170, align: 'center' },
  { id: 'createdBy', label: 'Created By', minWidth: 100, align: 'center' },
  { id: 'updatedBy', label: 'Updated By', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
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
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching Credit note:', error);
      }
    };

    fetchcreditnote();
  }, [dispatch, navigate]);

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

  const handleUpdateCreditnote = (id) => {
    dispatch(Creditnoteviewdata(id));
    navigate(`/creditnote/${id}`);
  };

  const handleViewCreditnote = (id) => {
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
      setCreditnote((preCreditNote) => preCreditNote.filter((creditnote) => creditnote.id !== selectedId));
    } catch (error) {
      console.error('Error deleting credit note:', error);
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
            {Creditnote?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      // <Button
                      //   variant="outlined"
                      //   color="secondary"
                      //   disabled={!canViewCreditnote()}
                      //   onClick={() => handleViewDebitnote(row.id)}
                      // >
                      //   View
                      // </Button>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewCreditnote() ? 'Blue' : 'gray',
                            color: canViewCreditnote() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewCreditnote() && { opacity: 1 }),
                            ...(!canViewCreditnote() && { opacity: 0.5 }),
                            ...(!canViewCreditnote() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewCreditnote(row.id)}
                          disabled={!canViewCreditnote()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateCreditnote() ? 'green' : 'gray',
                            color: canUpdateCreditnote() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateCreditnote() && { opacity: 1 }),
                            ...(!canUpdateCreditnote() && { opacity: 0.5 }),
                            ...(!canUpdateCreditnote() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateCreditnote(row.id)}
                          disabled={!canUpdateCreditnote()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteCreditnote() ? 'Red' : 'gray',
                            color: canDeleteCreditnote() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteCreditnote() && { opacity: 1 }),
                            ...(!canDeleteCreditnote() && { opacity: 0.5 }),
                            ...(!canDeleteCreditnote() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteCreditnote()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : // column.id === 'edit' ? (
                    //   <Button
                    //     disabled={!canUpdateCreditnote()}
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
                    //     disabled={!canDeleteCreditnote()}
                    //     onClick={() => handleDeleteConfirmation(row.id)}
                    //   >
                    //     Delete
                    //   </Button>
                    // ) :
                    column.id === 'creditdate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'customer' ? (
                      row.CreditCustomer.accountname
                    ) : column.id === 'createdBy' ? (
                      row.creditCreateUser?.username
                    ) : column.id === 'updatedBy' ? (
                      row.creditUpdateUser?.username
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
        <DialogTitle>Confirmation</DialogTitle>
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
