import React, { useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableRow, TableCell, IconButton, Card, Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';

const CompanyList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(1);

  const companies = [
    {
      id: 1,
      companyName: 'ABC Inc.',
      contactNo: '1234567890',
      email: 'abc@example.com',
      contactPersonName: 'John Doe',
      address: '123 Main St',
      website: 'www.abc.com'
    },
    {
      id: 2,
      companyName: 'XYZ Corp.',
      contactNo: '9876543210',
      email: 'xyz@example.com',
      contactPersonName: 'Jane Smith',
      address: '456 Elm St',
      website: 'www.xyz.com'
    }
  ];

  const handleaddcompany = () => {
    navigate('/addcompany');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <Container>
      <Card>
        <Typography variant="h4" align="center" style={{ margin: '20px' }}>
          Company List
        </Typography>
        <Button variant="contained" color="primary" style={{ mb: 2, margin: '10px' }} onClick={handleaddcompany}>
          Add Company
        </Button>
        <Table>
          <TableRow>
            <TableCell variant="head">Company Name</TableCell>
            <TableCell variant="head">Contact No</TableCell>
            <TableCell variant="head">Email Id</TableCell>
            <TableCell variant="head">Contact Person Name</TableCell>
            <TableCell variant="head">Address</TableCell>
            <TableCell variant="head">Website</TableCell>
            <TableCell variant="head">Action</TableCell>
          </TableRow>
          <TableBody>
            {companies.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.companyName}</TableCell>
                <TableCell>{company.contactNo}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.contactPersonName}</TableCell>
                <TableCell>{company.address}</TableCell>
                <TableCell>{company.website}</TableCell>
                <TableCell>
                  <IconButton color="inherit">
                    <VisibilityIcon style={{ color: 'green' }} />
                    <EditIcon style={{ color: 'blue' }} />
                    <DeleteIcon style={{ color: 'red' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Pagination
        count={Math.ceil(companies.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default CompanyList;
