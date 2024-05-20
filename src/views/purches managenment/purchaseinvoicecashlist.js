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
import { PurchaseInvoiceviewCash, deletePurchaseInvoiceCash, getallPurchaseInvoiceCash } from 'store/thunk';
import { useDispatch } from 'react-redux';
// import useCan from 'views/checkpermissionvalue';

const columns = [
  // { id: 'debitnoteno', label: 'Debit Note No', minWidth: 100, align: 'center' },
  { id: 'date', label: 'Date.', minWidth: 100, align: 'center' },
  { id: 'vendor', label: 'Vendor', minWidth: 100, align: 'center' },
  { id: 'view', label: 'View', minWidth: 100, align: 'center' },
  { id: 'edit', label: 'Edit', minWidth: 100, align: 'center' },
  { id: 'delete', label: 'Delete', minWidth: 100, align: 'center' }
];

const Purchaseinvoicecashlist = () => {
  // const { canCreatePurchasebillcash, canUpdatePurchasebillcash, canViewPurchasebillcash, canDeletePurchasebillcash } = useCan();
  const navigate = useNavigate();
  const [purchasebillcash, setPurchasebillcash] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchsalesinvoicecash = async () => {
      try {
        const data = await dispatch(getallPurchaseInvoiceCash());
        setPurchasebillcash(data.data);
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

  const handleAddPurchasebillCash = () => {
    navigate('/purchaseinvoicecash');
  };

  const handleUpdatePurchasebillCash = (id) => {
    dispatch(PurchaseInvoiceviewCash(id));
    navigate(`/purchaseinvoicecash/${id}`);
  };

  const handleViewPurchasebillCash = (id) => {
    dispatch(PurchaseInvoiceviewCash(id));
    navigate(`/purchaseinvoicecashview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handledeletesalescash = async () => {
    try {
      await dispatch(deletePurchaseInvoiceCash(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Purchase Cash List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: '10px' }}
        onClick={handleAddPurchasebillCash}
        // disabled={!canCreatePurchasebillcash()}
      >
        Create Purchase cash
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
            {purchasebillcash?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'view' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        // disabled={!canViewPurchasebillcash()}
                        onClick={() => handleViewPurchasebillCash(row.id)}
                      >
                        View
                      </Button>
                    ) : column.id === 'edit' ? (
                      <Button
                        // disabled={!canUpdatePurchasebillcash()}
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleUpdatePurchasebillCash(row.id)}
                      >
                        Edit
                      </Button>
                    ) : column.id === 'delete' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        // disabled={!canDeletePurchasebillcash()}
                        onClick={() => handleDeleteConfirmation(row.id)}
                      >
                        Delete
                      </Button>
                    ) : column.id === 'date' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'vendor' ? (
                      row.VendorPurchase.vendorname
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
        count={purchasebillcash.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this purchase invoice?</DialogContent>
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

export default Purchaseinvoicecashlist;
