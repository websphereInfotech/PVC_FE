import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { createRecievecash, viewRecieveCash, updateRecieveCash, fetchAllCustomersCash } from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import AnchorTemporaryDrawer from 'component/customeradd';
import useCan from 'views/permission managenment/checkpermissionvalue';

const Paymentrecieve = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { canCreateCustomer } = useCan();
  const [customername, setcustomername] = useState('');
  const [customer, setcustomer] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectcustomer, setSelectcustomer] = useState([]);
  const [formData, setFormData] = useState({
    customerId: '',
    date: new Date(),
    amount: 0,
    description: ''
  });
  const [canCreateCustomerValue, setCanCreateCustomerValue] = useState(null);
  useEffect(() => {
    setCanCreateCustomerValue(canCreateCustomer());
  }, [canCreateCustomer]);
  console.log(selectcustomer);

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date });
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await dispatch(viewRecieveCash(id));
          const { date, amount, description, ReceiveCustomer } = response;
          setFormData({ date, amount, description, customerId: ReceiveCustomer.id });
          setcustomername(ReceiveCustomer.customername);
          setSelectcustomer(ReceiveCustomer.id);
        }
      } catch (error) {
        console.error('Error fetching payment recive:', error);
      }
    };
    const fetchCustomerData = async () => {
      try {
        const response = await dispatch(fetchAllCustomersCash());
        if (Array.isArray(response)) {
          const options = response.map((customer) => ({ value: customer.id, label: customer.customername }));
          setcustomer([{ value: 'new', label: 'Create New Customer' }, ...options]);
          if (!canCreateCustomerValue) {
            setcustomer(options);
          }
        }
      } catch (error) {
        console.error('Error fetching payment recieve cash:', error);
      }
    };
    fetchData();
    if (canCreateCustomerValue !== null) {
      fetchCustomerData();
    }
  }, [dispatch, id, canCreateCustomerValue]);
  //create new customer after show in dropdwon
  const handleNewCustomer = (newCustomerData) => {
    setcustomer((prevCustomers) => [...prevCustomers, { value: newCustomerData?.id, label: newCustomerData?.contactpersonname }]);
    setIsDrawerOpen(false);
  };
  const handlecreatepayment = async () => {
    try {
      if (id) {
        await dispatch(updateRecieveCash(id, formData, navigate));
      } else {
        await dispatch(createRecievecash(formData, navigate));
      }
    } catch (error) {
      console.error('Error creating payment recieve cash data:', error);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldName === 'amount' ? Number(value) : value
    }));
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Receipt Cash
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Receipt Cash
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
                Customer : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={customer}
                value={{ value: formData.customerId, label: customername }}
                onChange={handleSelectChange}
              />
            </Grid>
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onChangeCustomer={handleNewCustomer} />
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Amount : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter amount"
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
                <Link to="/paymentrecieveList" style={{ textDecoration: 'none' }}>
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
                <Link to="/paymentrecieveList" style={{ textDecoration: 'none' }}>
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

export default Paymentrecieve;
