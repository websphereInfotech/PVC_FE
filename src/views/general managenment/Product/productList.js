import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TablePagination,
  TableHead,
  TableContainer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';

import AnchorProductDrawer from 'component/productadd';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useDispatch } from 'react-redux';
import { DeleteProduct, fetchAllProducts, viewProduct } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const columns = [
  { id: 'productname', label: 'Product Name', align: 'center' },
  { id: 'HSNcode', label: 'HSN Code', align: 'center' },
  { id: 'gstrate', label: 'GST Rate', align: 'center' },
  { id: 'salesprice', label: 'Sales Price', align: 'center' },
  { id: 'lowStockQty', label: 'low Stock Qty', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const ProductList = () => {
  const { canUpdateProduct, canDeleteProduct, canViewProduct } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  useEffect(() => {
    dispatch(fetchAllProducts())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching product data:', error);
      });
  }, [dispatch, navigate]);

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleProductview = (id) => {
    dispatch(viewProduct(id));
    navigate(`/productview/${id}`);
  };

  const handleUpdateProduct = (id) => {
    setIsDrawerOpen(true);
    setSelectedProduct(id);
    dispatch(viewProduct(id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async () => {
    try {
      await dispatch(DeleteProduct(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Product List
      </Typography>
      <TableContainer>
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
            {products?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewProduct() ? 'Blue' : 'gray',
                            color: canViewProduct() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewProduct() && { opacity: 1 }),
                            ...(!canViewProduct() && { opacity: 0.5 }),
                            ...(!canViewProduct() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleProductview(product.id)}
                          disabled={!canViewProduct()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateProduct() ? 'green' : 'gray',
                            color: canUpdateProduct() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateProduct() && { opacity: 1 }),
                            ...(!canUpdateProduct() && { opacity: 0.5 }),
                            ...(!canUpdateProduct() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateProduct(product.id)}
                          disabled={!canUpdateProduct()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteProduct() ? 'Red' : 'gray',
                            color: canDeleteProduct() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteProduct() && { opacity: 1 }),
                            ...(!canDeleteProduct() && { opacity: 0.5 }),
                            ...(!canDeleteProduct() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(product.id)}
                          disabled={!canDeleteProduct()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : (
                      //   <Button
                      //   disabled={!canUpdateProduct()}
                      //     variant="outlined"
                      //     color="secondary"
                      //     onClick={() => handleUpdatePayment(product.id)}
                      //   >
                      //     Edit
                      //   </Button>
                      // ) : column.id === 'delete' ? (
                      //   <Button
                      //   disabled={!canDeleteProduct()}
                      //     variant="outlined"
                      //     color="secondary"
                      //     onClick={() => handleDeleteConfirmation(product.id)}
                      //   >
                      //     Delete
                      //   </Button>
                      product[column.id]
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
        count={products?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <AnchorProductDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} id={selectedProduct} />
    </Card>
  );
};

export default ProductList;
