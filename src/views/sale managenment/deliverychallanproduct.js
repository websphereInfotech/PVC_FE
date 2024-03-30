import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { withStyles } from '@mui/styles';
import InputBase from '@mui/material/InputBase';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel, Paper } from '@mui/material';

const AnchorDeliverychallanProductDrawer = ({ open, onClose }) => {
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

  AnchorDeliverychallanProductDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  const list = (
    <Box sx={{ width: { xs: 320, sm: 660 }, overflowX: 'hidden' }} role="presentation">
      <Grid container spacing={2} sx={{ margin: '1px', paddingTop: '50px' }}>
        <Grid item>
          <Typography variant="subtitle1">Item Type</Typography>
          <RadioGroup row defaultValue="Product">
            <FormControlLabel value="Product" control={<Radio />} label="Product" />
            <FormControlLabel value="Service" control={<Radio />} label="Service" />
          </RadioGroup>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item xs={10}>
          <Typography variant="subtitle1">Product</Typography>
          <StyledInput placeholder="Enter Product" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item xs={10}>
          <Typography variant="subtitle1">Product Description</Typography>
          <StyledInput placeholder="Enter Product" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item sm={6}>
          <Typography variant="subtitle1">Item Group</Typography>
          <StyledInput placeholder="Enter Group" />
        </Grid>
        <Grid item sm={6}>
          <Typography variant="subtitle1">Item Category</Typography>
          <StyledInput placeholder="Enter Category" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item>
          <Typography variant="subtitle1">Unit</Typography>
          <StyledInput placeholder="YR-OTHERS" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item sx={{ margin: '0px 0px' }}>
          <Typography variant="subtitle1">Manage stock</Typography>
          <RadioGroup row defaultValue="Batch wise">
            <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
            <FormControlLabel value="Batch wise" control={<Radio />} label="Batch wise" />
            <FormControlLabel value="Lot wise" control={<Radio />} label="Lot wise" />
          </RadioGroup>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item sm={6}>
          <Typography variant="subtitle1">Opening Stock Qty</Typography>
          <StyledInput placeholder="0.00" />
        </Grid>
        <Grid item sm={6}>
          <Typography variant="subtitle1">Opening Stock Value</Typography>
          <StyledInput placeholder="0.00" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item sx={{ margin: '0px 0px' }} sm={6}>
          <Typography variant="subtitle1">Negative Qty Allowed</Typography>
          <RadioGroup row defaultValue="No">
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>
        <Grid item sx={{ margin: '0px 0px' }}>
          <Typography variant="subtitle1">Low Stock Warning</Typography>
          <RadioGroup row defaultValue="No">
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item sx={{ margin: '0px 0px' }} sm={6}>
          <RadioGroup row defaultValue="Show Item In Purchase">
            <FormControlLabel value="Show Item In Purchase" control={<Radio />} label="Show Item In Purchase" />
          </RadioGroup>
        </Grid>
        <Grid item sx={{ margin: '0px 0px' }}>
          <RadioGroup row defaultValue="Show Item In Sales">
            <FormControlLabel value="Show Item In Sales" control={<Radio />} label="Show Item In Sales" />
          </RadioGroup>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item sm={2}>
          <Typography variant="subtitle1">MRP</Typography>
          <StyledInput placeholder="0.000" />
        </Grid>
        <Grid item sm={3}>
          <Typography variant="subtitle1">Purchase Price</Typography>
          <StyledInput placeholder="0.000" />
        </Grid>
        <Grid item sm={4}>
          <Typography variant="subtitle1">Sales Price</Typography>
          <StyledInput placeholder="0.000" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item sm={6}>
          <Typography variant="subtitle1">GST Rate(%)</Typography>
          <StyledInput placeholder="0%" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item sx={{ margin: '0px 0px' }} sm={6}>
          <Typography variant="subtitle1">Cess Enable</Typography>
          <RadioGroup row defaultValue="No">
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
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
          width: { xs: '100%', sm: '660px' }
        }}
      >
        <Grid item>
          <Typography variant="h4">New Item</Typography>
        </Grid>
        <Grid item>
          <CancelIcon onClick={onClose} />
        </Grid>
      </Paper>
      {list}
    </Drawer>
  );
};

export default AnchorDeliverychallanProductDrawer;
