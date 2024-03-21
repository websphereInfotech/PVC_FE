import React from 'react';
import { Container, Typography, Card, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const EmployeeDirectoryPage = () => {
  // Dummy employee data
  const employees = [
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', position: 'HR Manager', department: 'Human Resources' },
    { id: 3, name: 'Alice Johnson', position: 'Marketing Specialist', department: 'Marketing' },
    { id: 4, name: 'Bob Brown', position: 'Financial Analyst', department: 'Finance' },
    { id: 5, name: 'Emily Wilson', position: 'Sales Representative', department: 'Sales' }
  ];

  return (
    <Container>
      <Card style={{ padding: '25px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Employee Directory
        </Typography>
        <TableContainer>
          <Table>
            <TableRow>
              <TableCell variant="head">ID</TableCell>
              <TableCell variant="head">Name</TableCell>
              <TableCell variant="head">Position</TableCell>
              <TableCell variant="head">Department</TableCell>
            </TableRow>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

export default EmployeeDirectoryPage;
