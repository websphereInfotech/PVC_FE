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
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Companyview, deleteCompany, fetchAllCompany } from 'store/thunk';
import { useDispatch } from 'react-redux';
// import useCan from 'views/checkpermissionvalue';

const columns = [
  { id: 'companyname', label: 'Company Name', minWidth: 100, align: 'center' },
  { id: 'email', label: 'Email.', minWidth: 100, align: 'center' },
  { id: 'mobileno', label: 'Mobile No.', minWidth: 100, align: 'center' },
  { id: 'view', label: 'View', minWidth: 100, align: 'center' },
  { id: 'edit', label: 'Edit', minWidth: 100, align: 'center' },
  { id: 'delete', label: 'Delete', minWidth: 100, align: 'center' }
];

const CompanyList = () => {
  // const { canUpdateDebitnote, canViewDebitnote, canCreateDebitnote, canDeleteDebitnote } = useCan();
  const navigate = useNavigate();
  const [Company, setCompany] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await dispatch(fetchAllCompany());
        console.log(data, 'data');
        setCompany(data);
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };

    fetchCompany();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddCompany = () => {
    navigate('/addcompany');
  };

  const handlecompanyupdate = (id) => {
    dispatch(Companyview(id));
    navigate(`/addcompany/${id}`);
  };

  const handlecompanyview = (id) => {
    dispatch(Companyview(id));
    navigate(`/companyview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handlecompanydelete = async () => {
    try {
      await dispatch(deleteCompany(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Company List
      </Typography>
      <Button variant="contained" color="secondary" style={{ mb: 2, margin: '10px' }} onClick={handleAddCompany}>
        Add Company
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
            {Company?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'view' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        // disabled={!canViewDebitnote()}
                        onClick={() => handlecompanyview(row.id)}
                      >
                        View
                      </Button>
                    ) : column.id === 'edit' ? (
                      <Button
                        // disabled={!canUpdateDebitnote()}
                        variant="outlined"
                        color="secondary"
                        onClick={() => handlecompanyupdate(row.id)}
                      >
                        Edit
                      </Button>
                    ) : column.id === 'delete' ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        // disabled={!canDeleteDebitnote()}
                        onClick={() => handleDeleteConfirmation(row.id)}
                      >
                        Delete
                      </Button>
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
        rowsPerPageOptions={[8, 25, 100]}
        component="div"
        count={Company.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this Company?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handlecompanydelete} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    // </Container>
  );
};

export default CompanyList;
