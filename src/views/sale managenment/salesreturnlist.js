import React, { useState } from 'react';
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
// import { SalesInvoiceview, deleteSalesinvoice, getallSalesInvoice } from 'store/thunk';
// import { useDispatch } from 'react-redux';
// import useCan from 'views/checkpermissionvalue';

const columns = [
  { id: 'invoiceno', label: 'Invocie No', minWidth: 170, align: 'center' },
  { id: 'customer', label: 'Customer', minWidth: 170, align: 'center' },
  { id: 'invoicedate', label: 'Date.', minWidth: 170, align: 'center' },
  { id: 'duedate', label: 'Due Date', minWidth: 170, align: 'center' },
  // { id: 'mobileno', label: 'Mobile No.', minWidth: 100, align: 'center'  },
  { id: 'view', label: 'View', minWidth: 100, align: 'center' },
  { id: 'edit', label: 'Edit', minWidth: 100, align: 'center' },
  { id: 'delete', label: 'Delete', minWidth: 100, align: 'center' }
];

const Salesinvoicelist = () => {
  // const { canUpdateSalesinvoice, canViewalesinvoice, canDeleteSalesinvoice } = useCan();
  const navigate = useNavigate();
  // const [salesinvoice, setsalesinvoice] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  // const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  // const [selectedId, setSelectedId] = useState(null);

  // useEffect(() => {
  //   const fetchSalesinvoice = async () => {
  //     try {
  //       const data = await dispatch(getallSalesInvoice());
  //       data.data.sort((a, b) => {
  //         const aNum = parseInt(a.invoiceno);
  //         const bNum = parseInt(b.invoiceno);
  //         return aNum - bNum;
  //       });
  //       setsalesinvoice(data.data);
  //     } catch (error) {
  //       console.error('Error fetching sales invoice:', error);
  //     }
  //   };

  //   fetchSalesinvoice();
  // }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddSalesinvoice = () => {
    navigate('/salesreturn');
  };

  // const handleUpdateSalesInvoice = (id) => {
  //   dispatch(SalesInvoiceview(id));
  //   navigate(`/salesinvoice/${id}`);
  // };

  // const handleViewsalesinvoice = (id) => {
  //   dispatch(SalesInvoiceview(id));
  //   navigate(`/salesinvoiceview/${id}`);
  // };

  // const handleDeleteConfirmation = (id) => {
  //   setOpenConfirmation(true);
  //   setSelectedId(id);
  // };

  // const handleDeleteSalesInvoice = async () => {
  //   try {
  //     console.log(selectedId, 'selected');
  //     await dispatch(deleteSalesinvoice(selectedId));
  //     setOpenConfirmation(false);
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };

  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Return Sales Invoice List
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '10px' }} onClick={handleAddSalesinvoice}>
        Create Return Sales Invoice
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
            {/* {salesinvoice?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'view' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        // disabled={!canViewalesinvoice()}
                        // onClick={() => handleViewsalesinvoice(row.id)}
                      >
                        View
                      </Button>
                    ) : column.id === 'edit' ? (
                      <Button
                        // disabled={!canUpdateSalesinvoice()}
                        variant="outlined"
                        color="secondary"
                        // onClick={() => handleUpdateSalesInvoice(row.id)}
                      >
                        Edit
                      </Button>
                    ) : column.id === 'delete' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        // disabled={!canDeleteSalesinvoice()}
                        // onClick={() => handleDeleteConfirmation(row.id)}
                      >
                        Delete
                      </Button>
                    ) : column.id === 'invoicedate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'duedate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'customer' ? (
                      row.InvioceCustomer.shortname
                    ) : (
                      row[column.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8, 25, 100]}
        component="div"
        // count={salesinvoice?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this Sale Invoice?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    // </Container>
  );
};

export default Salesinvoicelist;
