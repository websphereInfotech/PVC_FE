import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import {
  createPaymentRecieveBank,
  fetchAllCompanyBank,
  fetchAllCustomers,
  updatePaymentRecievebank,
  viewSinglePaymentRecieveBank
} from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AnchorTemporaryDrawer from '../../../component/customeradd';
import Select from 'react-select';
import useCan from 'views/permission managenment/checkpermissionvalue';

const Paymentrecievebank = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { canCreateCustomer } = useCan();
  const [customername, setcustomername] = useState('');
  const [companyname, setcompanyname] = useState('');
  const [customer, setcustomer] = useState([]);
  const [account, setAccount] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectcustomer, setSelectcustomer] = useState([]);
  const [selectaccount, setSelectaccount] = useState([]);
  const [formData, setFormData] = useState({
    customerId: '',
    paymentdate: new Date(),
    amount: 0,
    referance: '',
    mode: '',
    accountId: '',
    voucherno: ''
  });
  console.log(selectcustomer, selectaccount);
  const [canCreateCustomerValue, setCanCreateCustomerValue] = useState(null);
  useEffect(() => {
    setCanCreateCustomerValue(canCreateCustomer());
  }, [canCreateCustomer]);

  const handleDateChange = (date) => {
    setFormData({ ...formData, paymentdate: date });
  };
  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Customer') {
      setIsDrawerOpen(true);
    } else {
      formData.customerId = selectedOption.value;
      setFormData(formData);
      setcustomername(selectedOption.label);
      setIsDrawerOpen(false);
    }
  };
  const handleSelectAccountChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      formData.accountId = selectedOption.value;
      setFormData(formData);
      setcompanyname(selectedOption.label);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllCustomers());
        if (Array.isArray(response)) {
          const options = response.map((customer) => ({ value: customer.id, label: customer.accountname }));
          setcustomer([{ value: 'new', label: 'Create New Customer' }, ...options]);
        }
        if (!canCreateCustomerValue) {
          setcustomer(options);
        }
        const responsecompany = await dispatch(fetchAllCompanyBank());
        if (Array.isArray(responsecompany)) {
          const options = responsecompany.map((company) => ({ value: company.id, label: company.accountname }));
          setAccount(options);
        }
      } catch (error) {
        console.error('Error fetching payment recieve bank:', error);
      }
    };
    const viewData = async () => {
      try {
        if (id) {
          const response = await dispatch(viewSinglePaymentRecieveBank(id));
          const { voucherno, mode, referance, amount, receiveBank, customerBank, paymentdate } = response;
          setFormData({
            voucherno,
            mode,
            referance,
            amount,
            customerId: customerBank.id,
            accountId: receiveBank.id,
            paymentdate
          });
          setcompanyname(receiveBank.accountname);
          setcustomername(customerBank.accountname);
          setSelectaccount(receiveBank.id);
          setSelectcustomer(customerBank.id);
        }
      } catch (error) {
        console.error('Error fetching payment recieve bank:', error);
      }
    };
    if (canCreateCustomerValue !== null) {
      fetchData();
    }
    viewData();
  }, [dispatch, id, canCreateCustomerValue]);

  const handlecreatePaymentCash = async () => {
    try {
      if (id) {
        await dispatch(updatePaymentRecievebank(id, formData, navigate));
      } else {
        await dispatch(createPaymentRecieveBank(formData, navigate));
      }
    } catch (error) {
      console.error('Error creating payment bank data:', error);
    }
  };

  // const handleInputChange = (fieldName, value) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [fieldName]: value
  //   }));
  // };
  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldName === 'amount' ? Number(value) : value
    }));
  };
  const handlePaymentChange = (selectedOption) => {
    setFormData({ ...formData, mode: selectedOption.value });
  };

  const Options = [
    { value: 'Cheque', label: 'Cheque' },
    { value: 'Net Banking', label: 'Net Banking' },
    { value: 'Cash', label: 'Cash' },
    { value: 'UPI', label: 'UPI' },
    { value: 'IMPS', label: 'IMPS' },
    { value: 'NEFT', label: 'NEFT' },
    { value: 'RTGS', label: 'RTGS' },
    { value: 'Debit card', label: 'Debit card' },
    { value: 'Credit card', label: 'Credit card' },
    { value: 'Other', label: 'Other' }
  ];
  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Payment Receive Bank
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Payment Receive Bank
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker id="date" selected={formData.paymentdate} onChange={(date) => handleDateChange(date)} dateFormat="dd/MM/yyyy" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Customer : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={customer}
                value={{ value: formData.customerId, label: customername }}
                onChange={handleSelectChange}
              />
            </Grid>
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Account : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={account}
                value={{ value: formData.accountId, label: companyname }}
                onChange={handleSelectAccountChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Voucher No.:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter voucherno"
                id="voucherno"
                value={formData.voucherno}
                onChange={(e) => handleInputChange('voucherno', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Referance :<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter referance"
                id="referance"
                value={formData.referance}
                onChange={(e) => handleInputChange('referance', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Amount : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Amount"
                // type="number"
                id="amount"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Mode :<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select options={Options} value={Options.find((option) => option.value === formData.mode)} onChange={handlePaymentChange} />
            </Grid>
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/paymentrecievebanklist" style={{ textDecoration: 'none' }}>
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
                <Link to="/paymentrecievebanklist" style={{ textDecoration: 'none' }}>
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

export default Paymentrecievebank;
