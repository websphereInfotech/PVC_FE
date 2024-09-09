import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { createClaimcash, fetchAllWastage, getallclaimuser, updateClaimCash, viewSingleclaimCash } from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AnchorTemporaryDrawer from '../../../component/addparty';
import Select from 'react-select';
import Purpose from 'component/purposecliam';

const Cliamcashpage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [username, setusername] = useState('');
  const [user, setuser] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const fromUserId = sessionStorage.getItem('userId');
  const [purposeOptions, setpurposeOptions] = React.useState([]);
  const [purposename, setpurposename] = React.useState('');
  const [purposeDrawerOpen, setpurposeDrawerOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    toUserId: '',
    fromUserId,
    amount: Number(),
    description: '',
    purposeId: ''
  });

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
    const wastage = async () => {
      try {
        const wastage = await dispatch(fetchAllWastage());
        if (Array.isArray(wastage)) {
          const options = wastage.map((product) => ({
            value: product.id,
            label: product.name
          }));
          setpurposeOptions([{ value: 'new_group', label: 'Create New Purpose' }, ...options]);
          if (!canCreateWastagevalue) {
            setpurposeOptions(options);
          }
        }
      } catch (error) {
        console.log(error, 'fetch item Group');
      }
    };
    wastage();
    viewData();
    fetchData();
  }, [dispatch, id]);

  const handleNewgroupadded = (newWastage) => {
    const updatedwastagelist = [
      ...purposeOptions,
      {
        value: newWastage.id,
        label: newWastage.name
      }
    ];
    setpurposeOptions(updatedwastagelist);
    setpurposeDrawerOpen(false);
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
  const handlepurposeChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Purpose') {
      setpurposeDrawerOpen(true);
    } else {
      setpurposename(selectedOption.label);
      setFormData({ ...formData, purposeId: selectedOption.value });
    }
  };
  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Demand Cash
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Demand Cash
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
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
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

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Wastage :<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                id="itemgroup"
                options={purposeOptions}
                value={{ value: formData.purposeId, label: purposename }}
                onChange={(selectedOption) => handlepurposeChange(selectedOption)}
                styles={{
                  container: (base) => ({
                    ...base,
                    width: '80%'
                  })
                }}
              />
              <Purpose
                anchor="Right"
                onnewadded={handleNewgroupadded}
                open={purposeDrawerOpen}
                onClose={() => setpurposeDrawerOpen(false)}
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
