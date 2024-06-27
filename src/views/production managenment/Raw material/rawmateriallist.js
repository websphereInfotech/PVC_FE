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
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useDispatch } from 'react-redux';
import { DeleteRawmaterial, fetchAllRawmaterial, viewRawmaterial } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import RawMaterialDrawer from 'component/rawmaterialadd';

const columns = [
  { id: 'productname', label: 'Product Name', align: 'center' },
  { id: 'HSNcode', label: 'HSN Code', align: 'center' },
  { id: 'gstrate', label: 'GST Rate', align: 'center' },
  { id: 'salesprice', label: 'Sales Price', align: 'center' },
  { id: 'productCreateUser', label: 'Created By', align: 'center' },
  { id: 'productUpdateUser', label: 'Updated By', align: 'center' },
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
const Rawmateriallist = () => {
  const { canUpdateRawmaterial, canDeleteRawmaterial, canViewRawmaterial, canCreateRawmaterial } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  useEffect(() => {
    dispatch(fetchAllRawmaterial())
      .then((data) => {
        setProduct(data);
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

  const handleRawmaterial = (id) => {
    dispatch(viewRawmaterial(id));
    navigate(`/rawmaterialview/${id}`);
  };

  const handleUpdateRawmaterial = (id) => {
    setIsDrawerOpen(true);
    setSelectedProduct(id);
    dispatch(viewRawmaterial(id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddRawmaterial = () => {
    setIsDrawerOpen(true);
  };

  const handleRawProductUpdated = () => {
    dispatch(fetchAllRawmaterial())
      .then((data) => {
        setProduct(data);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching updated product data:', error);
      });
  };

  const handleRawNewProductAdded = () => {
    dispatch(fetchAllRawmaterial())
      .then((data) => {
        setProduct(data);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching updated product data:', error);
      });
  };

  const handleDelete = async () => {
    try {
      await dispatch(DeleteRawmaterial(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSearch = async (event) => {
    try {
      const query = event.target.value;
      const response = await dispatch(fetchAllRawmaterial({ search: query }));
      setProduct(response);
    } catch (error) {
      console.error('Error Searching Product:', error);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Raw Material List
      </Typography>
      <SearchContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleAddRawmaterial}
          disabled={!canCreateRawmaterial()}
        >
          Create Raw Material
        </Button>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={handleSearch} />
        </Search>
      </SearchContainer>
      <TableContainer>
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
            {products?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
              <TableRow key={product.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewRawmaterial() ? 'Blue' : 'gray',
                            color: canViewRawmaterial() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewRawmaterial() && { opacity: 1 }),
                            ...(!canViewRawmaterial() && { opacity: 0.5 }),
                            ...(!canViewRawmaterial() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleRawmaterial(product.id)}
                          disabled={!canViewRawmaterial()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateRawmaterial() ? 'green' : 'gray',
                            color: canUpdateRawmaterial() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateRawmaterial() && { opacity: 1 }),
                            ...(!canUpdateRawmaterial() && { opacity: 0.5 }),
                            ...(!canUpdateRawmaterial() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateRawmaterial(product.id)}
                          disabled={!canUpdateRawmaterial()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteRawmaterial() ? 'Red' : 'gray',
                            color: canDeleteRawmaterial() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteRawmaterial() && { opacity: 1 }),
                            ...(!canDeleteRawmaterial() && { opacity: 0.5 }),
                            ...(!canDeleteRawmaterial() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(product.id)}
                          disabled={!canDeleteRawmaterial()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'productCreateUser' ? (
                      product.productCreateUser?.username
                    ) : column.id === 'productUpdateUser' ? (
                      product.productUpdateUser?.username
                    ) : (
                      product[column.id]
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
        count={products?.length || 0}
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
      <RawMaterialDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        id={selectedProduct}
        onNewRawProductAdded={handleRawNewProductAdded}
        onRawProductUpdated={handleRawProductUpdated}
      />
    </Card>
  );
};

export default Rawmateriallist;
