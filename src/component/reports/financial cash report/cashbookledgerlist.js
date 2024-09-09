import { Typography, Table, TableBody, TableRow, TableCell, Card, TableHead, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { getallCashbookledger } from 'store/thunk';

const formatDate = (dateString) => {
  if (!dateString) {
    console.error('Date string is undefined or empty:', dateString);
    return 'Invalid Date';
  }
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error('Invalid date format:', dateString);
    return 'Invalid Date';
  }

  return date.toLocaleDateString('en-GB', options);
};

const Cashbookledgerlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payments, setPayments] = useState({});
  const [getdata, setGetdata] = useState({});
  const formData = sessionStorage.getItem('RCashbookformDate');
  const toDate = sessionStorage.getItem('RCashbooktoDate');

  useEffect(() => {
    dispatch(getallCashbookledger(formData, toDate))
      .then((data) => {
        setPayments(data.records || {});
        setGetdata(data.form);
      })
      .catch((error) => {
        console.error('Error fetching payment ledger data:', error);
        if (error.response.status === 401) {
          navigate('/');
        }
      });
  }, [dispatch, formData, toDate, navigate]);

  const renderRecordsByDate = (date, data) => {
    const { totals, closingBalance, records } = data;
    return (
      <Grid container spacing={2} key={date} style={{ marginBottom: '20px' }}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            Date: {formatDate(date)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
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
              {records &&
                records
                  .filter((entry) => entry.creditAmount > 0)
                  .map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ textAlign: 'center' }}>{entry.creditAmount}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{entry.personName}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{entry.details}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{new Date(entry.date).toLocaleDateString('en-GB')}</TableCell>
                    </TableRow>
                  ))}
              {totals && (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                    Total Credit: {totals.totalCredit}
                  </TableCell>
                </TableRow>
              )}
              {closingBalance && closingBalance.type === 'credit' && (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                    Closing Balance: {closingBalance.amount}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
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
              {records &&
                records
                  .filter((entry) => entry.debitAmount > 0)
                  .map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ textAlign: 'center' }}>{entry.debitAmount}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{entry.personName}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{entry.details}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{new Date(entry.date).toLocaleDateString('en-GB')}</TableCell>
                    </TableRow>
                  ))}
              {totals && (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                    Total Debit: {totals.totalDebit}
                  </TableCell>
                </TableRow>
              )}
              {closingBalance && closingBalance.type === 'debit' && (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                    Closing Balance: {closingBalance.amount}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  };

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
      </Grid>

      <Grid container style={{ marginTop: '20px', overflowY: 'scroll' }}>
        {Object.entries(payments).map(([date, data]) => renderRecordsByDate(date, data))}
      </Grid>
    </Card>
  );
};

export default Cashbookledgerlist;
