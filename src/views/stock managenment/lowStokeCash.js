import { Card, Grid, TableContainer, Typography } from '@mui/material';
import React from 'react';
import ProductCash from './productCash';
import RawMaterialCash from './rawMaterialCashStock';

const LowStockCash = () => {
  return (
    <Card style={{ width: 'auto', padding: '20px' }}>
      <TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" align="center" id="mycss">
              Product Cash
            </Typography>
            <ProductCash />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" align="center" id="mycss">
              Raw Material Cash
            </Typography>
            <RawMaterialCash />
          </Grid>
        </Grid>
      </TableContainer>
    </Card>
  );
};

export default LowStockCash;
