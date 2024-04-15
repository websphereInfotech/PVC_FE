import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Quotationview, fetchQuotationList } from 'store/thunk';
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
import { Link } from 'react-router-dom';

const columns = [
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'quotation_no', label: 'Quotation No.', minWidth: 100 },
  { id: 'customer', label: 'Customer', minWidth: 170, align: 'center' },
  { id: 'mobileno', label: 'Mobile No.', minWidth: 170, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 170, align: 'center' },
  { id: 'validtill', label: 'Valid Till', minWidth: 170, align: 'center' },
  { id: 'view', label: 'View', minWidth: 170, align: 'center' },
  { id: 'edit', label: 'Edit', minWidth: 170, align: 'center' }
];

export default function QuotationList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchQuotationList());
        setQuotations(response);
      } catch (error) {
        console.error('Error fetching quotations:', error);
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

  const handleViewQuotation = (id) => {
    dispatch(Quotationview(id));
    navigate(`/qutationview/${id}`);
  };

  const handleUpdateQuotation = (id) => {
    dispatch(Quotationview(id));
    navigate(`/qutation/${id}`);
  };

  return (
    <Card sx={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Quotation List
      </Typography>
      <Link to="/qutation" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="secondary" style={{ margin: '16px' }}>
          Create Quotation
        </Button>
      </Link>
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
            {quotations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'view' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleViewQuotation(row.id)}>
                        View
                      </Button>
                    ) : column.id === 'edit' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleUpdateQuotation(row.id)}>
                        Edit
                      </Button>
                    ) : column.id === 'date' ? (
                      new Date(row[column.id]).toLocaleDateString()
                    ) : column.id === 'validtill' ? (
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
        count={quotations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
