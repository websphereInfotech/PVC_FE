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

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useDispatch } from 'react-redux';
import { DeleteCustomer, fetchAllCustomers, viewCustomer } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import AnchorTemporaryDrawer from 'component/customeradd';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const columns = [
  { id: 'accountname', label: 'Name', align: 'center' },
  { id: 'email', label: 'Email', align: 'center' },
  { id: 'mobileno', label: 'Mobile No.', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];
const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2)
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '1px solid #918989',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));
const CustomerList = () => {
  const { canUpdateCustomer, canDeleteCustomer, canViewCustomer } = useCan();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customers, setCustomer] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState();

  useEffect(() => {
    dispatch(fetchAllCustomers())
      .then((data) => {
        setCustomer(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching product data:', error);
      });
  }, [dispatch, navigate]);

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleCustomerview = (id) => {
    dispatch(viewCustomer(id));
    navigate(`/customerview/${id}`);
  };
  const handleUpdateCustomer = (id) => {
    setIsDrawerOpen(true);
    setSelectedCustomer(id);
    dispatch(viewCustomer(id));
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
      await dispatch(DeleteCustomer(selectedId));
      setOpenConfirmation(false);
      setCustomer((preCustomer) => preCustomer.filter((customer) => customer.id !== selectedId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSearch = async (event) => {
    try {
      const query = event.target.value;
      const response = await dispatch(fetchAllCustomers({ search: query }));
      setCustomer(response);
    } catch (error) {
      console.error('Error Searching Customer:', error);
    }
  };
  const handleCustomerUpdated = () => {
    dispatch(fetchAllCustomers())
      .then((data) => {
        setCustomer(data);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        console.log('Error fetching updated product data:', error);
      });
  };
  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Customer List
      </Typography>
      <SearchContainer>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={handleSearch} />
        </Search>
      </SearchContainer>
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
            {customers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, index) => (
              <TableRow key={customer.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewCustomer() ? 'Blue' : 'gray',
                            color: canViewCustomer() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewCustomer() && { opacity: 1 }),
                            ...(!canViewCustomer() && { opacity: 0.5 }),
                            ...(!canViewCustomer() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleCustomerview(customer.id)}
                          disabled={!canViewCustomer()}
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
                          onClick={() => handleUpdateCustomer(customer.id)}
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
                          onClick={() => handleDeleteConfirmation(customer.id)}
                          disabled={!canDeleteCustomer()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : (
                      customer[column.id]
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
        count={customers?.length || 0}
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
      <AnchorTemporaryDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        id={selectedCustomer}
        onCustomerUpdated={handleCustomerUpdated}
      />
    </Card>
  );
};

export default CustomerList;
