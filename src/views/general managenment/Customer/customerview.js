import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Table, TableRow, TableCell, TableHead } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { viewCustomer } from 'store/thunk';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Customerview = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [bankDetails, setBankDetails] = useState(null);
  const [totalCredit, setTotalCredit] = useState(null);

  // Fetch customer data from API
  useEffect(() => {
    dispatch(viewCustomer(id))
      .then((response) => {
        const customerData = response;
        setData(customerData);
        if (customerData.bankdetail === true) {
          setBankDetails(customerData.bankdetails);
        }
        if (customerData.creditlimit) {
          setTotalCredit(customerData.totalCredit);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching User data:', error);
      });
  }, [dispatch, id, navigate]);

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Customer View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Account name</Typography>
          <Typography variant="subtitle2">{data?.accountname}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle2">{data?.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Mobile No.</Typography>
          <Typography variant="subtitle2">{data?.mobileno}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Contact Personname</Typography>
          <Typography variant="subtitle2">{data?.contactpersonname}</Typography>
        </Grid>
        {data?.creditlimit === true && (
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Total Credit</Typography>
            <Typography variant="subtitle2">{totalCredit}</Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Address 1</Typography>
          <Typography variant="subtitle2">{data?.address1}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Address 2</Typography>
          <Typography variant="subtitle2">{data?.address2}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Pincode</Typography>
          <Typography variant="subtitle2">{data?.pincode}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">State</Typography>
          <Typography variant="subtitle2">{data?.state}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">City</Typography>
          <Typography variant="subtitle2">{data?.city}</Typography>
        </Grid>
        <Grid item container>
          {data?.bankdetail === true && (
            <>
              <Table>
                <TableHead>
                  <TableCell>Bank Name</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>IFSC Code</TableCell>
                  <TableCell>Account Type</TableCell>
                </TableHead>
                <TableRow>
                  <TableCell>{bankDetails?.bankname}</TableCell>
                  <TableCell>{bankDetails?.accountnumber}</TableCell>
                  <TableCell>{bankDetails?.ifsccode}</TableCell>
                  <TableCell>{bankDetails?.accounttype}</TableCell>
                </TableRow>
              </Table>
            </>
          )}
        </Grid>
        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/userlist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/customerlist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Customerview;
