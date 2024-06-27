import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { createPaymentCash, fetchAllVendorsCash, paymentCashview, updatePaymentCash } from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AnchorVendorDrawer from '../../../component/vendor';
import Select from 'react-select';
import useCan from 'views/permission managenment/checkpermissionvalue';

const PaymentPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { canCreateVendor } = useCan();
  const [vendorname, setvendorname] = useState('');
  const [vendor, setvendor] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectvendor, setSelectvendor] = useState([]);
  const [formData, setFormData] = useState({
    vendorId: '',
    date: new Date(),
    amount: Number(),
    description: ''
  });
  console.log(selectvendor);
  const [canCreateVendorValue, setCanCreateVendorValue] = useState(null);
  useEffect(() => {
    setCanCreateVendorValue(canCreateVendor());
  }, [canCreateVendor]);

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date });
  };
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
        if (!canCreateVendorValue) {
          setvendor(options);
        }
      } catch (error) {
        console.error('Error fetching payment cash:', error);
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
        console.error('Error fetching payment cash:', error);
      }
    };
    if (canCreateVendorValue !== null) {
      fetchData();
    }
    viewData();
  }, [dispatch, id, canCreateVendorValue]);

  //create new Vendor after show in dropdwon
  const handleNewVendor = (newVendorData) => {
    setvendor((prevVendor) => [
      ...prevVendor,
      {
        value: newVendorData?.data?.id,
        label: newVendorData?.data?.contactpersonname
      }
    ]);
    setIsDrawerOpen(false);
  };
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
              <DatePicker id="date" selected={formData.date} onChange={(date) => handleDateChange(date)} dateFormat="dd/MM/yyyy" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Vendor : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={vendor}
                value={{ value: formData.vendorId, label: vendorname }}
                onChange={handleSelectChange}
              />
            </Grid>
            <AnchorVendorDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onChangeVendor={handleNewVendor} />
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
                <Link to="/paymentCashlist" style={{ textDecoration: 'none' }}>
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
                <Link to="/paymentCashlist" style={{ textDecoration: 'none' }}>
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

export default PaymentPage;
