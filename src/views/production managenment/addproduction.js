import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, InputBase, Button } from '@mui/material';
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
      boxShadow: `${theme.palette.secondary.main} 0 0 0 0.5px`,
      borderColor: theme.palette.secondary.main
    }
  }
}))(InputBase);

const AddProductionPage = () => {
  const [productName, setProductName] = useState('');
  const [batchNo, setBatchNo] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');

  const handleSave = () => {
    // Handle save action here
    console.log('Product Name:', productName);
    console.log('Batch No:', batchNo);
    console.log('Quantity:', quantity);
    console.log('Weight:', weight);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '25px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Add Production
        </Typography>
        <form onSubmit={handleSave}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Product Name *</Typography>
              <StyledInput
                placeholder="Enter product name"
                fullWidth
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                style={{}}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Batch No. *</Typography>
              <StyledInput
                placeholder="Enter batch number"
                fullWidth
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
                style={{}}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Quantity *</Typography>
              <StyledInput
                placeholder="Enter quantity"
                fullWidth
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                // style={{}}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Weight *</Typography>
              <StyledInput placeholder="Enter weight" fullWidth value={weight} onChange={(e) => setWeight(e.target.value)} />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '10px' }}>
              <Button style={{ color: 'white', width: '80px', backgroundColor: '#425466', borderRadius: '5px' }} type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProductionPage;
