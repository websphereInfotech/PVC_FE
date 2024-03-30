import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
// import { SiInvoiceninja } from 'react-icons/si';
// import { HiReceiptRefund } from "react-icons/hi";
// import { RiRefundFill } from "react-icons/ri";
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';

const Stockmain = () => {
  return (
    <Grid>
      <Grid xs={12} md={4} sm={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ alignItems: 'center', display: 'flex', fontWeight: '300' }}>
          Stock Adjustment
        </Typography>
        <Button variant="contained" color="secondary" sx={{ fontWeight: '300', display: { xs: 'none', sm: 'block' } }} href="/stock">
          Adjust Stock
        </Button>
      </Grid>
      <Grid xs={12} md={8} sm={6} sx={{ marginTop: '20px' }}>
        <Card
          sx={{
            height: { xs: 550, sm: 550, md: 583 },
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CardContent>
            <div style={{ textAlign: 'center' }}>
              <MarkAsUnreadIcon style={{ fontSize: '110px', color: '#425466' }} />
              <h2 style={{ fontWeight: '600' }}>Manage your inventory!!</h2>
              <p style={{ color: 'rgb(130 134 139)', fontWeight: '400', fontSize: '1rem' }}>
                Manage your stock using adjustment, wastage, and consumption<br></br>
              </p>
              <Button variant="contained" color="secondary" sx={{ fontWeight: '300' }} href="/stock">
                Adjust Stock
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Stockmain;
