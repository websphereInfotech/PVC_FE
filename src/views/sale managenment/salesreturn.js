import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableHead, TableCell } from '@mui/material';
import { withStyles } from '@mui/styles';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorTemporaryDrawer from '../../component/customeradd';
import { useMediaQuery } from '@mui/material';
import { fetchAllCustomers } from 'store/thunk';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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

const Salesreturn = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [customer, setcustomer] = useState([]);
  const [selectcustomer, setSelectcustomer] = useState([]);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'create new customer') {
      setIsDrawerOpen(true);
      // console.log(isDrawerOpen, 'open');
    } else {
      console.log(selectcustomer, 'customers>?????/??????????');
      setSelectcustomer(selectedOption.label);
      setIsDrawerOpen(false);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllCustomers());
        if (Array.isArray(response)) {
          setcustomer(response);
          // console.log(response, 'customer>>>>>>>>>>>>>>>>>>>>>>>>>>');
        }
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  // const handlecreatesalesreturn = async () => {
  //   try {
  //     const challanno = document.getElementById('challanno').value;
  //     const date = document.getElementById('date').value;
  //     const email = document.getElementById('email').value;
  //     const mobileno = document.getElementById('mobileno').value;

  //     const Salesreturndata = {
  //       challanno,
  //       date,
  //       email,
  //       mobileno,
  //       customer: selectcustomer
  //     };

  //     dispatch(createDeliveryChallanItem(Salesreturndata));
  //     alert('Sales return created successfully');
  //   } catch (error) {
  //     console.error('Error creating Sales return:', error);
  //     alert('Failed to create Sales return');
  //   }
  // };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Create Sales Return
        </Typography>
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Customer</Typography>
              <Select
                color="secondary"
                options={
                  Array.isArray(customer)
                    ? [
                        {
                          value: 'customer',
                          label: 'create new customer'
                        },
                        ...customer.map((customers) => ({ value: customers.id, label: customers.shortname }))
                      ]
                    : []
                }
                onChange={(selectedOption) => handleSelectChange(selectedOption)}
              />
            </Grid>
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Credit Note No.</Typography>
              <StyledInput placeholder="CN0102" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Credit Note Date</Typography>
              <StyledInput type="date" fullWidth />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>Sr.NO.</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>PRODUCT</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>BATCH NO.</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px', width: '150px' }}>EXPR.DATE</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>MRP</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>INVOICE NO</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>INVOICE DATE</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px', width: '150px' }}>INVOICE QTY</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>QTY</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>RATE (₹)</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>TAXABLE AMT</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>GST RATE(%)</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>CESS(%)</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>AMOUNT (₹)</TableCell>
                  {/* <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell> */}
                </TableHead>
              </Table>
              <p style={{ display: 'flex', justifyContent: 'center' }}>You have not select any customer!</p>
            </div>
          </Grid>
          <Grid item xs={12}>
            {isMobile ? (
              <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                <Typography variant="subtitle1">SUBTOTAL: ₹10.00</Typography>
              </div>
            ) : (
              <Table>
                <TableHead>
                  <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%' }}>
                      <Typography variant="subtitle1">SUBTOTAL</Typography>
                      <Typography variant="subtitle1" style={{ paddingRight: '5px' }}>
                        ₹0.00
                      </Typography>
                      <Typography variant="subtitle1" style={{ paddingRight: '5px' }}>
                        ₹0.00
                      </Typography>
                    </div>
                  </div>
                </TableHead>
              </Table>
            )}
          </Grid>

          <Grid item xs={12}>
            {isMobile ? (
              // For mobile screens, show each total on sepadebit lines
              <>
                <div id="btncs">
                  <p>Taxable Amt</p>
                  <p>₹0.00</p>
                </div>
                <div id="btncs">
                  <p>SGST</p>
                  <p>₹0.00</p>
                </div>
                <div id="btncs">
                  <p>CGST</p>
                  <p>₹0.00</p>
                </div>
                <div id="subtotalcs">
                  <p>Sub Total</p>
                  <p>₹0.00</p>
                </div>
              </>
            ) : (
              // For larger screens, show all totals on one line
              <div style={{ float: 'right', width: '30%' }}>
                <div id="btncs">
                  <p>Taxable Amt</p>
                  <p>₹0.00</p>
                </div>
                <div id="btncs">
                  <p>SGST</p>
                  <p>₹0.00</p>
                </div>
                <div id="btncs">
                  <p>CGST</p>
                  <p>₹0.00</p>
                </div>
                <div id="subtotalcs">
                  <p>Sub Total</p>
                  <p>₹0.00</p>
                </div>
              </div>
            )}
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/salesreturnlist" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  id="savebtncs"
                  // onClick={handlecreatesalesreturn}
                >
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/salesreturnlist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button
                  id="savebtncs"
                  style={{
                    marginRight: '10px'
                  }}
                  // onClick={handlecreatesalesreturn}
                >
                  Save & Next
                </button>
                <button
                  id="savebtncs"
                  // onClick={handlecreatesalesreturn}
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

export default Salesreturn;
