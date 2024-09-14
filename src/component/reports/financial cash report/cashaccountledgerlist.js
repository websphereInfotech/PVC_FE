import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableRow, TableCell, Card, TableHead, TableContainer, Grid, Paper, styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getallCashAccountledger } from 'store/thunk';
import { useNavigate } from 'react-router';

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

const Cashaccountledgerlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [yearData, setYearData] = useState({});
  const [getdata, setGetdata] = useState({});
  const [gettodata, setGettodata] = useState({});

  const AccountId = sessionStorage.getItem('RCAccountId');
  const formData = sessionStorage.getItem('RCAccountformDate');
  const toDate = sessionStorage.getItem('RCAccounttoDate');

  useEffect(() => {
    dispatch(getallCashAccountledger(AccountId, formData, toDate))
      .then((data) => {
        if (data) {
          setYearData(data.years || {});
          setGetdata(data.form);
          setGettodata(data.to);
        } else {
          console.error('Data is undefined.');
          if (error.response.status === 401) {
            navigate('/');
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching payment ledger data:', error);
      });
  }, [dispatch, AccountId, formData, toDate, navigate]);

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
          <Typography variant="h4">{gettodata.accountName}</Typography>
          <Typography>{gettodata.address1}</Typography>
          <Typography>
            {gettodata.city} {gettodata.state} {gettodata.pincode}
          </Typography>
        </Grid>
      </Grid>

      {Object.entries(yearData).map(([year, data]) => (
        <React.Fragment key={year}>
          <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
            {data.dateRange}
          </Typography>
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
                {console.log(data.records, 'recoderd')}
                {Object.entries(data.records).map(([date, records]) =>
                  Array.isArray(records) ? (
                    records.map((record, idx) => (
                      <CustomTableRow key={`${date}-${idx}`}>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              color: column.id === 'creditAmount' ? '#00CE00' : column.id === 'debitAmount' ? 'red' : 'inherit'
                            }}
                          >
                            {column.id === 'creditAmount' && record[column.id] !== 0 ? record[column.id] : ''}
                            {column.id === 'debitAmount' && record[column.id] !== 0 ? record[column.id] : ''}
                            {column.id === 'date' && (idx === 0 || records[idx - 1]?.date !== record.date)
                              ? formatDate(record[column.id])
                              : ''}
                            {column.id !== 'creditAmount' && column.id !== 'debitAmount' && column.id !== 'date' && record[column.id]}
                          </TableCell>
                        ))}
                      </CustomTableRow>
                    ))
                  ) : (
                    <TableRow key={''}>
                      <TableCell colSpan={columns.length} align="center">
                        No records available
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
              <TableBody>
                {data.closingBalance.type === 'credit' && (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">Closing Balance :</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center" style={{ color: '#00CE00' }}>
                      {data.closingBalance.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                )}
                {data.closingBalance.type === 'debit' && (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">Closing Balance :</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center" style={{ color: 'red' }}>
                      {data.closingBalance.amount.toFixed(2)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={4} align="right"></TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: 'red' }}>
                      {data.totals.totalDebit.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: '#00CE00' }}>
                      {data.totals.totalCredit.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      ))}
    </Card>
  );
};

export default Cashaccountledgerlist;
