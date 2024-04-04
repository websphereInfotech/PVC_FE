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
  {
    id: 'vendor',
    label: 'Vendor',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'totalamount',
    label: 'Total Amount(₹)',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'totalpaidamount',
    label: 'Total Paid Amount(₹)',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'texableamount',
    label: 'Texable Amount(₹)',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  }
];

function createData(vendor, totalamount, totalpaidamount, texableamount) {
  return { vendor, totalamount, totalpaidamount, texableamount };
}

const rows = [
  createData('newuser', 3287263, 1, 456),
  createData('newuser', 9596961, 1, 456),
  createData('newuser', 301340, 1, 456),
  createData('newuser', 9833520, 1, 456),
  createData('newuser', 9984670, 1, 456),
  createData('newuser', 7692024, 1, 456),
  createData('newuser', 3287263, 1, 456),
  createData('newuser', 9596961, 1, 456),
  createData('newuser', 301340, 1, 456),
  createData('newuser', 9833520, 1, 456),
  createData('newuser', 9984670, 1, 456),
  createData('newuser', 3287263, 1, 456),
  createData('newuser', 9596961, 1, 456),
  createData('newuser', 301340, 1, 456),
  createData('newuser', 9833520, 1, 456),
  createData('newuser', 9984670, 1, 456),
  createData('newuser', 7692024, 1, 456)
];

export default function Vendorwise() {
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
