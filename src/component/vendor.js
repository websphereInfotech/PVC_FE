import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel, Paper } from '@mui/material';
import { createVendor } from '../store/thunk';

const AnchorVendorDrawer = ({ open, onClose }) => {
  AnchorVendorDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  const dispatch = useDispatch();

  // State for radio buttons
  const [bankdetail, setBankDetail] = React.useState(true);
  const [creditlimit, setCreditlimit] = React.useState(false);
  // State for input fields
  const [formData, setFormData] = React.useState({
    accountname: '',
    shortname: '',
    email: '',
    contactpersonname: '',
    mobileno: '',
    panno: '',
    gstnumber: '',
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

  const handleBankDetailChange = (event) => {
    setBankDetail(event.target.value === 'true' ? true : false);
  };

  const handleCreditDetailChange = (event) => {
    setCreditlimit(event.target.value === 'true' ? true : false);
  };

  const handleSave = async () => {
    try {
      const vendorData = {
        ...formData,
        bankdetail: bankdetail,
        creditlimit: creditlimit
      };
      await dispatch(createVendor(vendorData));
    } catch (error) {
      console.error('Error creating vendor:', error);
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
          width: { xs: '1000px', sm: '550px' }
        }}
      >
        <Grid item>
          <Typography variant="h4" className="heading">
            New Vendor (Sundry Debtors)
          </Typography>
        </Grid>
        <Grid item>
          <CancelIcon onClick={onClose} />
        </Grid>
      </Paper>
      <Box sx={{ width: { xs: 320, sm: 550 } }} role="presentation" marginTop={'50px'}>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">
              Account Name : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter Account Name" id="accountname" value={formData.accountname} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Short/Alias Name : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter Short/Alias Name" id="shortname" value={formData.shortname} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">
              Email : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter Email" type="email" ref={emailRef} id="email" value={formData.email} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">
              Contact person name : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter Name" id="contactpersonname" value={formData.contactpersonname} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Mobile No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter Mobile No." id="mobileno" value={formData.mobileno} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">
              PAN/IT/TAN No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="BJXXX001" id="panno" value={formData.panno} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">GST No.</Typography>
            <input placeholder="GSTIN452" id="gstnumber" value={formData.gstnumber} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">
              Mode : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter Mode" id="mode" value={formData.mode} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Default Credit Period (In days) : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Default Credit Period" id="creditperiod" value={formData.creditperiod} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="h5">Mailing Details</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">
              Address 1 : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Floor,buliding Name" id="address1" value={formData.address1} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Address 2</Typography>
            <input placeholder="Location" id="address2" value={formData.address2} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">
              Pincode : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="395001" id="pincode" value={formData.pincode} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">
              State : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="State" id="state" value={formData.state} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              City : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="City" id="city" value={formData.city} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item sx={{ margin: '8px 16px' }} style={{ paddingTop: '16px' }} md={5}>
            <Typography variant="subtitle1">
              Provide bank details? : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <RadioGroup row value={formData.bankdetail} onChange={handleBankDetailChange}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item sx={{ margin: '8px 16px' }} md={5}>
            <Typography variant="subtitle1">
              Enable credit limit? : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <RadioGroup row value={formData.creditlimit} onChange={handleCreditDetailChange}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid item sx={{ margin: '8px 16px' }}>
          <Grid item sx={12} sm={6}>
            <Typography variant="h5" sx={{ margin: '20px 0px 10px 0px' }}>
              Opening Balance : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="₹0.00" id="balance" value={formData.balance} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 10px' }}>
          <div>
            <button id="savebtncs" onClick={onClose}>
              Cancel
            </button>
          </div>
          <div style={{ display: 'flex' }}>
            <button id="savebtncs" onClick={handleSave}>
              Save
            </button>
          </div>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default AnchorVendorDrawer;
