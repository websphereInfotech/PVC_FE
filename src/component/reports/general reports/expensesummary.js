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
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'voucherno', label: 'Voucher No.', minWidth: 100 },
  {
    id: 'vendorname',
    label: 'Vendor Name',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'expenseaccount',
    label: 'Expense Account',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2)
  },
  {
    id: 'group',
    label: 'Group',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2)
  },
  {
    id: 'texableamount',
    label: 'Texable Amount',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'tax',
    label: 'Tax',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2)
  },
  {
    id: 'totalamount',
    label: 'Total Amount',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  }
];

function createData(date, voucherno, vendorname, texableamount, expenseaccount, group, tax, totalamount) {
  return { date, voucherno, vendorname, texableamount, expenseaccount, group, tax, totalamount };
}

const rows = [
  createData('2024-04-01', 'EXP001', 'websphere', 3287263, 1, 0, '1.5%', '1%'),
  createData('2024-04-03', 'EXP002', 'user', 9596961, 1, 0, '1.5%', '1%'),
  createData('2024-04-03', 'EXP003', 'new', 301340, 1, 0, '1.5%', '1%'),
  createData('2024-04-02', 'EXP004', 'newuser', 9833520, 1, 0, '1.5%', '1%'),
  createData('2024-04-03', 'EXP005', 'onewdemo', 9984670, 1, 0, '1.5%', '1%'),
  createData('2024-04-03', 'EXP006', 'users', 7692024, 1, 0, '1.5%', '1%'),
  createData('2024-04-03', 'EXP001', 'websphere', 3287263, 1, 0, '1.5%', '1%'),
  createData('2024-04-02', 'EXP002', 'user', 9596961, 1, 0, '1.5%', '1%'),
  createData('2024-04-03', 'EXP003', 'new', 301340, 1, 0, '1.5%', '1%'),
  createData('2024-04-03', 'EXP004', 'newuser', 9833520, 1, 0, '1.5%', '1%'),
  createData('2024-04-01', 'EXP005', 'onewdemo', 9984670, 1, 0, '1.5%', '1%'),
  createData('2024-04-03', 'EXP001', 'websphere', 3287263, 1, 0, '1.5%', '1%'),
  createData('2024-04-03', 'EXP002', 'user', 9596961, 1, 0, '1.5%', '1%'),
  createData('2024-04-03', 'EXP003', 'new', 301340, 1, 0, '1.5%', '1%'),
  createData('2024-04-04', 'EXP004', 'newuser', 9833520, 1, 0, '1.5%', '1%'),
  createData('2024-04-03', 'EXP005', 'onewdemo', 9984670, 1, 0, '1.5%', '1%'),
  createData('2024-04-03', 'EXP006', 'users', 7692024, 1, 0, '1.5%', '1%')
];

export default function Expensesummary() {
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
