import React, { useState } from 'react';
import { Button, Grid, Typography, Table, TableBody, TableRow, TableCell, TableHead, useMediaQuery, Paper } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { getallCashbookledger } from 'store/thunk';

const CashbookReport = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();

  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const [payments, setPayments] = useState([]);
  const [getdata, setGetdata] = useState({});
  const [showData, setShowData] = useState(false);

  const handleformDateChange = (date) => {
    setFormDate(date);
  };

  const handletoDateChange = (date) => {
    setToDate(date);
  };

  const handleLedger = (formDate, toDate) => {
    const formattedFormDate = formatDateForApi(formDate);
    const formattedToDate = formatDateForApi(toDate);

    dispatch(getallCashbookledger(formattedFormDate, formattedToDate))
      .then((data) => {
        if (data && data.records) {
          setPayments(data);
          setGetdata(data.form);
          setShowData(true);
        } else {
          console.error('Data or data.records is undefined.');
        }
      })
      .catch((error) => {
        console.error('Error fetching payment ledger data:', error);
      });
  };

  const formatDateForApi = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateForDisplay = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" gutterBottom id="mycss">
        Cash Book Report
      </Typography>
      <Grid container style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={3} sm={6}>
          <Typography variant="subtitle1">From Date:</Typography>
          <DatePicker selected={formDate} onChange={handleformDateChange} dateFormat="dd/MM/yyyy" />
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <Typography variant="subtitle1">To Date:</Typography>
          <DatePicker selected={toDate} onChange={handletoDateChange} dateFormat="dd/MM/yyyy" />
        </Grid>
        <Grid item xs={12} md={3} sm={6} alignContent={'center'} sx={{ marginTop: '10px' }}>
          <Button onClick={() => handleLedger(formDate, toDate)} variant="contained" color="secondary">
            GO
          </Button>
        </Grid>
      </Grid>

      {showData && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} align="center">
              <Typography variant="h6">From:</Typography>
              <Typography variant="h4">{getdata.companyname}</Typography>
              <Typography>{getdata.address1}</Typography>
              <Typography>
                {getdata.city}, {getdata.state}, {getdata.pincode}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                {formatDateForDisplay(formDate)} to {formatDateForDisplay(toDate)}
              </Typography>
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: '20px', overflowY: 'scroll' }}>
            <Grid item xs={12} md={6} sx={{ borderRight: { xs: 'none', md: '1px solid #ccc' }, paddingRight: { md: '16px' } }}>
              <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                Credit
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Amount</TableCell>
                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Particulars</TableCell>
                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payments?.records
                    ?.filter((entry) => entry.creditAmount)
                    .map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell style={{ textAlign: 'center' }}>{entry.creditAmount}</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>{entry.personName}</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>{entry.details}</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>{new Date(entry.date).toLocaleDateString('en-GB')}</TableCell>
                      </TableRow>
                    ))}
                  {payments?.totals && (
                    <TableRow>
                      <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                        Total Credit: {payments?.totals?.totalCredit}
                      </TableCell>
                    </TableRow>
                  )}
                  {payments?.closingBalance && payments?.closingBalance.type === 'credit' && (
                    <TableRow>
                      <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                        Closing Balance: {payments?.closingBalance?.amount}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={12} md={6} sx={{ paddingLeft: { md: '16px' } }}>
              <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: isMobile ? '20px' : '0px' }}>
                Debit
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Amount</TableCell>
                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Particulars</TableCell>
                    <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payments?.records
                    ?.filter((entry) => entry.debitAmount)
                    .map((entry, index) => (
                      <TableRow key={index} style={{ textAlign: 'center' }}>
                        <TableCell style={{ textAlign: 'center' }}>{entry.debitAmount}</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>{entry.personName}</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>{entry.details}</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>{new Date(entry.date).toLocaleDateString('en-GB')}</TableCell>
                      </TableRow>
                    ))}
                  {payments?.totals && (
                    <TableRow>
                      <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                        Total Debit: {payments?.totals?.totalDebit}
                      </TableCell>
                    </TableRow>
                  )}
                  {payments?.closingBalance && payments?.closingBalance.type === 'debit' && (
                    <TableRow>
                      <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                        Closing Balance: {payments?.closingBalance?.amount}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </>
      )}
      {/* </Card> */}
    </Paper>
  );
};

export default CashbookReport;
