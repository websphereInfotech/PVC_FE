import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell } from '@mui/material';
// import { withStyles } from '@mui/styles';
// import Select from 'react-select';
// import AnchorTemporaryDrawer from '../../component/customerqutation';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { createPayment, paymentview, updatePayment } from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
// Custom styled input component
// const input = withStyles((theme) => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3)
//     }
//   },
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.common.white,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     width: '100%',
//     padding: '10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     '&:focus': {
//       boxShadow: `${theme.palette.secondary.main} 0 0 0 0.5px`,
//       borderColor: theme.palette.secondary.main
//     }
//   }
// }))(InputBase);

const PaymentPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    voucherno: '',
    account: '',
    email: '',
    paymentdate: '',
    mode: '',
    refno: '',
    paidfrom: '',
    amount: '',
    billno: '',
    billfromdate: '',
    billtodate: ''
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",id);
          const viewPayment = await dispatch(paymentview(id));
          setFormData(viewPayment);
          // console.log(viewPayment);
        }
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    };
    fetchData();
  }, [dispatch, id]);
  const handlecreatepayment = async () => {
    try {
      if (id) {
        await dispatch(updatePayment(id, formData));
        // console.log('update', upadtePaymentData);
        alert('Paymentdata updted successfully');
        navigate('/paymentlist');
      } else {
        await dispatch(createPayment(formData));
        // console.log('data>>>>', Paymentdata);
        alert('Paymentdata created successfully');
        navigate('/paymentlist');
      }
    } catch (error) {
      console.error('Error creating Paymentdata:', error);
      alert('Failed to create Paymentdata');
    }
  };
  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Payment
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Add Payment
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Vendor : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                color="secondary"
                id="voucherno"
                value={formData.voucherno}
                onChange={(e) => handleInputChange('voucherno', e.target.value)}
              />
            </Grid>
            {/* <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} /> */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Account : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Account"
                id="account"
                value={formData.account}
                onChange={(e) => handleInputChange('account', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Email : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'end' }}>
              {/* <div>
                <p style={{ margin: '0px' }}>Amount Paid</p>
                <h2 style={{ margin: '5px' }}>₹ 100.00</h2>
              </div> */}
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">
                Payment Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                type="date"
                id="paymentdate"
                value={formData.paymentdate ? formData.paymentdate.split('T')[0] : ''}
                onChange={(e) => handleInputChange('paymentdate', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">
                Mode : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input placeholder="Enter Mode" id="mode" value={formData.mode} onChange={(e) => handleInputChange('mode', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">
                Reference No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                id="refno"
                placeholder="Enter Reference No."
                value={formData.refno}
                onChange={(e) => handleInputChange('refno', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">
                Paid from : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                id="paidfrom"
                placeholder="Enter Paid from"
                value={formData.paidfrom}
                onChange={(e) => handleInputChange('paidfrom', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">
                Amount Paid (₹): <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                id="amount"
                placeholder="Enter Amount"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ margin: '12px 0px', fontWeight: '300' }}>
              Outstanding transactions
            </Typography>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">
                Find Bill No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Find Bill No."
                id="billno"
                value={formData.billno}
                onChange={(e) => handleInputChange('billno', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Bill From Date</Typography>
              <input
                type="date"
                id="billfromdate"
                value={formData.billfromdate ? formData.billfromdate.split('T')[0] : ''}
                onChange={(e) => handleInputChange('billfromdate', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Bill From To</Typography>
              <input
                type="date"
                id="billtodate"
                value={formData.billtodate ? formData.billtodate.split('T')[0] : ''}
                onChange={(e) => handleInputChange('billtodate', e.target.value)}
              />
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
                        <input
                          placeholder="Enter Sr.No."
                          value={row.srNo}
                          onChange={(e) => handleInputChange(row.srNo, 'srNo', e.target.value)}
                        />
                      </TableCell>
                      <TableCell width={420}>
                        <input
                          placeholder="Enter nature of expense"
                          // value={row.natureofexpencse}
                          fullWidth
                          onChange={(e) => handleInputChange(row.natureofexpencse, 'natureofexpencse', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          placeholder="description"
                          // value={row.description}
                          fullWidth
                          onChange={(e) => handleInputChange(row.description, 'description', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          placeholder="Rate"
                          // value={row.rate}
                          onChange={(e) => handleInputChange(row.rate, 'rate', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <input
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
                <Link to="/paymentlist" style={{ textDecoration: 'none' }}>
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
                </Link>
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
                <Link to="/paymentlist" style={{ textDecoration: 'none' }}>
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
                </Link>
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
