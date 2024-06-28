import React from 'react';
import { Container, Typography, Card, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';

const EmployeeDirectoryPage = () => {
  // Dummy employee data
  const employees = [
    { name: 'John Doe', role: 'Admin', status: 'Approve', startdate: '28-06-2024', enddate: '28-07-2024', salary: 5000 },
    { name: 'Jane Smith', role: 'Account', status: 'Approve', startdate: '20-06-2024', enddate: '02-07-2024', salary: 8000 },
    { id: 3, name: 'Alice Johnson', role: 'Employee', status: 'pending', startdate: '18-06-2024', enddate: '08-07-2024', salary: 7000 },
    { name: 'Bob Brown', role: 'Workers', status: 'Approve', startdate: '28-06-2024', enddate: '28-08-2024', salary: 10000 },
    { name: 'Emily Wilson', role: 'Other', status: 'pending', startdate: '12-06-2024', enddate: '02-07-2024', salary: 12000 }
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
                  Name
                </TableCell>
                <TableCell variant="head" align="center">
                  Role
                </TableCell>
                <TableCell variant="head" align="center">
                  Status
                </TableCell>
                <TableCell variant="head" align="center">
                  Start Date
                </TableCell>
                <TableCell variant="head" align="center">
                  End Date
                </TableCell>
                <TableCell variant="head" align="center">
                  Salary
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={employee.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                  <TableCell align="center">{employee.name}</TableCell>
                  <TableCell align="center">{employee.role}</TableCell>
                  <TableCell align="center">{employee.status}</TableCell>
                  <TableCell align="center">{employee.startdate}</TableCell>
                  <TableCell align="center">{employee.enddate}</TableCell>
                  <TableCell align="center">{employee.salary}</TableCell>
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
