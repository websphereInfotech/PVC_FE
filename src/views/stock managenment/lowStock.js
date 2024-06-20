import React, { useEffect, useState } from 'react';
import {
  Typography,
  //   Button,
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
  Button,
  IconButton,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { SalesInvoiceview, deleteSalesinvoice, getallSalesInvoice } from 'store/thunk';
// import { useDispatch } from 'react-redux';
// import useCan from 'views/permission managenment/checkpermissionvalue';
import { Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { getAllStoke, updateStoke } from 'store/thunk';
import { useDispatch } from 'react-redux';

const columns = [
  { id: 'product', label: 'Product Name', minWidth: 100, align: 'center' },
  { id: 'hsncode', label: 'HSN Code', minWidth: 100, align: 'center' },
  { id: 'stock', label: 'Stock', minWidth: 70, align: 'center' },
  { id: 'lowstock', label: 'Low Stock', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const LowStock = () => {
  const [stoke, setStoke] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const handleSave = async () => {
    try {
      const paylod = {
        productId: selectedRow.id,
        qty: selectedRow.qty
      };
      await dispatch(updateStoke(selectedRow.id, paylod, navigate));
      const updatedData = await dispatch(getAllStoke());
      setStoke(updatedData);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating stoke', error);
    }
  };

  useEffect(() => {
    const fetchStoke = async () => {
      try {
        const data = await dispatch(getAllStoke());
        setStoke(data);
      } catch (error) {
        console.error('Error fetching stoke', error);
      }
    };
    fetchStoke();
  }, [dispatch]);

  return (
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Stock List
      </Typography>
      <TableContainer sx={{ maxHeight: 700 }}>
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
            {stoke?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton sizeSmall style={{ backgroundColor: 'blue', color: 'white', borderRadius: 0.8 }}>
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{ backgroundColor: 'green', color: 'white', borderRadius: 0.8 }}
                          onClick={() => handleOpenDialog(row, row.id)}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'invoicedate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'product' ? (
                      row.productStock.productname
                    ) : column.id === 'hsncode' ? (
                      row.productStock.HSNcode
                    ) : column.id === 'lowstock' ? (
                      row.productStock.lowStockQty
                    ) : column.id === 'stock' ? (
                      row.qty
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
        count={stoke?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Stock</DialogTitle>
        <DialogContent>
          <Grid item container spacing={2}>
            <Grid item sm={6}>
              <Typography variant="subtitle1">
                Product Name: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                value={selectedRow?.productStock.productname || ''}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, productStock: { ...selectedRow.productStock.id, productname: e.target.value } })
                }
              />
            </Grid>
            <Grid item sm={6}>
              <Typography variant="subtitle1">
                Product QTY: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input value={selectedRow?.qty || ''} onChange={(e) => setSelectedRow({ ...selectedRow, qty: e.target.value })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" id="savebtncs" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} color="secondary" id="savebtncs" variant="outlined">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default LowStock;
