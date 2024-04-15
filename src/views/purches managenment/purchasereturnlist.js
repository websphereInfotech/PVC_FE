import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PurchaseReturnview, getallPurchaseReturn } from 'store/thunk';
import { Card } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'debitdate', label: 'Date', minWidth: 170 },
  { id: 'debitnote', label: 'Debit No.', minWidth: 100 },
  { id: 'vendor', label: 'Vendor', minWidth: 170, align: 'center' },
  { id: 'refno', label: 'Refernce No.', minWidth: 170, align: 'center' },
  { id: 'refdate', label: 'Refernce Date', minWidth: 170, align: 'center' },
  { id: 'view', label: 'View', minWidth: 170, align: 'center' },
  { id: 'edit', label: 'Edit', minWidth: 170, align: 'center' }
];

export default function PurchaseReturnList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [purchasereturn, setPurchasereturn] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getallPurchaseReturn());
        // console.log(response, '>>>>>>>>>>>>>>>>');
        setPurchasereturn(response);
      } catch (error) {
        console.error('Error fetching purchase return:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewPurchaseReturn = (id) => {
    dispatch(PurchaseReturnview(id));
    navigate(`/purchasereturnview/${id}`);
  };
  const handleUpdatePurchaseReturn = (id) => {
    navigate(`/purchasereturn/${id}`);
  };
  const handleAddpuchasereturn = () => {
    navigate('/purchasereturn');
  };

  return (
    <Card sx={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Purchase Return List
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleAddpuchasereturn}>
        Create Purchase Return
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
            {purchasereturn?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'view' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleViewPurchaseReturn(row.id)}>
                        View
                      </Button>
                    ) : column.id === 'edit' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleUpdatePurchaseReturn(row.id)}>
                        Edit
                      </Button>
                    ) : column.id === 'refdate' ? (
                      new Date(row[column.id]).toLocaleDateString()
                    ) : column.id === 'debitdate' ? (
                      new Date(row[column.id]).toLocaleDateString()
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
        count={purchasereturn?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
