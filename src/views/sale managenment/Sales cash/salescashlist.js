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
import { SalesInvoiceCashview, deleteSalesinvoicecash, getallSalesInvoiceCash } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
  { id: 'saleNo', label: 'Sale No', align: 'center' },
  { id: 'date', label: 'Date.', align: 'center' },
  { id: 'party', label: 'Party', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
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
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching sales cash:', error);
      }
    };

    fetchsalesinvoicecash();
  }, [dispatch, navigate]);

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
      setsalescash((prevcash) => prevcash.filter((invoice) => invoice.id !== selectedId));
    } catch (error) {
      console.error('Error deleting sales cash:', error);
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
      <TableContainer sx={{ maxHeight: 575 }}>
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
            {salescash?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewSalescash() ? 'Blue' : 'gray',
                            color: canViewSalescash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewSalescash() && { opacity: 1 }),
                            ...(!canViewSalescash() && { opacity: 0.5 }),
                            ...(!canViewSalescash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewsalescash(row.id)}
                          disabled={!canViewSalescash()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateSalescash() ? 'green' : 'gray',
                            color: canUpdateSalescash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateSalescash() && { opacity: 1 }),
                            ...(!canUpdateSalescash() && { opacity: 0.5 }),
                            ...(!canUpdateSalescash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateSalescash(row.id)}
                          disabled={!canUpdateSalescash()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteSalescash() ? 'Red' : 'gray',
                            color: canDeleteSalescash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteSalescash() && { opacity: 1 }),
                            ...(!canDeleteSalescash() && { opacity: 0.5 }),
                            ...(!canDeleteSalescash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteSalescash()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'date' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.accountSaleCash.contactPersonName
                    ) : column.id === 'updatedBy' ? (
                      row.salesInvoiceUpdate?.username
                    ) : column.id === 'createdBy' ? (
                      row.salesInvoiceCreate?.username
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
        <DialogTitle>Confirmation</DialogTitle>
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
