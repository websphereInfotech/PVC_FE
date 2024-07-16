// import React, { useState, useEffect } from 'react';
// import {
//   Typography,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
//   Card,
//   TableHead,
//   TableContainer,
//   Grid,
//   Paper,
//   styled
// } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { getAllPaymentRecievebankLedger } from 'store/thunk';

// const columns = [
//   { id: 'date', label: 'Date', align: 'center' },
//   { id: 'particulars', label: 'Particulars', align: 'center' },
//   { id: 'vchType', label: 'Vch Type', align: 'center' },
//   { id: 'vchNo', label: 'Vch No.', align: 'center' },
//   { id: 'debitAmount', label: 'Debit', align: 'center' },
//   { id: 'creditAmount', label: 'Credit', align: 'center' }
// ];

// const CustomTableRow = styled(TableRow)({
//   padding: '5px 0px'
// });

// const formatDate = (dateString) => {
//   const options = { day: 'numeric', month: 'short', year: 'numeric' };
//   return new Date(dateString).toLocaleDateString('en-GB', options);
// };

// const Paymentbankrecieveledgerlist = () => {
//   const dispatch = useDispatch();
//   const [payments, setPayments] = useState({});
//   const [getdata, setGetdata] = useState({});
//   const [gettodata, setGettodata] = useState({});
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const customerId = sessionStorage.getItem('PRcustomerId');
//   const formData = sessionStorage.getItem('PRformDate');
//   const toDate = sessionStorage.getItem('PRtoDate');

//   useEffect(() => {
//     dispatch(getAllPaymentRecievebankLedger(customerId, formData, toDate))
//       .then((data) => {
//         setPayments(data.records);
//         setGetdata(data.form);
//         setGettodata(data.to);
//       })
//       .catch((error) => {
//         console.error('Error fetching vendor ledger data:', error);
//       });
//   }, [dispatch, customerId, formData, toDate]);

//   const renderTableBody = () => {
//     const dateKeys = Object.keys(payments);
//     const paginatedKeys = dateKeys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     return paginatedKeys.map((date) => {
//       const records = Array.isArray(payments[date]) ? payments[date] : [];
//       let isFirstRow = true; // Flag to track if it's the first row for the date

//       return (
//         <React.Fragment key={date}>
//           {records.map((payment) => (
//             <CustomTableRow key={payment.id}>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ color: (column.id === 'creditAmount' && '#00CE00') || (column.id === 'debitAmount' && 'red') }}
//                 >
//                   {column.id === 'date' && isFirstRow ? formatDate(date) : column.id === 'date' && isFirstRow ? payment[column.id] : ''}
//                   {column.id !== 'date' && payment[column.id]}
//                 </TableCell>
//               ))}
//               {isFirstRow && (isFirstRow = false)} {/* Reset isFirstRow flag after rendering the first row */}
//             </CustomTableRow>
//           ))}
//         </React.Fragment>
//       );
//     });
//   };

//   return (
//     <Card style={{ width: '100%', padding: '25px' }}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} align="center">
//           <Typography variant="h6">From:</Typography>
//           <Typography variant="h4">{getdata.companyname}</Typography>
//           <Typography>{getdata.address1}</Typography>
//           <Typography>
//             {getdata.city}, {getdata.state}, {getdata.pincode}
//           </Typography>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Typography variant="h6">To:</Typography>
//           <Typography variant="h4">{gettodata.accountname}</Typography>
//           <Typography>{gettodata.address1}</Typography>
//           <Typography>
//             {gettodata.city}, {gettodata.state}, {gettodata.pincode}
//           </Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="h6" align="center">
//             {formatDate(formData)} to {formatDate(toDate)}
//           </Typography>
//         </Grid>
//       </Grid>

//       <TableContainer component={Paper}>
//         <Table style={{ border: '1px solid lightgrey' }}>
//           <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
//             <TableRow sx={{ padding: '5px 0px' }}>
//               {columns.map((column) => (
//                 <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>{renderTableBody()}</TableBody>
//         </Table>
//       </TableContainer>
//     </Card>
//   );
// };

// export default Paymentbankrecieveledgerlist;
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TableHead,
  TableContainer,
  Grid,
  Paper,
  styled,
  Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { BankCustomerPDF, getAllPaymentRecievebankLedger } from 'store/thunk';

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

const Paymentbankrecieveledgerlist = () => {
  const dispatch = useDispatch();
  const [payments, setPayments] = useState([]);
  const [getdata, setGetdata] = useState({});
  const [gettodata, setGettodata] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totals, setTotals] = useState({ totalCredit: 0, totalDebit: 0 });
  const [closingBalance, setClosingBalance] = useState({ type: '', amount: 0 });
  const customerId = sessionStorage.getItem('PRcustomerId');
  const formData = sessionStorage.getItem('PRformDate');
  const toDate = sessionStorage.getItem('PRtoDate');

  useEffect(() => {
    dispatch(getAllPaymentRecievebankLedger(customerId, formData, toDate))
      .then((data) => {
        console.log(data); // Check the structure of data returned
        if (data && data.records) {
          const recordsArray = Object.values(data.records).flat(); // Flatten array of arrays
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
  }, [dispatch, customerId, formData, toDate]);

  const downloadpdf = () => {
    try {
      dispatch(BankCustomerPDF(customerId, formData, toDate));
    } catch (error) {
      console.error('Error fetching pdf:', error);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} align="end">
          <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={downloadpdf}>
            Download PDF
          </Button>
        </Grid>
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
          <Typography>{gettodata.address1}</Typography>
          <Typography>
            {gettodata.city}, {gettodata.state}, {gettodata.pincode}
          </Typography>
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
                <TableCell></TableCell>
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

export default Paymentbankrecieveledgerlist;
