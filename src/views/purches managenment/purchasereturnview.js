import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PurchaseReturnview } from 'store/thunk';

const Purchasereturnview = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(PurchaseReturnview(id))
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching purchase return data:', error);
      });
  }, [dispatch, id]);

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Purchase Return View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Vendor</Typography>
          <Typography variant="subtitle2">{data.vendor}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Debit Note No.</Typography>
          <Typography variant="subtitle2">{data.debitnote}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="subtitle1">Debit Note Date</Typography>
          <Typography variant="subtitle2">{new Date(data?.debitdate).toLocaleDateString()}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Reference No.</Typography>
          <Typography variant="subtitle2">{data.refno}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Reference Date</Typography>
          <Typography variant="subtitle2">{new Date(data?.refdate).toLocaleDateString()}</Typography>
        </Grid>

        <Grid item xs={12}>
          <div style={{ overflowX: 'auto', maxHeight: '300px', maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableCell sx={{ fontSize: '12px' }}>SR.NO.</TableCell>
                <TableCell width={450} sx={{ fontSize: '12px' }}>
                  PRODUCT/SERVICE
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>BATCH NO.</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>EXPR. DATE</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>MRP(₹)</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>BILL NO.</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>BILL DATE</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>BILL QTY</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>QTY RATE (₹)</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>TAXABLE AMT. (₹)</TableCell>
                {/* <TableCell sx={{ fontSize: '12px' }}>CESS (%)</TableCell> */}
                <TableCell sx={{ fontSize: '12px' }}>AMOUNT (₹)</TableCell>
              </TableHead>
              <TableBody>
                {data.purchaseReturnItems &&
                  data.purchaseReturnItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item?.id}</TableCell>
                      <TableCell>{item?.product}</TableCell>
                      <TableCell>{item?.batchno}</TableCell>
                      <TableCell>{new Date(item?.expirydate).toLocaleDateString()}</TableCell>
                      <TableCell>{item?.mrp}</TableCell>
                      <TableCell>{item?.bill_no}</TableCell>
                      <TableCell>{new Date(item?.bill_date).toLocaleDateString()}</TableCell>
                      <TableCell>{item?.qty}</TableCell>
                      <TableCell>{item?.rate}</TableCell>
                      <TableCell>{item?.taxable}</TableCell>
                      {/* {console.log(item.Cess, 'data>>>>>>>')}
                      <TableCell>{item.Cess}</TableCell> */}
                      <TableCell>{item?.price}</TableCell>
                    </TableRow>
                  ))}
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
                <p>₹0.00</p>
              </div>
              <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <p>Sub Total</p>
                <p>₹0.00</p>
              </div>
              <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <p>Total Amt.</p>
                <p>₹0.00</p>
              </div>
            </>
          ) : (
            // For larger screens, show all totals on one line
            <div style={{ float: 'right', width: '30%' }}>
              <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                <p>Taxable Amt.</p>
                <p>₹0.00</p>
              </div>
              <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                <p>Sub Total</p>
                <p>₹0.00</p>
              </div>
              <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                <p>Total Amt.</p>
                <p>₹0.00</p>
              </div>
            </div>
          )}
        </Grid>

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/purchasereturnList" style={{ textDecoration: 'none' }}>
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
            <Link to="/purchasereturnList" style={{ textDecoration: 'none' }}>
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

export default Purchasereturnview;
