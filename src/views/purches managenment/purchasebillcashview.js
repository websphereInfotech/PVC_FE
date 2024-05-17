import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PurchaseBillviewCash } from 'store/thunk';

const Purchasebillcashview = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(PurchaseBillviewCash(id))
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching purchase bill cash data:', error);
      });
  }, [dispatch, id]);

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Purchase Bill Cash View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Vendor</Typography>
          <Typography variant="subtitle2">{data.VendorPurchase?.vendorname}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Date</Typography>
          <Typography variant="subtitle2">{new Date(data.date).toLocaleDateString('en-GB')}</Typography>
        </Grid>

        <Grid item xs={12}>
          <div style={{ overflowX: 'auto', maxHeight: '300px', maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableCell width={420} sx={{ fontSize: '12px' }}>
                  PRODUCT/SERVICE
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>QTY</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>RATE (₹)</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>MRP (₹)</TableCell>
              </TableHead>
              <TableBody>
                {data.items &&
                  data.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item?.ProductPurchase.productname}</TableCell>
                      <TableCell>{item?.qty}</TableCell>
                      <TableCell>{item?.rate}</TableCell>
                      <TableCell>{item?.mrp}</TableCell>
                    </TableRow>
                  ))}
                {/* <TableCell></TableCell>
                <TableCell sx={{ fontSize: '12px', textAlign: 'right' }}>TotalQTY:</TableCell>
                <TableCell sx={{ fontSize: '12px', textAlign: 'left', padding: '10px' }}>{data?.totalQty}</TableCell>
                <TableCell></TableCell> */}
              </TableBody>
            </Table>
          </div>
        </Grid>

        <Grid item xs={12}>
          {isMobile ? (
            // For mobile screens, show each total on separate lines
            <>
              <div style={{ margin: '0px' }} id="subtotalcs">
                <h3>Total Amt.</h3>
                <h3>₹{data.totalMrp}</h3>
              </div>
            </>
          ) : (
            // For larger screens, show all totals on one line
            <div style={{ float: 'right', width: '30%' }}>
              <>
                <div style={{ margin: '0px' }} id="subtotalcs">
                  <h3>Total Amt.</h3>
                  <h3>₹{data.totalMrp}</h3>
                </div>
              </>
            </div>
          )}
        </Grid>

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/purchasebillcashList" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/purchasebillcashList" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Purchasebillcashview;
