import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableRow, TableCell, Card, TablePagination, TableHead, TableContainer } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getallVendorledger } from 'store/thunk';

const columns = [
  { id: 'date', label: 'Date', align: 'center', minWidth: 100 },
  { id: 'vendor', label: 'Vendor', align: 'center', minWidth: 100 },
  { id: 'creditAmount', label: 'Credit', align: 'center', minWidth: 100 },
  { id: 'debitAmount', label: 'Debit', align: 'center', minWidth: 100 },
  { id: 'remainingBalance', label: 'Balance', align: 'center', minWidth: 100 },
  { id: 'openingBalance', label: 'Opening Balance', align: 'center', minWidth: 100 }
];

const Ledgerlist = () => {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const vendorId = sessionStorage.getItem('vendorId');
  const formData = sessionStorage.getItem('formDate');
  const toDate = sessionStorage.getItem('toDate');
  useEffect(() => {
    dispatch(getallVendorledger(vendorId, formData, toDate))
      .then((data) => {
        setPayments(data.data);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
      });
  }, [dispatch, vendorId, formData, toDate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Ledger List
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
            {payments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment) => (
              <TableRow key={payment.id}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'date'
                      ? new Date(payment[column.id]).toLocaleDateString('en-GB')
                      : column.id === 'vendor'
                        ? payment.vendorData.vendorname
                        : payment[column.id]}
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
        count={payments?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default Ledgerlist;