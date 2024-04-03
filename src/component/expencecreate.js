import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { withStyles } from '@mui/styles';
import InputBase from '@mui/material/InputBase';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import { Grid, Typography, Paper } from '@mui/material';

const Expencedrawer = ({ open, onClose }) => {
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

  Expencedrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  const list = (
    <Box sx={{ width: { xs: 320, sm: 660 }, overflowX: 'hidden' }} role="presentation">
      <Grid container spacing={2} sx={{ margin: '1px', paddingTop: '50px' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">Under Group</Typography>
          <StyledInput placeholder="Direct Expense" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item sm={6}>
          <Typography variant="subtitle1">Account Name</Typography>
          <StyledInput placeholder="Enter Name" />
        </Grid>
        <Grid item sm={6}>
          <Typography variant="subtitle1">Short/Alias Name</Typography>
          <StyledInput placeholder="Enter Short Name" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item sm={6}>
          <Typography variant="subtitle1">Description</Typography>
          <StyledInput placeholder="Enter Description" />
        </Grid>
        <Grid item sm={6}>
          <Typography variant="subtitle1">Item Type</Typography>
          <StyledInput placeholder="Enter Item Type" />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '1px' }}>
        <Grid item sm={6}>
          <Typography variant="subtitle1">Nature Of Transaction</Typography>
          <StyledInput placeholder="Not Applicable" />
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
          width: { xs: '100%', sm: '660px' }
        }}
      >
        <Grid item>
          <Typography variant="h4">Direct Expense</Typography>
        </Grid>
        <Grid item>
          <CancelIcon onClick={onClose} />
        </Grid>
      </Paper>
      {list}
    </Drawer>
  );
};

export default Expencedrawer;
