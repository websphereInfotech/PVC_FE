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
import { Creditnotecashviewdata, deleteCreditnotecash, getallCreditnotecash } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
  { id: 'creditnoteNo', label: 'Credit Note No', minWidth: 170, align: 'center' },
  { id: 'creditdate', label: 'Date.', minWidth: 170, align: 'center' },
  { id: 'party', label: 'Party', minWidth: 170, align: 'center' },
  { id: 'createdBy', label: 'Created By', minWidth: 100, align: 'center' },
  { id: 'updatedBy', label: 'Updated By', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Creditnotecashlist = () => {
  const { canUpdateCreditnotecash, canViewCreditnotecash, canCreateCreditnotecash, canDeleteCreditnotecash } = useCan();
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
        const data = await dispatch(getallCreditnotecash());
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
    navigate('/creditnotecash');
  };

  const handleUpdateCreditnote = (id) => {
    dispatch(Creditnotecashviewdata(id));
    navigate(`/creditnotecashupdate/${id}`);
  };

  const handleViewCreditnote = (id) => {
    dispatch(Creditnotecashviewdata(id));
    navigate(`/creditnotecashview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteDebitnote = async () => {
    try {
      await dispatch(deleteCreditnotecash(selectedId));
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
        Credit Note Cash List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: '10px' }}
        onClick={handleAddCreditnote}
        disabled={!canCreateCreditnotecash()}
      >
        Create Credit Note Cash
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
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewCreditnotecash() ? 'Blue' : 'gray',
                            color: canViewCreditnotecash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewCreditnotecash() && { opacity: 1 }),
                            ...(!canViewCreditnotecash() && { opacity: 0.5 }),
                            ...(!canViewCreditnotecash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewCreditnote(row.id)}
                          disabled={!canViewCreditnotecash()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateCreditnotecash() ? 'green' : 'gray',
                            color: canUpdateCreditnotecash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateCreditnotecash() && { opacity: 1 }),
                            ...(!canUpdateCreditnotecash() && { opacity: 0.5 }),
                            ...(!canUpdateCreditnotecash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateCreditnote(row.id)}
                          disabled={!canUpdateCreditnotecash()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteCreditnotecash() ? 'Red' : 'gray',
                            color: canDeleteCreditnotecash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteCreditnotecash() && { opacity: 1 }),
                            ...(!canDeleteCreditnotecash() && { opacity: 0.5 }),
                            ...(!canDeleteCreditnotecash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteCreditnotecash()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'creditdate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.accountCreditNoCash.accountName
                    ) : column.id === 'createdBy' ? (
                      row.creditCreateUserCash?.username
                    ) : column.id === 'updatedBy' ? (
                      row.creditUpdateUserCash?.username
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
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
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

export default Creditnotecashlist;
