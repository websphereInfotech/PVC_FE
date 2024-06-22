import React from 'react';
import { Container, Typography, Card, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';

const EmployeeDirectoryPage = () => {
  // Dummy employee data
  const employees = [
    { id: 1, name: 'John Doe', role: 'Admin', mobileno: '3467890987', email: 'john@gmail.com', balance: 5000 },
    { id: 2, name: 'Jane Smith', role: 'Account', mobileno: '9988778901', email: 'jones@gmail.com', balance: 8000 },
    { id: 3, name: 'Alice Johnson', role: 'Employee', mobileno: '8945789604', email: 'alice@gmail.com', balance: 7000 },
    { id: 4, name: 'Bob Brown', role: 'Workers', mobileno: '9980984532', email: 'bob@gmail.com', balance: 10000 },
    { id: 5, name: 'Emily Wilson', role: 'Other', mobileno: '7890789034', email: 'emily@gmail.com', balance: 12000 }
  ];

  return (
    <Container>
      <Card style={{ padding: '25px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Employee Directory
        </Typography>

        <TableContainer sx={{ maxHeight: 575 }}>
          <Table style={{ border: '1px solid lightgrey' }}>
            <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
              <TableRow>
                <TableCell variant="head" align="center">
                  ID
                </TableCell>
                <TableCell variant="head" align="center">
                  Name
                </TableCell>
                <TableCell variant="head" align="center">
                  Role
                </TableCell>
                <TableCell variant="head" align="center">
                  Email
                </TableCell>
                <TableCell variant="head" align="center">
                  Mobile No
                </TableCell>
                <TableCell variant="head" align="center">
                  Balance
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={employee.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                  <TableCell align="center">{employee.id}</TableCell>
                  <TableCell align="center">{employee.name}</TableCell>
                  <TableCell align="center">{employee.role}</TableCell>
                  <TableCell align="center">{employee.email}</TableCell>
                  <TableCell align="center">{employee.mobileno}</TableCell>
                  <TableCell align="center">{employee.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={employees?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      </Card>
    </Container>
  );
};

export default EmployeeDirectoryPage;
