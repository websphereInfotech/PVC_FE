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
import { SalesInvoiceview, getallSalesInvoice } from 'store/thunk';
import { useDispatch } from 'react-redux';

const columns = [
  { id: 'invoicedate', label: 'Date.', minWidth: 170, align: 'center' },
  { id: 'invoiceno', label: 'Invocie No', minWidth: 170 },
  { id: 'customer', label: 'Customer', minWidth: 170, align: 'center' },
  { id: 'duedate', label: 'Due Date', minWidth: 170, align: 'center' },
  { id: 'mobileno', label: 'Mobile No.', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 100 }
];

const Salesinvoicelist = () => {
  const navigate = useNavigate();
  const [salesinvoice, setsalesinvoice] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSalesinvoice = async () => {
      try {
        const data = await dispatch(getallSalesInvoice());
        // console.log(data.data);
        setsalesinvoice(data.data);
      } catch (error) {
        console.error('Error fetching sales invoice:', error);
      }
    };

    fetchSalesinvoice();
  }, [dispatch]);

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

  const handleViewsalesinvoice = (id) => {
    dispatch(SalesInvoiceview(id));
    navigate(`/salesinvoiceview/${id}`);
  };

  return (
    // <Container>
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Sales Invoice List
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleAddSalesinvoice}>
        Create Sales Invoice
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
            {salesinvoice?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleViewsalesinvoice(data.id)}>
                        View
                      </Button>
                    ) : column.id === 'invoicedate' ? (
                      new Date(data[column.id]).toLocaleDateString()
                    ) : column.id === 'duedate' ? (
                      new Date(data[column.id]).toLocaleDateString()
                    ) : (
                      data[column.id]
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
    </Card>
    // </Container>
  );
};

export default Salesinvoicelist;