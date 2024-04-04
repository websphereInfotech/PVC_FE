import * as React from 'react';
// import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Card } from '@mui/material';

const columns = [
  { id: 'product', label: 'Product', minWidth: 100 },
  { id: 'unit', label: 'Unit', minWidth: 170 },
  {
    id: 'itemgroup',
    label: 'Item Group',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'itemcategory',
    label: 'Item Category',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2)
  },
  {
    id: 'purchaseprice',
    label: 'Purchase Price',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2)
  },
  {
    id: 'salesprice',
    label: 'Sales Price',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'gstrate',
    label: 'GST Rate(%)',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  }
];

function createData(product, unit, itemgroup, itemcategory, purchaseprice, salesprice, gstrate) {
  return { product, unit, itemgroup, itemcategory, purchaseprice, salesprice, gstrate };
}

const rows = [
  createData('newproduct', 'OTHERS', 'websphere', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'user', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'new', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'newuser', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'onewdemo', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'users', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'websphere', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'user', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'new', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'newuser', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'onewdemo', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'websphere', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'user', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'new', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'newuser', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'onewdemo', 'newcategory', 120, 200, '0.25%'),
  createData('newproduct', 'OTHERS', 'users', 'newcategory', 120, 200, '0.25%')
];

export default function Itemratecard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 660 }}>
        <Table style={{ borderLeft: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'lightgrey', color: 'white' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
