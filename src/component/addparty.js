import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Paper, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { createAccounts, fetchAllAccountOptions, updateAccount, viewAccount } from 'store/thunk';
import Select from 'react-select';
import { CitySelect, StateSelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import { useNavigate } from 'react-router';

const AnchorTemporaryDrawer = ({ open, onClose, id }) => {
  AnchorTemporaryDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    accountname: '',
    shortname: '',
    contactpersonname: '',
    accountGroupId: ''
  });

  const [stateid, setstateid] = React.useState(0);
  const [countryid, setCountryid] = React.useState(101);
  {
    console.log(setCountryid);
  }
  const [bankdetail, setBankDetail] = React.useState(false);
  const [creditlimit, setCreditlimit] = React.useState(false);
  const [bankName, setBankName] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');
  const [accountHolderName, setAccountHolderName] = React.useState('');
  const [ifscCode, setIfscCode] = React.useState('');
  const [totalCredit, setTotalCredit] = React.useState();
  const [sundryDetails, setSundryDetails] = React.useState({
    email: '',
    mobileNo: '',
    panNo: '',
    state: '',
    city: '',
    address1: '',
    address2: '',
    pincode: '',
    balance: '',
    gstnumber: 0,
    creditperiod: 0
  });
  const [accountgroup, setAccountgroup] = React.useState([]);
  const [selectedGroup, setSelectedGroup] = React.useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleInputSundryDetailChange = (e) => {
    const { id, value } = e.target;
    setSundryDetails({ ...sundryDetails, [id]: value });
  };

  const handleGroupChange = (selectedOption) => {
    setFormData({ ...formData, accountGroupId: selectedOption.value });
    setSelectedGroup(selectedOption);
  };
  const handleCreditDetailChange = (event) => {
    setCreditlimit(event.target.value === 'true' ? true : false);
  };
  const handleTotalCreditChange = (event) => {
    setTotalCredit(event.target.value);
  };
  const handleBankDetailChange = (event) => {
    setBankDetail(event.target.value === 'true' ? true : false);
    if (!event.target.value) {
      setBankName('');
      setAccountNumber('');
      setAccountHolderName('');
      setIfscCode('');
    }
  };
  const handleCityChange = (selectedCity) => {
    setSundryDetails({ ...sundryDetails, city: selectedCity.name });
  };

  const handleStateChange = (selectedState) => {
    setSundryDetails({ ...sundryDetails, state: selectedState.name });
  };

  React.useEffect(() => {
    const data = async () => {
      try {
        const fetchdata = await dispatch(fetchAllAccountOptions());
        const options = fetchdata.map((account) => ({
          value: account.id,
          label: account.name
        }));
        setAccountgroup(options);
      } catch (error) {
        console.log('fetching data of all group of ledgers:', error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await dispatch(viewAccount(id));
        setFormData({
          accountname: response.accountName,
          shortname: response.shortName,
          contactpersonname: response.contactPersonName,
          accountGroupId: response.accountGroupId
        });
        setSundryDetails({
          email: response.accountDetail.email,
          mobileNo: response.accountDetail.mobileNo,
          panNo: response.accountDetail.panNo,
          state: response.accountDetail.state,
          city: response.accountDetail.city,
          address1: response.accountDetail.address1,
          address2: response.accountDetail.address2,
          pincode: response.accountDetail.pincode,
          balance: response.accountDetail.balance,
          gstnumber: response.accountDetail.gstNumber,
          creditperiod: response.accountDetail.creditPeriod
        });
        setBankDetail(response.accountDetail.bankDetail);
        setCreditlimit(response.accountDetail.creditLimit);
        setBankName(response.accountDetail.bankName);
        setAccountNumber(response.accountDetail.accountNumber);
        setAccountHolderName(response.accountDetail.accountHolderName);
        setIfscCode(response.accountDetail.ifscCode);
        setTotalCredit(response.accountDetail.totalCredit);
        setSelectedGroup({ value: response.accountGroup.id, label: response.accountGroup.name });
      } catch (error) {
        console.log('Error fetching Customer', error);
      }
    };
    if (id) {
      fetchData();
    }
    data();
  }, [id, dispatch]);

  console.log(formData, 'formdata');
  const handlesave = async () => {
    const payload = {
      accountGroupId: formData.accountGroupId,
      accountName: formData.accountname,
      shortName: formData.shortname,
      contactPersonName: formData.contactpersonname,
      accountDetail: {}
    };
    if (
      selectedGroup?.label === 'Sundry Creditors' ||
      selectedGroup?.label === 'Sundry Debtors' ||
      selectedGroup?.label === 'Unsecured Loans'
    ) {
      payload.accountDetail = {
        email: sundryDetails.email,
        mobileNo: sundryDetails.mobileNo,
        panNo: sundryDetails.panNo,
        address1: sundryDetails.address1,
        address2: sundryDetails.address2,
        city: sundryDetails.city,
        state: sundryDetails.state,
        pincode: sundryDetails.pincode,
        bankDetail: bankdetail
      };
    }
    if (selectedGroup?.label === 'Sundry Creditors' || selectedGroup?.label === 'Sundry Debtors') {
      payload.accountDetail = {
        gstNumber: sundryDetails.gstnumber,
        balance: sundryDetails.balance,
        creditPeriod: sundryDetails.creditperiod,
        creditLimit: creditlimit
      };
    }
    if (creditlimit === 'true') {
      payload.accountDetail.totalCredit = totalCredit;
    }
    if (bankdetail === 'true' || selectedGroup?.label === 'Bank Account') {
      payload.accountDetail.bankName = bankName;
      payload.accountDetail.accountNumber = accountNumber;
      payload.accountDetail.accountHolderName = accountHolderName;
      payload.accountDetail.ifscCode = ifscCode;
    }
    if (id) {
      await dispatch(updateAccount(id, payload, navigate));
    } else {
      await dispatch(createAccounts(payload));
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
            New Party [ledger]
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
          <Grid item>
            <Typography variant="subtitle1">Account Group</Typography>
            <Select color="secondary" id="accountGroupId" options={accountgroup} onChange={handleGroupChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Contact person name : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter Name" id="contactpersonname" value={formData.contactpersonname} onChange={handleInputChange} />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {selectedGroup?.label === 'Sundry Creditors' ||
          selectedGroup?.label === 'Sundry Debtors' ||
          selectedGroup?.label === 'Unsecured Loans' ? (
            <>
              <Grid item>
                <Typography variant="subtitle1">
                  Email : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input placeholder="Enter Email" id="email" value={sundryDetails.email} onChange={handleInputSundryDetailChange} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Mobile No : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  placeholder="Enter Mobile No"
                  id="mobileNo"
                  value={sundryDetails.mobileNo}
                  onChange={handleInputSundryDetailChange}
                />
              </Grid>
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
                  placeHolder={sundryDetails.state}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  City : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <CitySelect countryid={countryid} stateid={stateid} onChange={handleCityChange} placeHolder={sundryDetails.city} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  PAN No : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input placeholder="Enter PAN No" id="panNo" value={sundryDetails.panNo} onChange={handleInputSundryDetailChange} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Address 1 : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  placeholder="Enter Address 1"
                  id="address1"
                  value={sundryDetails.address1}
                  onChange={handleInputSundryDetailChange}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Address 2 : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  placeholder="Enter Address 2"
                  id="address2"
                  value={sundryDetails.address2}
                  onChange={handleInputSundryDetailChange}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Pincode : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input placeholder="Enter Pincode" id="pincode" value={sundryDetails.pincode} onChange={handleInputSundryDetailChange} />
              </Grid>
              {selectedGroup?.label !== 'Unsecured Loans' && (
                <>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Opening Balance : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                    </Typography>
                    <input
                      placeholder="Enter Opening Balance"
                      id="balance"
                      value={sundryDetails.balance}
                      onChange={handleInputSundryDetailChange}
                    />
                  </Grid>
                </>
              )}
              {selectedGroup?.label !== 'Unsecured Loans' && (
                <>
                  <Grid item>
                    <Typography variant="subtitle1">
                      GST No.: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                    </Typography>
                    <input placeholder="GSTIN452" id="gstnumber" value={sundryDetails.gstnumber} onChange={handleInputSundryDetailChange} />
                  </Grid>
                </>
              )}
              {selectedGroup?.label !== 'Unsecured Loans' && (
                <>
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
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Default Credit Period (In days) : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                    </Typography>
                    <input
                      placeholder="Default Credit Period"
                      id="creditperiod"
                      value={sundryDetails.creditperiod}
                      onChange={handleInputSundryDetailChange}
                    />
                  </Grid>
                </>
              )}
              <Grid item spacing={2}>
                <Grid item>
                  <Typography variant="subtitle1">
                    Enable credit limit? : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <RadioGroup row defaultValue="false" value={creditlimit} onChange={handleCreditDetailChange}>
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>

                <Grid item>
                  <Typography variant="subtitle1">
                    Provide bank details? : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <RadioGroup row defaultValue="false" value={bankdetail} onChange={handleBankDetailChange}>
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>
              </Grid>
            </>
          ) : (
            ''
          )}
        </Grid>

        <Grid style={{ width: '100%' }}>
          {bankdetail || selectedGroup?.label === 'Bank Account' ? (
            <>
              <Grid container spacing={2}>
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
                <Grid item>
                  <Typography variant="subtitle1">
                    Holder Name: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <input placeholder="Enter Holder Name" value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    IFSC Code: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <input placeholder="Enter IFSC Code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                </Grid>
              </Grid>
            </>
          ) : (
            ''
          )}
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 10px' }}>
          <div>
            <button id="savebtncs" onClick={onClose}>
              Cancel
            </button>
          </div>
          <div style={{ display: 'flex' }}>
            <button id="savebtncs" onClick={handlesave}>
              Save
            </button>
          </div>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default AnchorTemporaryDrawer;
