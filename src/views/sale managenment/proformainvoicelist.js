import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Proformainvoiceview, fetchproformainvoiceList, deleteProformainvoice } from 'store/thunk';
import { Card, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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
// import { Link } from 'react-router-dom';
import useCan from 'views/checkpermissionvalue';

const columns = [
  { id: 'ProFormaInvoice_no', label: 'No.', align: 'center' },
  { id: 'customer', label: 'Customer', align: 'center' },
  { id: 'date', label: 'Date', align: 'center' },
  // { id: 'mobileno', label: 'Mobile No.', align: 'center' },
  // { id: 'email', label: 'Email', align: 'center' },
  { id: 'validtill', label: 'Valid Till', align: 'center' },
  { id: 'view', label: 'View', align: 'center' },
  { id: 'edit', label: 'Edit', align: 'center' },
  { id: 'delete', label: 'Delete', align: 'center' }
];

export default function ProformainvoiceList() {
  const {
    canUpdateProformainvoiceQuotation,
    canCreateProformainvoiceQuotation,
    canViewProformainvoiceQuotation,
    canDeProformainvoiceQuotation
  } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [quotations, setQuotations] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // called api of all quotation
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchproformainvoiceList());
        response.sort((a, b) => {
          const aNum = parseInt(a.ProFormaInvoice_no.split('-')[1]);
          const bNum = parseInt(b.ProFormaInvoice_no.split('-')[1]);
          return aNum - bNum;
        });
        setQuotations(response);
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  // use for change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //use for how many row show in page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // use for view single button passed id of data
  const handleViewQuotation = (id) => {
    dispatch(Proformainvoiceview(id));
    navigate(`/proformainvoiceviewpage/${id}`);
  };

  //use for edit button passed id of data
  const handleUpdateQuotation = (id) => {
    dispatch(Proformainvoiceview(id));
    navigate(`/proformainvoice/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteQuotation = async () => {
    try {
      await dispatch(deleteProformainvoice(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Card sx={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Pro Forma Invoice List
      </Typography>
      {/* <Link to="/qutation" style={{ textDecoration: 'none' }}> */}
      <Button
        variant="contained"
        href="/proformainvoice"
        color="secondary"
        style={{ margin: '10px' }}
        disabled={!canCreateProformainvoiceQuotation()}
      >
        Create Pro Forma Invoice
      </Button>
      {/* </Link> */}
      <TableContainer sx={{ maxHeight: 800, display: 'flex', alignItems: 'center' }}>
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
                      <Button
                        variant="outlined"
                        color="secondary"
                        disabled={!canViewProformainvoiceQuotation()}
                        onClick={() => handleViewQuotation(row.id)}
                      >
                        View
                      </Button>
                    ) : column.id === 'edit' ? (
                      <Button
                        disabled={!canUpdateProformainvoiceQuotation()}
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleUpdateQuotation(row.id)}
                      >
                        Edit
                      </Button>
                    ) : column.id === 'delete' ? (
                      <Button
                        disabled={!canDeProformainvoiceQuotation()}
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteConfirmation(row.id)}
                      >
                        Delete
                      </Button>
                    ) : column.id === 'date' || column.id === 'validtill' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'customer' ? (
                      row.customer.accountname
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
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this pro forma invoice?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDeleteQuotation} color="secondary" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
