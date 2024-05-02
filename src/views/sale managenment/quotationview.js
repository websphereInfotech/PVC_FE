import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Quotationview } from 'store/thunk';

const Quotationviewpage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState({});

  //called api for view data
  useEffect(() => {
    dispatch(Quotationview(id))
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching quotation data:', error);
      });
  }, [dispatch, id]);
  const subtotal = data?.items?.reduce((acc, item) => acc + item.mrp, 0);
  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Quotation View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Customer</Typography>
          <Typography variant="subtitle2">{data?.customer}</Typography>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Mobile No.</Typography>
          <Typography variant="subtitle2">{data?.mobileno}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle2">{data?.email}</Typography>
        </Grid> */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Quotation No.</Typography>
          <Typography variant="subtitle2">{data?.quotation_no}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Quotation Date</Typography>
          <Typography variant="subtitle2">{new Date(data?.date).toLocaleDateString()}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Valid Till</Typography>
          <Typography variant="subtitle2">{new Date(data?.validtill).toLocaleDateString()}</Typography>
        </Grid>

        <Grid item xs={12}>
          <div style={{ maxHeight: '300px' }}>
            <Table>
              <TableHead>
                {/* <TableCell sx={{ fontSize: '12px' }}>SR.NO.</TableCell> */}
                <TableCell sx={{ fontSize: '12px' }}>PRODUCT/SERVICE</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>QTY</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>RATE (₹) (EXCL. TAX)</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>AMOUNT (₹)</TableCell>
              </TableHead>
              <TableBody>
                {data?.items &&
                  data?.items.map((item, index) => (
                    <TableRow key={index}>
                      {/* <TableCell>{item?.srNo}</TableCell> */}
                      <TableCell>{item?.product}</TableCell>
                      <TableCell>{item?.rate}</TableCell>
                      <TableCell>{item?.qty}</TableCell>
                      <TableCell>{item?.mrp}</TableCell>
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
              <div style={{ margin: '0px' }} id="subtotalcs">
                <p>Taxable Amt.</p>
                <p>₹0.00</p>
              </div>
              <div style={{ margin: '0px' }} id="subtotalcs">
                <p>Sub Total</p>
                <p>{subtotal?.toFixed(2)}</p>
              </div>
              <div style={{ margin: '0px' }} id="subtotalcs">
                <p>Total Amt.</p>
                <p>{subtotal?.toFixed(2)}</p>
              </div>
            </>
          ) : (
            // For larger screens, show all totals on one line
            <div style={{ float: 'right', width: '30%' }}>
              <div style={{ margin: '0px' }} id="subtotalcs">
                <p>Taxable Amt.</p>
                <p>₹0.00</p>
              </div>
              <div style={{ margin: '0px' }} id="subtotalcs">
                <p>Sub Total</p>
                <p>{subtotal?.toFixed(2)}</p>
              </div>
              <div style={{ margin: '0px' }} id="subtotalcs">
                <p>Total Amt.</p>
                <p>{subtotal?.toFixed(2)}</p>
              </div>
            </div>
          )}
        </Grid>

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/qutationlist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/qutationlist" style={{ textDecoration: 'none' }}>
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

export default Quotationviewpage;
