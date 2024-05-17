import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { createPayment, paymentview, updatePayment } from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PaymentPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    vendor: '',
    // date: '',
    amount: '',
    description: ''
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",id);
          const viewPayment = await dispatch(paymentview(id));
          setFormData(viewPayment);
          // console.log(viewPayment);
        }
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    };
    fetchData();
  }, [dispatch, id]);
  const handlecreatepayment = async () => {
    try {
      if (id) {
        await dispatch(updatePayment(id, formData));
        // console.log('update', upadtePaymentData);
        navigate('/paymentlist');
      } else {
        await dispatch(createPayment(formData));
        // console.log('data>>>>', Paymentdata);
        navigate('/paymentlist');
      }
    } catch (error) {
      console.error('Error creating Paymentdata:', error);
      alert('Failed to create Paymentdata');
    }
  };
  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Payment Cash
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Payment Cash
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker selected={formData.date} onChange={(date) => handleCreditDateChange(date)} dateFormat="dd/MM/yyyy" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Vendor : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                color="secondary"
                id="voucherno"
                value={formData.voucherno}
                onChange={(e) => handleInputChange('voucherno', e.target.value)}
              />
            </Grid>
            {/* <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} /> */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Amount : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">description :</Typography>
              <input
                placeholder="Enter description"
                id="account"
                value={formData.account}
                onChange={(e) => handleInputChange('account', e.target.value)}
              />
            </Grid>
          </Grid>

          {/* <Grid item xs={12}>
            {isMobile ? (
              // For mobile screens, show each total on separate lines
              <>
                <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <p>AMOUNT TO CREDIT</p>
                  <p>₹0.00</p>
                </div>
                <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <p>AMOUNT TO APPLY</p>
                  <p>₹0.00</p>
                </div>
              </>
            ) : (
              // For larger screens, show all totals on one line
              <div style={{ float: 'right', width: '30%' }}>
                <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                  <p>AMOUNT TO CREDIT</p>
                  <p>₹0.00</p>
                </div>
                <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                  <p>AMOUNT TO APPLY</p>
                  <p>₹0.00</p>
                </div>
              </div>
            )}
          </Grid> */}

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/paymentlist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
                <button id="savebtncs" onClick={handlecreatepayment}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/paymentlist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handlecreatepayment}>
                  Save
                </button>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </Paper>
  );
};

export default PaymentPage;
