import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel, Card, Paper } from '@mui/material';
import { createCustomer, createCustomfeild } from '../store/thunk';

const AnchorTemporaryDrawer = ({ open, onClose }) => {
  AnchorTemporaryDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  const dispatch = useDispatch();

  // State for radio buttons
  const [bankdetail, setBankDetail] = React.useState(true);
  const [creditlimit, setCreditlimit] = React.useState(false);
  const [customFields, setCustomFields] = React.useState([{ label: '', value: '' }]);
  // State for input fields
  const [formData, setFormData] = React.useState({
    accountname: '',
    shortname: '',
    email: '',
    contactpersonname: '',
    mobileno: '',
    panno: '',
    creditperiod: '',
    mode: '',
    address1: '',
    address2: '',
    pincode: '',
    state: '',
    city: '',
    country: '',
    balance: ''
  });

  const emailRef = React.useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleAddCustomField = () => {
    const newCustomFields = [...customFields, { label: '', value: '' }];
    setCustomFields(newCustomFields);
  };
  const handleDeleteCustomField = (index) => {
    const updatedCustomFields = [...customFields];
    updatedCustomFields.splice(index, 1);
    setCustomFields(updatedCustomFields);
  };

  const handleBankDetailChange = (event) => {
    setBankDetail(event.target.value === 'true' ? true : false);
  };

  const handleCreditDetailChange = (event) => {
    setCreditlimit(event.target.value === 'true' ? true : false);
  };

  const handleSave = async () => {
    try {
      const customerData = {
        ...formData,
        bankdetail: bankdetail,
        creditlimit: creditlimit
      };
      // console.log(customerData, 'formdata');
      const data = await dispatch(createCustomer(customerData));
      const customerId = data.data.data.id;
      //  console.log("id",customerId);
      const payload = {
        customerId,
        items: customFields.map((row) => ({
          label: row.label,
          value: row.value
        }))
      };
      //  console.log("plyload",payload);
      dispatch(createCustomfeild(payload));
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 15px',
          position: 'fixed',
          zIndex: '999',
          width: { xs: '100%', sm: '550px' }
        }}
      >
        <Grid item>
          <Typography variant="h4" className="heading">
            New Customer (Sundry Debtors)
          </Typography>
        </Grid>
        <Grid item>
          <CancelIcon onClick={onClose} />
        </Grid>
      </Paper>
      <Box sx={{ width: { xs: 320, sm: 550 } }} role="presentation" marginTop={'50px'}>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">Account Name</Typography>
            <input placeholder="Enter Account Name" id="accountname" value={formData.accountname} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Short/Alias Name</Typography>
            <input placeholder="Enter Short/Alias Name" id="shortname" value={formData.shortname} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">Email</Typography>
            <input placeholder="Enter Email" type="email" ref={emailRef} id="email" value={formData.email} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">Contact person name</Typography>
            <input placeholder="Enter Name" id="contactpersonname" value={formData.contactpersonname} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Mobile No.</Typography>
            <input placeholder="Enter Mobile No." id="mobileno" value={formData.mobileno} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">PAN/IT/TAN No.</Typography>
            <input placeholder="BJXXX001" id="panno" value={formData.panno} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Default Credit Period (In days)</Typography>
            <input placeholder="Default Credit Period" id="creditperiod" value={formData.creditperiod} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">Mode</Typography>
            <input placeholder="Enter Mode" id="mode" value={formData.mode} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="h5">Mailing Details</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">Address 1</Typography>
            <input placeholder="Floor,buliding Name" id="address1" value={formData.address1} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Address 2</Typography>
            <input placeholder="Location" id="address2" value={formData.address2} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">Country</Typography>
            <input placeholder="Country" id="country" value={formData.country} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Pincode</Typography>
            <input placeholder="395001" id="pincode" value={formData.pincode} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">State</Typography>
            <input placeholder="State" id="state" value={formData.state} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">City</Typography>
            <input placeholder="City" id="city" value={formData.city} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid item sx={{ margin: '8px 16px' }} style={{ paddingTop: '16px' }}>
          <Typography variant="subtitle1">Provide bank details?</Typography>
          <RadioGroup row value={formData.bankdetail} onChange={handleBankDetailChange}>
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>
        <Grid item sx={{ margin: '8px 16px' }}>
          <Typography variant="subtitle1">Enable credit limit?</Typography>
          <RadioGroup row value={formData.creditlimit} onChange={handleCreditDetailChange}>
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>
        {/* <Grid item sx={{ margin: '8px 16px' }}>
          <Card sx={{ padding: '10px' }}>
            <h3>Custom Feild</h3>
            {customFields.map((field, index) => (
              <Grid key={index} container spacing={2} sx={{ margin: '1px' }}>
                <Grid item xs={2} sm={3}>
                  <Typography variant="subtitle1">Label</Typography>
                  <input
                    placeholder="Label"
                    value={field.label}
                    onChange={(e) => {
                      const updatedCustomFields = [...customFields];
                      updatedCustomFields[index].label = e.target.value;
                      setCustomFields(updatedCustomFields);
                    }}
                  />
                </Grid>
                <Grid item xs={2} sm={3}>
                  <Typography variant="subtitle1">Value</Typography>
                  <input
                    placeholder="Value"
                    value={field.value}
                    onChange={(e) => {
                      const updatedCustomFields = [...customFields];
                      updatedCustomFields[index].value = e.target.value;
                      setCustomFields(updatedCustomFields);
                    }}
                  />
                </Grid>
                <Grid item xs={2} sm={1}>
                  <Typography variant="subtitle1">Delete</Typography>
                  <DeleteIcon onClick={() => handleDeleteCustomField(index)} sx={{ margin: '7px' }} />
                </Grid>
              </Grid>
            ))}
          </Card>
        </Grid>
        <Grid item xs={12}>
          <button
            style={{
              width: '100px',
              color: '#425466',
              borderColor: '#425466',
              padding: '2px',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '5px',
              lineHeight: '19px',
              marginTop: '10px',
              marginLeft: '20px'
            }}
            onClick={handleAddCustomField}
          >
            <AddIcon sx={{ fontSize: '18px' }} /> Add Row
          </button>
        </Grid> */}
        <Grid item sx={{ margin: '8px 16px' }}>
          <Card sx={{ padding: '10px' }}>
            <h3>Custom Feild</h3>
            {customFields.map((field, index) => (
              <Grid key={index} container spacing={2} sx={{ margin: '1px' }}>
                <Grid item>
                  <Typography variant="subtitle1">Label</Typography>
                  <input
                    placeholder="Label"
                    value={field.label}
                    onChange={(e) => {
                      const updatedCustomFields = [...customFields];
                      updatedCustomFields[index].label = e.target.value;
                      setCustomFields(updatedCustomFields);
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">Value</Typography>
                  <input
                    placeholder="Value"
                    value={field.value}
                    onChange={(e) => {
                      const updatedCustomFields = [...customFields];
                      updatedCustomFields[index].value = e.target.value;
                      setCustomFields(updatedCustomFields);
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">Delete</Typography>
                  <DeleteIcon onClick={() => handleDeleteCustomField(index)} sx={{ margin: '7px' }} />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <button
                style={{
                  width: '100px',
                  color: '#425466',
                  borderColor: '#425466',
                  padding: '2px',
                  display: 'flex',
                  justifyContent: 'center',
                  borderRadius: '5px',
                  lineHeight: '19px',
                  marginTop: '10px'
                }}
                onClick={handleAddCustomField}
              >
                <AddIcon sx={{ fontSize: '18px' }} /> Add Row
              </button>
            </Grid>
          </Card>
        </Grid>
        <Grid item sx={{ margin: '8px 16px' }}>
          <Grid item sx={12} sm={6}>
            <Typography variant="h5" sx={{ margin: '20px 0px 10px 0px' }}>
              Opening Balance
            </Typography>
            <input placeholder="₹0.00" id="balance" value={formData.balance} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 10px' }}>
          <div>
            <button
              style={{
                width: '100px',
                color: '#425466',
                padding: '8px',
                borderColor: '#425466',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '5px'
              }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
          <div style={{ display: 'flex' }}>
            <button
              style={{
                width: '100px',
                color: '#425466',
                padding: '8px',
                borderColor: '#425466',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '5px'
              }}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default AnchorTemporaryDrawer;
