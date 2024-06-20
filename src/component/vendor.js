import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel, Paper } from '@mui/material';
import { createVendor, updateVendor, viewVendor } from '../store/thunk';
import { CitySelect, StateSelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import { useNavigate } from 'react-router';

const AnchorVendorDrawer = ({ open, onClose, id }) => {
  AnchorVendorDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for radio buttons
  const [bankdetail, setBankDetail] = React.useState(false);
  const [creditlimit, setCreditlimit] = React.useState(false);
  // State for input fields
  const [formData, setFormData] = React.useState({
    accountname: '',
    shortname: '',
    email: '',
    contactpersonname: '',
    mobileno: Number(),
    panno: Number(),
    gstnumber: '',
    creditperiod: '',
    address1: '',
    address2: '',
    pincode: '',
    balance: ''
  });

  const emailRef = React.useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const [bankName, setBankName] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');
  const [accountType, setAccountType] = React.useState('');
  const [ifscCode, setIfscCode] = React.useState('');
  const [countryid, setCountryid] = React.useState(101);
  {
    console.log(setCountryid);
  }
  const [stateid, setstateid] = React.useState(0);
  const [totalCredit, setTotalCredit] = React.useState();
  // Function to handle bank details change
  const handleBankDetailChange = (event) => {
    setBankDetail(event.target.value === 'true' ? true : false);
    if (!event.target.value) {
      setBankName('');
      setAccountNumber('');
      setAccountType('');
      setIfscCode('');
    }
  };
  const handleCityChange = (selectedCity) => {
    setFormData({ ...formData, city: selectedCity.name });
  };

  const handleStateChange = (selectedState) => {
    setFormData({ ...formData, state: selectedState.name });
  };

  const handleCreditDetailChange = (event) => {
    setCreditlimit(event.target.value === 'true' ? true : false);
  };
  const handleTotalCreditChange = (event) => {
    setTotalCredit(event.target.value);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(viewVendor(id));
        setFormData({ ...response });
        setBankDetail(response.bankdetail);
        setCreditlimit(response.creditlimit);
        setTotalCredit(response.totalcreadit);
        if (response.v_bankdetails) {
          setBankName(response.v_bankdetails.bankname);
          setAccountNumber(response.v_bankdetails.accountnumber);
          setAccountType(response.v_bankdetails.accounttype);
          setIfscCode(response.v_bankdetails.ifsccode);
        }
      } catch (error) {
        console.log('Error fetching Product', error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id, dispatch]);
  const handleSave = async () => {
    try {
      const vendorData = {
        ...formData,
        bankdetail: bankdetail,
        creditlimit: creditlimit
      };
      if (id) {
        await dispatch(updateVendor(id, vendorData, navigate));
      } else {
        await dispatch(createVendor(vendorData, navigate));
      }
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
            <Typography variant="subtitle1">Short/Alias Name :</Typography>
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
            <Typography variant="subtitle1">PAN/IT/TAN No. :</Typography>
            <input placeholder="BJXXX001" id="panno" value={formData.panno} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              GST No.:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="GSTIN452" id="gstnumber" value={formData.gstnumber} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
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
            <StateSelect
              countryid={countryid}
              onChange={(selectedState) => {
                setstateid(selectedState.id);
                handleStateChange(selectedState);
              }}
              placeHolder={formData.state}
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              City : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <CitySelect countryid={countryid} stateid={stateid} onChange={handleCityChange} placeHolder={formData.city} />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item sx={{ margin: '8px 16px' }} style={{ paddingTop: '16px' }} md={5}>
            <Typography variant="subtitle1">
              Provide bank details? : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <RadioGroup row value={bankdetail} onChange={handleBankDetailChange}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid style={{ width: '100%' }}>
            {bankdetail && (
              <>
                <Grid container spacing={2} style={{ paddingTop: '16px' }}>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Bank Name: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                    </Typography>
                    <input placeholder="Enter Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Account Number: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                    </Typography>
                    <input placeholder="Enter Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ paddingTop: '16px' }}>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Account Type: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                    </Typography>
                    <input placeholder="Enter Account Type" value={accountType} onChange={(e) => setAccountType(e.target.value)} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      IFSC Code: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                    </Typography>
                    <input placeholder="Enter IFSC Code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
          <Grid item sx={{ margin: '8px 16px' }} md={5}>
            <Typography variant="subtitle1">
              Enable credit limit? : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <RadioGroup row value={creditlimit} onChange={handleCreditDetailChange}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid style={{ width: '100%' }}>
          {creditlimit && (
            <Grid item sx={{ margin: '8px 16px' }} md={5}>
              <Typography variant="subtitle1">
                Total Credit: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input placeholder="Enter Total Credit" value={totalCredit} onChange={handleTotalCreditChange} />
            </Grid>
          )}
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
