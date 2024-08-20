import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from '@mui/material';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { getallusers, getWallet } from 'store/thunk';

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
      setWalletData(data.records); // Assuming the fetched data is an array of objects
    } catch (error) {
      console.log('fetch data of wallet:', error);
    }
  };

  const handleCancel = () => {
    setUserId(null);
    setUsername('');
    setStartDate(new Date());
    setEndDate(new Date());
    setWalletData([]); // Clear the displayed data
  };

  return (
    <Paper style={{ padding: '20px' }}>
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
            </TableHead>
            <TableBody>
              {walletData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell style={{ verticalAlign: 'top' }}>
                    {entry.creditAmount && (
                      <Grid container spacing={1}>
                        <Grid item xs={1}>
                          <Checkbox />
                        </Grid>
                        <Grid item xs={5}>
                          {entry.date}
                        </Grid>
                        <Grid item xs={5}>
                          {entry.particulars}
                        </Grid>
                        <Grid item xs={1}>
                          {entry.amount}
                        </Grid>
                      </Grid>
                    )}
                  </TableCell>
                  <TableCell style={{ verticalAlign: 'top' }}>
                    {entry.debitAmount && (
                      <Grid container spacing={1}>
                        <Grid item xs={1}>
                          <Checkbox />
                        </Grid>
                        <Grid item xs={5}>
                          {entry.date}
                        </Grid>
                        <Grid item xs={5}>
                          {entry.particulars}
                        </Grid>
                        <Grid item xs={1}>
                          {entry.amount}
                        </Grid>
                      </Grid>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Wallet;
