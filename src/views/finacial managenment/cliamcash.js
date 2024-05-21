import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { createPaymentCash, fetchAllVendorsCash, paymentCashview, updatePaymentCash } from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AnchorVendorDrawer from '../../component/vendor';
import Select from 'react-select';

const Cliamcashpage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [vendorname, setvendorname] = useState('');
  const [vendor, setvendor] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectvendor, setSelectvendor] = useState([]);
  const [formData, setFormData] = useState({
    vendorId: '',
    amount: Number(),
    description: ''
  });
  console.log(selectvendor);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Vendor') {
      setIsDrawerOpen(true);
    } else {
      formData.vendorId = selectedOption.value;
      setFormData(formData);
      setvendorname(selectedOption.label);
      setIsDrawerOpen(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllVendorsCash());
        if (Array.isArray(response)) {
          const options = response.map((vendor) => ({ value: vendor.id, label: vendor.vendorname }));
          setvendor([{ value: 'new', label: 'Create New Vendor' }, ...options]);
        }
      } catch (error) {
        console.error('Error fetching payment Cash:', error);
      }
    };
    const viewData = async () => {
      try {
        if (id) {
          const response = await dispatch(paymentCashview(id));
          const { amount, description, PaymentVendor, date } = response;
          setFormData({ amount, description, vendorId: PaymentVendor.id, date });

          setvendorname(PaymentVendor.vendorname);
          setSelectvendor(PaymentVendor.id);
        }
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    };
    viewData();
    fetchData();
  }, [dispatch, id]);

  const handlecreatePaymentCash = async () => {
    try {
      if (id) {
        await dispatch(updatePaymentCash(id, formData, navigate));
      } else {
        await dispatch(createPaymentCash(formData, navigate));
      }
    } catch (error) {
      console.error('Error creating payment cash data:', error);
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
            Update Cliam Cash
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Cliam Cash
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                User : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={vendor}
                value={{ value: formData.vendorId, label: vendorname }}
                onChange={handleSelectChange}
              />
            </Grid>
            <AnchorVendorDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Amount : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Amount"
                id="amount"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">description :</Typography>
              <input
                placeholder="Enter description"
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </Grid>
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/claimcashlist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
                <button id="savebtncs" onClick={handlecreatePaymentCash}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/claimcashlist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handlecreatePaymentCash}>
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

export default Cliamcashpage;
