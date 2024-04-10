import React from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableHead, TableCell } from '@mui/material';
import { withStyles } from '@mui/styles';
// import Select from 'react-select';
// import AnchorTemporaryDrawer from '../../component/customerqutation';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { createPayment } from 'store/thunk';
import { useNavigate } from 'react-router-dom';
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

const PaymentPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlecreatepayment = async () => {
    try {
      const voucherno = document.getElementById('voucherno').value;
      const email = document.getElementById('email').value;
      const paymentdate = document.getElementById('paymentdate').value;
      const account = document.getElementById('account').value;
      const mode = document.getElementById('mode').value;
      const refno = document.getElementById('refno').value;
      const paidfrom = document.getElementById('paidfrom').value;
      const amount = document.getElementById('amount').value;
      const billno = document.getElementById('billno').value;
      const billfromdate = document.getElementById('billfromdate').value;
      const billtodate = document.getElementById('billtodate').value;

      const paymentData = {
        voucherno,
        account,
        email,
        paymentdate,
        mode,
        refno,
        paidfrom,
        amount,
        billno,
        billfromdate,
        billtodate
      };
      const Paymentdata = await dispatch(createPayment(paymentData));
      console.log('data>>>>', Paymentdata);
      alert('Paymentdata created successfully');
      navigate('/paymentlist');
    } catch (error) {
      console.error('Error creating Paymentdata:', error);
      alert('Failed to create Paymentdata');
    }
  };
  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Add Payment
        </Typography>
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Vendor</Typography>
              <StyledInput color="secondary" id="voucherno" />
            </Grid>
            {/* <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} /> */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Account</Typography>
              <StyledInput placeholder="Enter Account" id="account" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Email</Typography>
              <StyledInput placeholder="Enter Email" id="email" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'end' }}>
              <div>
                <p style={{ margin: '0px' }}>Amount Paid</p>
                <h2 style={{ margin: '5px' }}>₹ 100.00</h2>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Payment Date</Typography>
              <StyledInput type="date" id="paymentdate" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Mode</Typography>
              <StyledInput placeholder="Enter Mode" id="mode" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Reference No.</Typography>
              <StyledInput placeholder="Enter Reference No." id="refno" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Paid from</Typography>
              <StyledInput placeholder="Enter Paid from" id="paidfrom" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Amount Paid (₹)</Typography>
              <StyledInput placeholder="Enter Amount" id="amount" fullWidth />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ margin: '12px 0px', fontWeight: '300' }}>
              Outstanding transactions
            </Typography>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Find Bill No.</Typography>
              <StyledInput placeholder="Find Bill No." id="billno" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Bill From Date</Typography>
              <StyledInput type="date" id="billfromdate" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Bill From To</Typography>
              <StyledInput type="date" id="billtodate" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <div style={{ display: 'flex', margin: '25px 0px' }}>
                <button
                  style={{
                    width: '100%',
                    color: '#425466',
                    padding: '8px',
                    borderColor: '#425466',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    marginRight: '5px'
                  }}
                  onClick={handlecreatepayment}
                >
                  save
                </button>
                <button
                  style={{
                    width: '100%',
                    color: 'white',
                    padding: '8px',
                    backgroundColor: 'lightgrey',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    marginRight: '5px'
                  }}
                >
                  reset
                </button>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={{ overflowX: 'auto', maxHeight: '300px', maxWidth: '100%' }}>
              <Table>
                <TableHead>
                  <TableCell width={420} sx={{ fontSize: '12px' }}>
                    DESCRIPTION
                  </TableCell>
                  <TableCell width={420} sx={{ fontSize: '12px' }}>
                    DUE DATE
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>ORIGINAL AMOUNT</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DUE AMOUNT</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>PAYMENT</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DISCOUNT AMOUNT</TableCell>
                </TableHead>
                {/* <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.srNo}>
                      <TableCell>
                        <StyledInput
                          placeholder="Enter Sr.No."
                          value={row.srNo}
                          onChange={(e) => handleInputChange(row.srNo, 'srNo', e.target.value)}
                        />
                      </TableCell>
                      <TableCell width={420}>
                        <StyledInput
                          placeholder="Enter nature of expense"
                          // value={row.natureofexpencse}
                          fullWidth
                          onChange={(e) => handleInputChange(row.natureofexpencse, 'natureofexpencse', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledInput
                          placeholder="description"
                          // value={row.description}
                          fullWidth
                          onChange={(e) => handleInputChange(row.description, 'description', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledInput
                          placeholder="Rate"
                          // value={row.rate}
                          onChange={(e) => handleInputChange(row.rate, 'rate', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledInput
                          placeholder="Amount"
                          // value={row.amount}
                          onChange={(e) => handleInputChange(row.amount, 'amount', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <DeleteIcon onClick={() => handleDeleteRow(row.srNo)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </div>
          </Grid>
          {/* <Grid item xs={12}>
            <button
              style={{
                width: '100px',
                color: '#425466',
                borderColor: '#425466',
                padding: '2px',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '5px',
                lineHeight: '19px',
                marginTop: '5px'
              }}
              onClick={handleAddRow}
            >
              <AddIcon sx={{ fontSize: '18px' }} /> Add Row
            </button>
          </Grid> */}
          <Grid item xs={12}>
            {isMobile ? (
              // For mobile screens, show each total on separate lines
              <>
                <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <p>AMOUNT TO CREDIT</p>
                  <p>₹0.00</p>
                </div>
                <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <p>AMOUNT TO APPLY</p>
                  <p>₹0.00</p>
                </div>
              </>
            ) : (
              // For larger screens, show all totals on one line
              <div style={{ float: 'right', width: '30%' }}>
                <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                  <p>AMOUNT TO CREDIT</p>
                  <p>₹0.00</p>
                </div>
                <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                  <p>AMOUNT TO APPLY</p>
                  <p>₹0.00</p>
                </div>
              </div>
            )}
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <button
                  style={{
                    width: '100px',
                    color: '#425466',
                    padding: '8px',
                    borderColor: '#425466',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    marginRight: '5px'
                  }}
                >
                  Cancel
                </button>
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
                  onClick={handlecreatepayment}
                >
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
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
              <div style={{ display: 'flex' }}>
                <button
                  style={{
                    width: '130px',
                    color: '#425466',
                    padding: '8px',
                    borderColor: '#425466',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    marginRight: '10px'
                  }}
                  onClick={handlecreatepayment}
                >
                  Save & Next
                </button>
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
                  onClick={handlecreatepayment}
                >
                  Save
                </button>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </Paper>
  );
};

export default PaymentPage;
