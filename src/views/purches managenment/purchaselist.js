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
  TablePagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getallPurchase, purchaseview } from 'store/thunk';
import { useDispatch } from 'react-redux';

const columns = [
  { id: 'quotation_no', label: 'Bill No', minWidth: 170 },
  { id: 'mobileno', label: 'Mobile No.', minWidth: 170, align: 'center' },
  { id: 'customer', label: 'customer', minWidth: 170, align: 'center' },
  { id: 'date', label: 'Bill Date.', minWidth: 170, align: 'center' },
  { id: 'pono', label: 'PO No', minWidth: 100 },
  { id: 'view', label: 'View', minWidth: 100 },
  { id: 'edit', label: 'Edit', minWidth: 100 }
];

const PurchaseOrderList = () => {
  const navigate = useNavigate();
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const data = await dispatch(getallPurchase());
        // console.log(data.data);
        setPurchaseOrders(data.data);
      } catch (error) {
        console.error('Error fetching purchase orders:', error);
      }
    };

    fetchPurchaseOrders();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddPurchaseOrder = () => {
    navigate('/addpurchase');
  };

  const handleViewPurchaseOrder = (id) => {
    dispatch(purchaseview(id));
    navigate(`/purchaseview/${id}`);
  };
  const handleUpdatePurchase = (id) => {
    navigate(`/addpurchase/${id}`);
    // console.log('id', id);
  };
  return (
    // <Container>
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Purchase Order List
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleAddPurchaseOrder}>
        Create New Purchase Order
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
            {purchaseOrders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'view' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleViewPurchaseOrder(order.id)}>
                        View
                      </Button>
                    ) : column.id === 'edit' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleUpdatePurchase(order?.id)}>
                        Edit
                      </Button>
                    ) : column.id === 'date' ? (
                      new Date(order[column.id]).toLocaleDateString()
                    ) : (
                      order[column.id]
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
        count={purchaseOrders?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
    // </Container>
  );
};

export default PurchaseOrderList;
