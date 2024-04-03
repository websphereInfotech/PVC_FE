import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { withStyles } from '@mui/styles';
import InputBase from '@mui/material/InputBase';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel, Card, Paper } from '@mui/material';

const AnchorTemporaryDrawer = ({ open, onClose }) => {
  const StyledInput = withStyles((theme) => ({
    root: {
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 15,
      width: '100%',
      padding: '5px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        boxShadow: `${theme.palette.secondary.main} 0 0 0 0.5px`,
        borderColor: theme.palette.secondary.main
      }
    }
  }))(InputBase);

  AnchorTemporaryDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  const [customFields, setCustomFields] = React.useState([{ label: '', value: '' }]);

  const handleAddCustomField = () => {
    const newCustomFields = [...customFields, { label: '', value: '' }];
    setCustomFields(newCustomFields);
  };

  const handleDeleteCustomField = (index) => {
    const updatedCustomFields = [...customFields];
    updatedCustomFields.splice(index, 1);
    setCustomFields(updatedCustomFields);
  };

  const list = (
    <Box sx={{ width: { xs: 320, sm: 550 }, overflowX: 'hidden', '&::-webkit-scrollbar': { width: '0' } }} role="presentation">
      <Grid container spacing={2} sx={{ margin: '1px', paddingTop: '50px' }}>
        <Grid item>
          <Typography variant="subtitle1">Account Name</Typography>
          <StyledInput placeholder="Enter Account Name" />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Short/Alias Name</Typography>
          <StyledInput placeholder="Enter Short/Alias Name" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item>
          <Typography variant="subtitle1">Email</Typography>
          <StyledInput placeholder="Enter Email" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item>
          <Typography variant="subtitle1">Contact person name</Typography>
          <StyledInput placeholder="Enter Name" />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Mobile No.</Typography>
          <StyledInput placeholder="Enter Mobile No." />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item>
          <Typography variant="subtitle1">PAN/IT/TAN No.</Typography>
          <StyledInput placeholder="BJXXX001" />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Default Credit Period (In days)</Typography>
          <StyledInput placeholder="Default Credit Period" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item>
          <Typography variant="subtitle1">Mode</Typography>
          <StyledInput placeholder="Enter Mode" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item>
          <Typography variant="h5">Mailing Details</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item>
          <Typography variant="subtitle1">Address 1</Typography>
          <StyledInput placeholder="Floor,buliding Name" />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Address 2</Typography>
          <StyledInput placeholder="Location" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item>
          <Typography variant="subtitle1">Country</Typography>
          <StyledInput placeholder="Country" />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Pincode</Typography>
          <StyledInput placeholder="395001" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item>
          <Typography variant="subtitle1">State</Typography>
          <StyledInput placeholder="State" />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">City</Typography>
          <StyledInput placeholder="City" />
        </Grid>
      </Grid>
      <Grid item sx={{ margin: '8px 16px' }}>
        <Typography variant="subtitle1">Provide bank details?</Typography>
        <RadioGroup row defaultValue="yes">
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item sx={{ margin: '8px 16px' }}>
        <Typography variant="subtitle1">Enable credit limit?</Typography>
        <RadioGroup row defaultValue="yes">
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item sx={{ margin: '8px 16px' }}>
        <Card sx={{ padding: '10px' }}>
          <h3>Custom Feild</h3>
          {customFields.map((field, index) => (
            <Grid key={index} container spacing={2} sx={{ margin: '1px' }}>
              <Grid item xs={2} sm={3}>
                <Typography variant="subtitle1">Label</Typography>
                <StyledInput
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
                <StyledInput
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
          <StyledInput placeholder="₹0.00" />
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
          >
            Save
          </button>
        </div>
      </Grid>
    </Box>
  );

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
          <Typography variant="h4">New Customer (Sundry Debtors)</Typography>
        </Grid>
        <Grid item>
          <CancelIcon onClick={onClose} />
        </Grid>
      </Paper>
      {list}
    </Drawer>
  );
};

export default AnchorTemporaryDrawer;
