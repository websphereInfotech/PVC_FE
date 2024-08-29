import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableRow, TableCell, Card, TableHead, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getallCashbookledger } from 'store/thunk';

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const Cashbookledgerlist = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [payments, setPayments] = useState([]);
  const [getdata, setGetdata] = useState({});
  const formData = sessionStorage.getItem('RCashbookformDate');
  const toDate = sessionStorage.getItem('RCashbooktoDate');

  useEffect(() => {
    dispatch(getallCashbookledger(formData, toDate))
      .then((data) => {
        if (data && data.records) {
          setPayments(data);
          setGetdata(data.form);
        } else {
          console.error('Data or data.records is undefined.');
        }
      })
      .catch((error) => {
        console.error('Error fetching payment ledger data:', error);
      });
  }, [dispatch, formData, toDate]);

  // const downloadpdf = () => {
  //   try {
  //     dispatch(BankCustomerPDF(formData, toDate));
  //   } catch (error) {
  //     console.error('Error fetching pdf:', error);
  //   }
  // };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} align="end">
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: '16px' }}
            onClick={downloadpdf}
            disabled={!canDownloadPdfBankCustomer()}
          >
            Download PDF
          </Button>
        </Grid> */}
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
            {formatDate(formData)} to {formatDate(toDate)}
          </Typography>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: '20px', overflowY: 'scroll' }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            borderRight: { xs: 'none', md: '1px solid #ccc' },
            paddingRight: { md: '16px' }
          }}
        >
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
                    Total Credit:{payments?.totals?.totalCredit}
                  </TableCell>
                </TableRow>
              )}
              {payments?.closingBalance && payments?.closingBalance.type === 'credit' && (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                    Closing Balance:{payments?.closingBalance?.amount}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>

        <Grid item xs={12} md={6} sx={{ paddingLeft: { md: '16px' } }}>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: isSmallScreen ? '20px' : '0px' }}>
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
                    Total Debit:{payments?.totals?.totalDebit}
                  </TableCell>
                </TableRow>
              )}
              {payments?.closingBalance && payments?.closingBalance.type === 'debit' && (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                    Closing Balance:{payments?.closingBalance?.amount}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Cashbookledgerlist;
