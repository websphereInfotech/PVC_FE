import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Card } from '@mui/material';
import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'User Name', align: 'center' },
  { id: 'mobileno', label: 'Mobile No.', align: 'center' },
  { id: 'email', label: 'Email', align: 'center' },
  { id: 'role', label: 'Role', align: 'center' },
  { id: 'basicsalary', label: 'Basic Salary', align: 'center' },
  { id: 'view', label: 'View', align: 'center' },
  { id: 'edit', label: 'Edit', align: 'center' }
];

export default function UserList() {
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // use for change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //use for how many row show in page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card sx={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        User List
      </Typography>
      <Link to="/adduser" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="secondary" style={{ margin: '16px' }}>
          Create USer
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
          {/* <TableBody>
            {quotations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'view' ? (
                      <Button variant="outlined" color="secondary" >
                        View
                      </Button>
                    ) : column.id === 'edit' ? (
                      <Button variant="outlined" color="secondary">
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
          </TableBody> */}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        // count={quotations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
