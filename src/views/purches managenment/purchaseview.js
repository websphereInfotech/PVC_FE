import React from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

const Purchaseview = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Purchase View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Vendor</Typography>
          <Typography variant="subtitle2">websphere infotech</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Mobile No.</Typography>
          <Typography variant="subtitle2">9537410771</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle2">wsinfo08317@gmail.com</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Vendor Address</Typography>
          <Typography variant="subtitle2">317,silver, mota varacha, AHMEDABAD,GUJARAT, 395004</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Shipping Address</Typography>
          <Typography variant="subtitle2">silver trade center, mota varacha., SURAT,GUJARAT 395002</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">PO No.</Typography>
          <Typography variant="subtitle2">PO0001</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">PO Date</Typography>
          <Typography variant="subtitle2">31-03-2024</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Quotation No.</Typography>
          <Typography variant="subtitle2">QN0001</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Quotation Ref.</Typography>
          <Typography variant="subtitle2">websphere info.</Typography>
        </Grid>

        <Grid item xs={12}>
          <div style={{ overflowX: 'auto', maxHeight: '300px', maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableCell sx={{ fontSize: '12px' }}>SR.NO.</TableCell>
                <TableCell width={420} sx={{ fontSize: '12px' }}>
                  PRODUCT/SERVICE
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>QTY</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>RATE (₹)</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>DISC. (%/₹)</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>AMOUNT (₹)</TableCell>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>demo</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>1000</TableCell>
                  <TableCell>1%</TableCell>
                  <TableCell>100</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Grid>

        <Grid item xs={12}>
          {isMobile ? (
            // For mobile screens, show each total on separate lines
            <>
              <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <p>Taxable Amt.</p>
                <p>₹100.00</p>
              </div>
              <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <p>Sub Total</p>
                <p>₹1100.00</p>
              </div>
              <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <p>Total Amt.</p>
                <p>₹1100.00</p>
              </div>
            </>
          ) : (
            // For larger screens, show all totals on one line
            <div style={{ float: 'right', width: '30%' }}>
              <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                <p>Taxable Amt.</p>
                <p>₹100.00</p>
              </div>
              <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                <p>Sub Total</p>
                <p>₹1100.00</p>
              </div>
              <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                <p>Total Amt.</p>
                <p>₹1100.00</p>
              </div>
            </div>
          )}
        </Grid>

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/purchaselist" style={{ textDecoration: 'none' }}>
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
            </Link>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/purchaselist" style={{ textDecoration: 'none' }}>
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
            </Link>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Purchaseview;
