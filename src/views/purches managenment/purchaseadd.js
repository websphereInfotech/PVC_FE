import React from 'react';
import { Container, Typography, Grid, Paper, InputBase } from '@mui/material';
import { withStyles } from '@mui/styles';

// Custom styled input component
const StyledInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${theme.palette.primary.main} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

const AddPurchasePage = () => {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '24px', marginTop: '24px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Purchase
        </Typography>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Bill No.</Typography>
              <StyledInput placeholder="Enter bill number" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Buyer&apos;s No.</Typography>
              <StyledInput placeholder="Enter buyer's number" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Delivery Note</Typography>
              <StyledInput placeholder="Enter delivery note" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Vendor</Typography>
              <StyledInput placeholder="Enter vendor name" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Reference No.</Typography>
              <StyledInput placeholder="Enter reference number" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Bill Date</Typography>
              <StyledInput type="date" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <button
                style={{
                  width: '100px',
                  color: 'white',
                  backgroundColor: 'green',
                  padding: '10px',
                  borderColor: 'none',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                Save
              </button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddPurchasePage;
