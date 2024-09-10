import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { Grid, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createPurpose } from 'store/thunk';

const Purpose = ({ open, onClose, onnewadded }) => {
  const [PurposeName, setPurposeName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  Purpose.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onnewadded: PropTypes.func.isRequired
  };

  const handleSave = async () => {
    const payload = { name: PurposeName };
    const response = await dispatch(createPurpose(payload, navigate));
    onnewadded(response.data.data);
    onClose();
    setPurposeName('');
  };

  const list = (
    <Box sx={{ width: { xs: 320, sm: 420 }, overflowX: 'hidden' }} role="presentation">
      <Grid container spacing={2} sx={{ margin: '1px', paddingTop: '50px' }}>
        <Grid item sm={12}>
          <Typography variant="subtitle1">Purpose Name</Typography>
          <input placeholder="Enter Item Group" value={PurposeName} onChange={(e) => setPurposeName(e.target.value)} />
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
          width: { xs: '100%', sm: '420px' }
        }}
      >
        <Grid item>
          <Typography variant="h4">New Purpose</Typography>
        </Grid>
        <Grid item>
          <CancelIcon onClick={onClose} />
        </Grid>
      </Paper>
      {list}
    </Drawer>
  );
};

export default Purpose;
