import React, { useState, useEffect } from 'react';
import {
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
import { SalesInvoiceview, deleteSalesinvoice, getallSalesInvoice } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
  { id: 'invoiceno', label: 'Invocie No', align: 'center' },
  { id: 'party', label: 'Party', align: 'center' },
  { id: 'invoicedate', label: 'Date.', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Salesinvoicelist = () => {
  const { canUpdateSalesinvoice, canViewalesinvoice, canDeleteSalesinvoice, canCreateSalesinvoice } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [salesinvoice, setsalesinvoice] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchSalesinvoice = async () => {
      try {
        const data = await dispatch(getallSalesInvoice());
        data.data.sort((a, b) => {
          const aNum = parseInt(a.invoiceno);
          const bNum = parseInt(b.invoiceno);
          return aNum - bNum;
        });
        setsalesinvoice(data.data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching sales invoice:', error);
      }
    };

    fetchSalesinvoice();
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddSalesinvoice = () => {
    navigate('/salesinvoice');
  };

  const handleUpdateSalesInvoice = (id) => {
    dispatch(SalesInvoiceview(id));
    navigate(`/salesinvoice/${id}`);
  };

  const handleViewsalesinvoice = (id) => {
    dispatch(SalesInvoiceview(id));
    navigate(`/salesinvoiceview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteSalesInvoice = async () => {
    try {
      await dispatch(deleteSalesinvoice(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(getallSalesInvoice());
      setsalesinvoice(data);
    } catch (error) {
      console.error('Error deleting sales invoice:', error);
    }
  };

  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Sales Invoice List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: '10px' }}
        onClick={handleAddSalesinvoice}
        disabled={!canCreateSalesinvoice()}
      >
        Create Sales Invoice
      </Button>
      <TableContainer sx={{ maxHeight: 700 }}>
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
            {salesinvoice?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewalesinvoice() ? 'Blue' : 'gray',
                            color: canViewalesinvoice() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewalesinvoice() && { opacity: 1 }),
                            ...(!canViewalesinvoice() && { opacity: 0.5 }),
                            ...(!canViewalesinvoice() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewsalesinvoice(row.id)}
                          disabled={!canViewalesinvoice()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateSalesinvoice() ? 'green' : 'gray',
                            color: canUpdateSalesinvoice() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateSalesinvoice() && { opacity: 1 }),
                            ...(!canUpdateSalesinvoice() && { opacity: 0.5 }),
                            ...(!canUpdateSalesinvoice() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateSalesInvoice(row.id)}
                          disabled={!canUpdateSalesinvoice()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteSalesinvoice() ? 'Red' : 'gray',
                            color: canDeleteSalesinvoice() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteSalesinvoice() && { opacity: 1 }),
                            ...(!canDeleteSalesinvoice() && { opacity: 0.5 }),
                            ...(!canDeleteSalesinvoice() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteSalesinvoice()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'invoicedate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.accountSaleInv.accountName
                    ) : column.id === 'updatedBy' ? (
                      row.updateUser?.username
                    ) : column.id === 'createdBy' ? (
                      row.createUser?.username
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
        count={salesinvoice?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this Sale Invoice?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDeleteSalesInvoice} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    // </Container>
  );
};

export default Salesinvoicelist;
