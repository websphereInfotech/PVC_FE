import { Card, Grid, TableContainer, Typography } from '@mui/material';
import React from 'react';
import Product from './product';
import RawMaterial from './rawMaterialStock';

const LowStock = () => {
  return (
    <Card style={{ width: 'auto', padding: '20px' }}>
      <TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" align="center" id="mycss">
              Product
            </Typography>
            <Product />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" align="center" id="mycss">
              Raw Material
            </Typography>
            <RawMaterial />
          </Grid>
        </Grid>
      </TableContainer>
    </Card>
  );
};

export default LowStock;
