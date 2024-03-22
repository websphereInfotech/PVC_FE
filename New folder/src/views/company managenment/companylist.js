import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Card,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';

const CompanyList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(1);
  const [deleteCompanyId, setDeleteCompanyId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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

  const handleAddCompany = () => {
    navigate('/addcompany');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteCompany = (companyId) => {
    setDeleteCompanyId(companyId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    // Delete logic goes here
    console.log('Deleting company with id:', deleteCompanyId);
    setOpenDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setDeleteCompanyId(null);
    setOpenDeleteDialog(false);
  };

  return (
    <Container>
      <Card style={{ padding: '25px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Company List
        </Typography>
        <Button variant="contained" color="secondary" style={{ mb: 2, margin: '10px' }} onClick={handleAddCompany}>
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
                    <VisibilityIcon />
                    <EditIcon />
                    <DeleteIcon onClick={() => handleDeleteCompany(company.id)} />
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
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete Company</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this company?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>No</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CompanyList;
