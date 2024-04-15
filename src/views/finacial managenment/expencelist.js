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
import { getallExpense, Expenseview } from 'store/thunk'; // Assuming you have a thunk action to fetch expenses
import { useDispatch } from 'react-redux';

const columns = [
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'voucherno', label: 'Voucher No', minWidth: 100 },
  { id: 'customer', label: 'Vendor', minWidth: 170, align: 'center' },
  { id: 'gstin', label: 'GST IN.', minWidth: 170, align: 'center' },
  { id: 'payment', label: 'Payment Method', minWidth: 170, align: 'center' },
  { id: 'billno', label: 'Bill No.', minWidth: 170, align: 'center' },
  { id: 'mobileno', label: 'Mobile No.', minWidth: 170, align: 'center' },
  { id: 'view', label: 'View', minWidth: 170, align: 'center' },
  { id: 'edit', label: 'Edit', minWidth: 170, align: 'center' }
];

const ExpensePage = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await dispatch(getallExpense());
        // console.log(data, 'data');
        setExpenses(data.data);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };

    fetchExpenses();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddExpense = () => {
    navigate('/addexpense');
  };

  const handleViewExpense = (id) => {
    dispatch(Expenseview(id));
    navigate(`/viewexpense/${id}`);
  };
  const handleUpdateExpense = (id) => {
    navigate(`/addexpense/${id}`);
    // console.log(id);
  };
  return (
    // <Container>
    <Card style={{ padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Expense List
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleAddExpense}>
        Add Expense
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
            {expenses?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'view' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleViewExpense(row.id)}>
                        View
                      </Button>
                    ) : column.id === 'edit' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleUpdateExpense(row.id)}>
                        Edit
                      </Button>
                    ) : column.id === 'date' ? (
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
        count={expenses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
    // </Container>
  );
};

export default ExpensePage;
