import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { viewPurchaseinvoice, deletePurchaseinvoice, getallPurchaseinvoice } from 'store/thunk';
import { Card, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
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
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
  { id: 'invoicedate', label: 'Invoice Date', minWidth: 100, align: 'center' },
  { id: 'vendor', label: 'Vendor', minWidth: 100, align: 'center' },
  { id: 'duedate', label: 'Due Date', minWidth: 100, align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

export default function PurchaseinvoiceList() {
  const { canViewPurchaseinvoice, canDeletePurchaseinvoice, canUpdatePurchaseinvoice, canCreatePurchaseinvoice } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [purchasebill, setPurchasebill] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [billid, setBillid] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getallPurchaseinvoice());
        setPurchasebill(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching purchase invoice:', error);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewPurchaseBill = (id) => {
    dispatch(viewPurchaseinvoice(id));
    navigate(`/purchaseinvoiceview/${id}`);
  };

  const handleUpdatePurchaseBill = (id) => {
    dispatch(viewPurchaseinvoice(id));
    navigate(`/purchaseinvoice/${id}`);
  };
  const handleAddpuchasebill = () => {
    navigate('/purchaseinvoice');
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setBillid(id);
  };

  const handleDeletePurchasebill = async () => {
    try {
      await dispatch(deletePurchaseinvoice(billid));
      setOpenConfirmation(false);
      setPurchasebill((prevPurchase) => prevPurchase.filter((purchase) => purchase.id !== billid));
    } catch (error) {
      console.error('Error deleting purchase invoice:', error);
    }
  };

  return (
    <Card sx={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Purchase Invoice List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: '16px' }}
        onClick={handleAddpuchasebill}
        disabled={!canCreatePurchaseinvoice()}
      >
        Create Purchase Invoice
      </Button>
      <TableContainer sx={{ maxHeight: 575 }}>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {purchasebill?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      // <Button
                      //   variant="outlined"
                      //   color="secondary"
                      //   onClick={() => handleViewPurchaseBill(row.id)}
                      //   disabled={!canViewPurchaseinvoice()}
                      // >
                      //   View
                      // </Button>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewPurchaseinvoice() ? 'Blue' : 'gray',
                            color: canViewPurchaseinvoice() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewPurchaseinvoice() && { opacity: 1 }),
                            ...(!canViewPurchaseinvoice() && { opacity: 0.5 }),
                            ...(!canViewPurchaseinvoice() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewPurchaseBill(row.id)}
                          disabled={!canViewPurchaseinvoice()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdatePurchaseinvoice() ? 'green' : 'gray',
                            color: canUpdatePurchaseinvoice() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdatePurchaseinvoice() && { opacity: 1 }),
                            ...(!canUpdatePurchaseinvoice() && { opacity: 0.5 }),
                            ...(!canUpdatePurchaseinvoice() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdatePurchaseBill(row.id)}
                          disabled={!canUpdatePurchaseinvoice()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeletePurchaseinvoice() ? 'Red' : 'gray',
                            color: canDeletePurchaseinvoice() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeletePurchaseinvoice() && { opacity: 1 }),
                            ...(!canDeletePurchaseinvoice() && { opacity: 0.5 }),
                            ...(!canDeletePurchaseinvoice() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeletePurchaseinvoice()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : //  column.id === 'edit' ? (
                    //   <Button
                    //     variant="outlined"
                    //     color="secondary"
                    //     onClick={() => handleUpdatePurchaseBill(row.id)}
                    //     disabled={!canUpdatePurchaseinvoice()}
                    //   >
                    //     Edit
                    //   </Button>
                    // ) : column.id === 'delete' ? (
                    //   <Button
                    //     variant="outlined"
                    //     color="secondary"
                    //     onClick={() => handleDeleteConfirmation(row.id)}
                    //     disabled={!canDeletePurchaseinvoice()}
                    //   >
                    //     Delete
                    //   </Button>
                    // ) :
                    column.id === 'invoicedate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'duedate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'vendor' ? (
                      row.purchseVendor.accountname
                    ) : column.id === 'updatedBy' ? (
                      row.salesUpdateUser?.username
                    ) : column.id === 'createdBy' ? (
                      row.salesCreateUser?.username
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
        count={purchasebill.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeletePurchasebill} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
