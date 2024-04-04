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
  { id: 'vendor', label: 'Vendor', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'paymentdate', label: 'Payment Date', minWidth: 170 },
  { id: 'billno', label: 'Bill No.', minWidth: 170 },
  {
    id: 'billnetamount',
    label: 'Bill Net Amount',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'paidamount',
    label: 'Paid Amount',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2)
  },
  {
    id: 'paymentdiscount',
    label: 'Payment Discount',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2)
  },
  {
    id: 'returnamount',
    label: 'Retuen Amount',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'balance',
    label: 'Balance(₹)',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  }
];

function createData(vendor, date, paymentdate, billno, billnetamount, paidamount, paymentdiscount, returnamount, balance) {
  return { vendor, date, paymentdate, billno, billnetamount, paidamount, paymentdiscount, returnamount, balance };
}

const rows = [
  createData('websphere', '2024-04-03', '2024-04-01', 'BN001', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-03', 'BN002', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-05', 'BN003', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-05', 'BN004', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-02', 'BN005', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-01', 'BN006', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-01', 'BN007', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-03', 'BN008', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-05', 'BN009', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-05', 'BN0010', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-02', 'BN0011', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-10', 'BN0012', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-03', 'BN0013', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-05', 'BN0014', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-05', 'BN0015', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-02', 'BN0016', 110, 120, '0.25%', 100, 880),
  createData('websphere', '2024-04-03', '2024-04-01', 'BN0017', 110, 120, '0.25%', 100, 880)
];

export default function Payablebillwise() {
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
