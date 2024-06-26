import React, { useEffect, useState } from 'react';
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
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { getAllStokecash, updateStokeCash, viewSingleStokeCash } from 'store/thunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import useCan from 'views/permission managenment/checkpermissionvalue';

const columns = [
  { id: 'product', label: 'Product Name', minWidth: 100, align: 'center' },
  { id: 'stock', label: 'Stock', minWidth: 70, align: 'center' },
  //   { id: 'lowstock', label: 'Low Stock', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const ProductCash = () => {
  const { canUpdateStokeCash, canViewStokeCash } = useCan();
  const [stoke, setStoke] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewStock, setViewStock] = useState([]);

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

  const handleViewLowStock = async (id) => {
    const data = await dispatch(viewSingleStokeCash(id));

    setViewStock(data);
    setOpenViewDialog(true);
  };
  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedRow(null);
  };

  const handleSave = async () => {
    try {
      const paylod = {
        productId: selectedRow.productId,
        qty: selectedRow.qty
      };
      console.log('payload', paylod);
      await dispatch(updateStokeCash(selectedRow.id, paylod, navigate));
      const updatedData = await dispatch(getAllStokecash());
      setStoke(updatedData);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating stoke', error);
    }
  };
  useEffect(() => {
    const datastoke = async () => {
      try {
        const data = await dispatch(getAllStokecash());
        setStoke(data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('fetching data of stoke', error);
      }
    };
    datastoke();
  }, [dispatch, navigate]);

  return (
    <Card style={{ width: 'auto', padding: '20px' }}>
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
            {stoke?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewStokeCash() ? 'Blue' : 'gray',
                            color: canViewStokeCash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewStokeCash() && { opacity: 1 }),
                            ...(!canViewStokeCash() && { opacity: 0.5 }),
                            ...(!canViewStokeCash() && { backgroundColor: 'gray' })
                          }}
                          disabled={!canViewStokeCash()}
                          onClick={() => handleViewLowStock(row.id)}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          onClick={() => handleOpenDialog(row, row.productCashStock.id)}
                          style={{
                            backgroundColor: canUpdateStokeCash() ? 'green' : 'gray',
                            color: canUpdateStokeCash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateStokeCash() && { opacity: 1 }),
                            ...(!canUpdateStokeCash() && { opacity: 0.5 }),
                            ...(!canUpdateStokeCash() && { backgroundColor: 'gray' })
                          }}
                          disabled={!canUpdateStokeCash()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'product' ? (
                      row.productCashStock.productname
                    ) : column.id === 'lowstock' ? (
                      row.productCashStock?.lowStockQty
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
        <DialogTitle>Edit Cash Stock</DialogTitle>
        <DialogContent>
          <Grid item container spacing={2}>
            <Grid item sm={6}>
              <Typography variant="subtitle1">Product Name:</Typography>
              <input
                disabled
                value={selectedRow?.productCashStock?.productname || ''}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, productStock: { ...selectedRow.productCashStock.id, productname: e.target.value } })
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
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
        <DialogTitle align="center" variant="h5">
          View Cash Stock
        </DialogTitle>
        <DialogContent>
          <Grid item container spacing={4}>
            <Grid item sm={6}>
              <Typography variant="subtitle1">Product name:</Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography>{viewStock?.productCashStock?.productname}</Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={4}>
            <Grid item sm={6}>
              <Typography variant="subtitle1">Stock:</Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography>{viewStock?.qty}</Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={4}>
            <Grid item sm={6}>
              <Typography variant="subtitle1">Updated By:</Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography>{viewStock?.cashStockUpdateUser?.username}</Typography>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleCloseViewDialog} color="secondary" id="savebtncs" variant="outlined">
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProductCash;
