import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { createClaimcash, fetchAllCompanyBank, getallclaimuser, updateClaimCash, viewSingleclaimCash } from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AnchorVendorDrawer from '../../component/vendor';
import Select from 'react-select';

const Addemployee = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [username, setusername] = useState('');
  const [user, setuser] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    toUserId: '',
    amount: Number(),
    accountId: '',
    paymenttype: ''
  });
  const [companyname, setcompanyname] = useState('');
  const [account, setAccount] = useState([]);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      formData.toUserId = selectedOption.value;
      setFormData(formData);
      setusername(selectedOption.label);
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getallclaimuser());
        if (Array.isArray(response)) {
          console.log(response, 'res');
          const options = response.map((user) => ({ value: user.users.id, label: user.users.username }));
          setuser([...options]);
        }
      } catch (error) {
        console.error('Error fetching cliam Cash:', error);
      }
    };
    const viewData = async () => {
      try {
        if (id) {
          const response = await dispatch(viewSingleclaimCash(id));
          const { amount, description, toUser, purpose } = response;
          console.log(response, 'response');
          setFormData({ amount, description, purpose, toUserId: toUser.id });

          setusername(toUser.username);
          setSelectuser(toUser.id);
        }
      } catch (error) {
        console.error('Error fetching cliam:', error);
      }
    };
    const accountdata = async () => {
      try {
        const responsecompany = await dispatch(fetchAllCompanyBank());
        if (Array.isArray(responsecompany)) {
          const options = responsecompany.map((company) => ({ value: company.id, label: company.bankname }));
          setAccount([...options]);
        }
      } catch (error) {
        console.error('not fetch bank accounts', error);
      }
    };
    // const useraccountdata = async () => {
    //   try {
    //     const responsecompany = await dispatch(fetchAllUserBank());
    //     if (Array.isArray(responsecompany)) {
    //       const options = responsecompany.map((user) => ({ value: user.id, label: user.bankname }));
    //       setAccount([...options]);
    //     }
    //   } catch (error) {
    //     console.error('not fetch bank accounts', error);
    //   }
    // };
    accountdata();
    viewData();
    fetchData();
  }, [dispatch, id]);
  const handleSelectAccountChange = (selectedOption) => {
    console.log(selectedOption, 'selectedOption');
    if (selectedOption && selectedOption.label) {
      formData.accountId = selectedOption.value;
      setFormData(formData);
      setcompanyname(selectedOption.label);
    }
  };

  const handlecreatePaymentCash = async () => {
    try {
      if (id) {
        await dispatch(updateClaimCash(id, formData, navigate));
      } else {
        await dispatch(createClaimcash(formData, navigate));
      }
    } catch (error) {
      console.error('Error creating cliam cash data:', error);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };
  const handlepaymenttypeChange = (selectedOption) => {
    setFormData({ ...formData, paymenttype: selectedOption.value });
  };

  const paymenttypeOptions = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Bank', label: 'Bank' }
  ];
  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Pay Salary
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Pay Salary
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
                options={user}
                value={{ value: formData.toUserId, label: username }}
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
              <Typography variant="subtitle1">
                Company Account : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
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
                Employee Account : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
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
                Payment Type: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                options={paymenttypeOptions}
                value={paymenttypeOptions.find((option) => option.value === formData.paymenttype)}
                onChange={handlepaymenttypeChange}
              />
            </Grid>
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/employeedirectory" style={{ textDecoration: 'none' }}>
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
                <Link to="/employeedirectory" style={{ textDecoration: 'none' }}>
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

export default Addemployee;
