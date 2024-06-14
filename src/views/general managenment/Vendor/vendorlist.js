import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TablePagination,
  TableHead,
  TableContainer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { DeleteVendor, fetchAllVendors, viewVendor } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import AnchorVendorDrawer from 'component/vendor';
import { useNavigate } from 'react-router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
  { id: 'accountname', label: 'Name', align: 'center' },
  { id: 'email', label: 'Email', align: 'center' },
  { id: 'mobileno', label: 'Mobile No.', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const VendorList = () => {
  const { canUpdateCustomer, canDeleteCustomer, canViewVendor } = useCan();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [vendors, setVendor] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState();

  useEffect(() => {
    dispatch(fetchAllVendors())
      .then((data) => {
        setVendor(data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [dispatch]);

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };
  const handleCustomerview = (id) => {
    dispatch(viewVendor(id));
    navigate(`/vendorview/${id}`);
  };
  const handleUpdateVendor = (id) => {
    setIsDrawerOpen(true);
    setSelectedVendor(id);
    dispatch(viewVendor(id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async () => {
    try {
      await dispatch(DeleteVendor(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Vendor List
      </Typography>
      <TableContainer>
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
            {vendors?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((vendor) => (
              <TableRow key={vendor.id}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewVendor() ? 'Blue' : 'gray',
                            color: canViewVendor() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewVendor() && { opacity: 1 }),
                            ...(!canViewVendor() && { opacity: 0.5 }),
                            ...(!canViewVendor() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleCustomerview(vendor.id)}
                          disabled={!canViewVendor()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateCustomer() ? 'green' : 'gray',
                            color: canUpdateCustomer() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateCustomer() && { opacity: 1 }),
                            ...(!canUpdateCustomer() && { opacity: 0.5 }),
                            ...(!canUpdateCustomer() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateVendor(vendor.id)}
                          disabled={!canUpdateCustomer()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteCustomer() ? 'Red' : 'gray',
                            color: canDeleteCustomer() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteCustomer() && { opacity: 1 }),
                            ...(!canDeleteCustomer() && { opacity: 0.5 }),
                            ...(!canDeleteCustomer() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(vendor.id)}
                          disabled={!canDeleteCustomer()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : (
                      vendor[column.id]
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
        count={vendors?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <AnchorVendorDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} id={selectedVendor} />
    </Card>
  );
};

export default VendorList;
