import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from '@mui/material';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { ApproveWallet, getallusers, getWallet } from 'store/thunk';

const Wallet = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [walletData, setWalletData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await dispatch(getallusers());
      if (Array.isArray(userResponse[0]?.users)) {
        const options = userResponse[0]?.users?.map((user) => ({
          value: user.id,
          label: user.username
        }));
        setUsers([...options]);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleUserSelectChange = (selectedOption) => {
    if (selectedOption) {
      setUserId(selectedOption.value);
      setUsername(selectedOption.label);
    }
  };

  const handleApply = async () => {
    try {
      const data = await dispatch(getWallet(userId, startDate, endDate));
      setWalletData(data);
    } catch (error) {
      console.log('fetch data of wallet:', error);
    }
  };

  const handleCancel = () => {
    setUserId(null);
    setUsername('');
    setStartDate(new Date());
    setEndDate(new Date());
    setWalletData([]);
  };

  const handleCheckboxChange = async (entry) => {
    if (entry.isApprove === false) {
      try {
        await dispatch(ApproveWallet(entry.id));
        const updatedData = await dispatch(getWallet(userId, startDate, endDate));
        setWalletData(updatedData);
      } catch (error) {
        console.error('Error approving transaction:', error);
      }
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" id="mycss">
            Wallet
          </Typography>
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{ display: 'flex', width: '80%' }}>
              <Select
                styles={{ container: (provided) => ({ ...provided, width: '100%' }) }}
                options={users}
                onChange={handleUserSelectChange}
                value={{ value: userId, label: username }}
                placeholder="Select User"
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Start Date"
              style={{ width: '100%' }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="End Date"
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button variant="contained" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Credit</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Debit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Grid container spacing={1}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={3} style={{ fontWeight: 'bold' }}>
                      Date
                    </Grid>
                    <Grid item xs={4} style={{ fontWeight: 'bold' }}>
                      Particulars
                    </Grid>
                    <Grid item xs={3} style={{ fontWeight: 'bold' }}>
                      Name
                    </Grid>
                    <Grid item xs={1} style={{ fontWeight: 'bold' }}>
                      Amount
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid container spacing={1}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={3} style={{ fontWeight: 'bold' }}>
                      Date
                    </Grid>
                    <Grid item xs={4} style={{ fontWeight: 'bold' }}>
                      Particulars
                    </Grid>
                    <Grid item xs={3} style={{ fontWeight: 'bold' }}>
                      Name
                    </Grid>
                    <Grid item xs={1} style={{ fontWeight: 'bold' }}>
                      Amount
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {walletData?.records?.map((entry, index) =>
                    entry.creditAmount ? (
                      <Grid container spacing={1} key={index}>
                        <Grid item xs={1}>
                          <Checkbox
                            checked={entry.isApprove === true}
                            disabled={entry.isApprove === true}
                            onClick={() => handleCheckboxChange(entry)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          {new Date(entry.date).toLocaleDateString('en-GB')}
                        </Grid>
                        <Grid item xs={4}>
                          {entry.particulars}
                        </Grid>
                        <Grid item xs={3}>
                          {entry.personName}
                        </Grid>
                        <Grid item xs={1}>
                          {entry.creditAmount}
                        </Grid>
                      </Grid>
                    ) : (
                      ''
                    )
                  )}
                </TableCell>
                <TableCell>
                  {walletData?.records?.map((entry, index) =>
                    entry.debitAmount ? (
                      <Grid container spacing={1} key={index}>
                        <Grid item xs={1}>
                          <Checkbox
                            checked={entry.isApprove === true}
                            disabled={entry.isApprove === true}
                            onClick={() => handleCheckboxChange(entry)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          {new Date(entry.date).toLocaleDateString('en-GB')}
                        </Grid>
                        <Grid item xs={4}>
                          {entry.particulars}
                        </Grid>
                        <Grid item xs={3}>
                          {entry.personName}
                        </Grid>
                        <Grid item xs={1}>
                          {entry.debitAmount}
                        </Grid>
                      </Grid>
                    ) : (
                      ''
                    )
                  )}
                </TableCell>
              </TableRow>

              {walletData?.totals && (
                <>
                  <TableRow>
                    <TableCell style={{ textAlign: 'end', fontWeight: 'bold' }}>Total: {walletData?.totals?.totalCredit}</TableCell>
                    <TableCell style={{ textAlign: 'end', fontWeight: 'bold' }}>Total: {walletData?.totals?.totalDebit}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: 'end', fontWeight: 'bold' }}>
                      Closing Balance: {walletData?.closingBalance?.amount}
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Wallet;
