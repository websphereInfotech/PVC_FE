// import React, { useState, useEffect } from 'react';
// import { Typography, Table, TableBody, TableRow, TableCell, Card, TablePagination, TableHead, TableContainer } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { getallVendorledger } from 'store/thunk';
// import { useNavigate } from 'react-router';

// const columns = [
//   { id: 'date', label: 'Date', align: 'center', minWidth: 100 },
//   { id: 'vendor', label: 'Vendor', align: 'center', minWidth: 100 },
//   { id: 'creditAmount', label: 'Credit', align: 'center', minWidth: 100 },
//   { id: 'debitAmount', label: 'Debit', align: 'center', minWidth: 100 },
//   { id: 'remainingBalance', label: 'Balance', align: 'center', minWidth: 100 }
// ];

// const Ledgerlist = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [payments, setPayments] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const vendorId = sessionStorage.getItem('vendorId');
//   const formData = sessionStorage.getItem('formDate');
//   const toDate = sessionStorage.getItem('toDate');

//   useEffect(() => {
//     dispatch(getallVendorledger(vendorId, formData, toDate))
//       .then((data) => {
//         setPayments(data.data);
//       })
//       .catch((error) => {
//         if (error.response.status === 401) {
//           navigate('/');
//         }
//         console.error('Error fetching vendor ledger data:', error);
//       });
//   }, [dispatch, vendorId, formData, toDate, navigate]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Card style={{ width: '100%', padding: '25px' }}>
//       <Typography variant="h4" align="center" id="mycss">
//         Vendor Ledger List
//       </Typography>
//       <TableContainer>
//         <Table style={{ border: '1px solid lightgrey' }}>
//           <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {payments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment, index) => (
//               <TableRow key={payment.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     style={{ color: (column.id === 'creditAmount' && '#00CE00') || (column.id === 'debitAmount' && 'red') }}
//                   >
//                     {column.id === 'date'
//                       ? new Date(payment[column.id]).toLocaleDateString('en-GB')
//                       : column.id === 'creditAmount' || column.id === 'debitAmount'
//                         ? payment[column.id] !== 0
//                           ? payment[column.id]
//                           : '-'
//                         : column.id === 'remainingBalance'
//                           ? parseFloat(payment.remainingBalance).toFixed(2)
//                           : column.id === 'vendor'
//                             ? payment.vendorData.vendorname
//                             : payment[column.id]}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={payments?.length || 0}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Card>
//   );
// };

// export default Ledgerlist;
import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableRow, TableCell, Card, TableHead, TableContainer, Grid, Paper, styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getallVendorledger } from 'store/thunk';

const columns = [
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'particulars', label: 'Particulars', align: 'center' },
  { id: 'vchType', label: 'Vch Type', align: 'center' },
  { id: 'vchNo', label: 'Vch No.', align: 'center' },
  { id: 'debitAmount', label: 'Debit', align: 'center' },
  { id: 'creditAmount', label: 'Credit', align: 'center' }
];

const CustomTableRow = styled(TableRow)({
  padding: '5px 0px'
});

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const Ledgerlist = () => {
  const dispatch = useDispatch();
  const [payments, setPayments] = useState([]);
  const [getdata, setGetdata] = useState({});
  const [gettodata, setGettodata] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totals, setTotals] = useState({ totalCredit: 0, totalDebit: 0 });
  const [closingBalance, setClosingBalance] = useState({ type: '', amount: 0 });
  const vendorId = sessionStorage.getItem('vendorId');
  const formData = sessionStorage.getItem('formDate');
  const toDate = sessionStorage.getItem('toDate');

  useEffect(() => {
    dispatch(getallVendorledger(vendorId, formData, toDate))
      .then((data) => {
        if (data && data.records) {
          const recordsArray = Object.values(data.records).flat();
          setPayments(recordsArray);
          setGetdata(data.form);
          setGettodata(data.to);
          setTotals({
            totalCredit: data.totals.totalCredit || 0,
            totalDebit: data.totals.totalDebit || 0
          });
          setClosingBalance(data.closingBalance);
          setTotalAmount(data.totalAmount);
        } else {
          console.error('Data or data.records is undefined.');
        }
      })
      .catch((error) => {
        console.error('Error fetching payment ledger data:', error);
      });
  }, [dispatch, vendorId, formData, toDate]);

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h6">From:</Typography>
          <Typography variant="h4">{getdata.companyname}</Typography>
          <Typography>{getdata.address1}</Typography>
          <Typography>
            {getdata.city}, {getdata.state}, {getdata.pincode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6">To:</Typography>
          <Typography variant="h4">{gettodata.accountname}</Typography>
          {/* <Typography>{gettodata.address1}</Typography>
          <Typography>
            {gettodata.city}, {gettodata.state}, {gettodata.pincode}
          </Typography> */}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            {formatDate(formData)} to {formatDate(toDate)}
          </Typography>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
            <TableRow sx={{ padding: '5px 0px' }}>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment, index) => (
              <CustomTableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ color: column.id === 'creditAmount' ? '#00CE00' : column.id === 'debitAmount' ? 'red' : 'inherit' }}
                  >
                    {column.id === 'creditAmount' && payment[column.id] !== 0 ? payment[column.id] : ''}
                    {column.id === 'debitAmount' && payment[column.id] !== 0 ? payment[column.id] : ''}
                    {column.id === 'date' && (index === 0 || payments[index - 1]?.date !== payment.date)
                      ? formatDate(payment[column.id])
                      : ''}
                    {column.id !== 'creditAmount' && column.id !== 'debitAmount' && column.id !== 'date' && payment[column.id]}
                  </TableCell>
                ))}
              </CustomTableRow>
            ))}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} align="right"></TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1" style={{ color: 'red' }}>
                  {totals.totalDebit.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1" style={{ color: '#00CE00' }}>
                  {totals.totalCredit.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            {closingBalance.type === 'credit' && (
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Closing Balance :</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="center" style={{ color: '#00CE00' }}>
                  {closingBalance.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            )}
            {closingBalance.type === 'debit' && (
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Closing Balance :</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="center" style={{ color: 'red' }}>
                  {closingBalance.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1">{totalAmount.toFixed(2)}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1">{totalAmount.toFixed(2)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default Ledgerlist;
