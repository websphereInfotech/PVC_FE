import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableRow, TableCell, Card, TableHead, TablePagination, Grid } from '@mui/material';
import { getTotalProductStock, getTotalRawMaterialStock } from 'store/thunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const columns = [
  { id: 'product', label: 'Product Name', minWidth: 100, align: 'center' },
  { id: 'stock', label: 'Stock', minWidth: 70, align: 'center' }
];

const TotalStock = () => {
  const [stoke, setStoke] = useState([]);
  const [rawMaterial, setRawMaterial] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchStoke = async () => {
      try {
        const data = await dispatch(getTotalProductStock());
        setStoke(data);

        const rawMaterial = await dispatch(getTotalRawMaterialStock());
        setRawMaterial(rawMaterial);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('fetching data of stoke', error);
      }
    };
    fetchStoke();
  }, [dispatch, navigate]);
  return (
    <Card style={{ width: 'auto', padding: '20px' }}>
      {/* <TableContainer sx={{ maxHeight: 700 }}> */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" align="center" id="mycss">
            Product
          </Typography>
          <Card style={{ width: 'auto', padding: '20px' }}>
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
                {stoke?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'product' ? row.productName : column.id === 'stock' ? row.totalQty : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={stoke?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" align="center" id="mycss">
            Raw Material
          </Typography>
          <Card style={{ width: 'auto', padding: '20px' }}>
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
                {rawMaterial?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'product' ? row.productName : column.id === 'stock' ? row.totalQty : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rawMaterial?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Grid>
      </Grid>
      {/* </TableContainer> */}
    </Card>
  );
};

export default TotalStock;
