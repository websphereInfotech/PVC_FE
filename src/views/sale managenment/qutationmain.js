import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
// import { SiInvoiceninja } from 'react-icons/si';
// import { HiReceiptRefund } from "react-icons/hi";
import { RiRefundFill } from 'react-icons/ri';
// import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';

const Quotationmain = () => {
  return (
    <Grid>
      <Grid xs={12} md={4} sm={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ alignItems: 'center', display: 'flex', fontWeight: '300' }}>
          Quotation
        </Typography>
        <Button variant="contained" color="secondary" sx={{ fontWeight: '300', display: { xs: 'none', sm: 'block' } }} href="/qutation">
          Create Quotation
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
              <RiRefundFill style={{ fontSize: '110px', color: '#425466' }} />
              <h2 style={{ fontWeight: '600' }}>Do estimate for win the deal!</h2>
              <p style={{ color: 'rgb(130 134 139)', fontWeight: '400', fontSize: '1rem' }}>
                With perfect estimation, give your customers an offer they can not reject!<br></br>
              </p>
              <Button variant="contained" color="secondary" sx={{ fontWeight: '300' }} href="/qutation">
                Create Quotation
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Quotationmain;
