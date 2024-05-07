import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableHead, TableCell } from '@mui/material';
import { withStyles } from '@mui/styles';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useMediaQuery } from '@mui/material';
import AnchorVendorDrawer from 'component/vendor';
import { useDispatch } from 'react-redux';
import { fetchAllVendors } from 'store/thunk';
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

const Purchasereturn = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [vendor, setVendor] = useState([]);
  // const [selectcustomer, setSelectcustomer] = useState([]);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Vendor') {
      setIsDrawerOpen(true);
    } else {
      // console.log(setSelectcustomer);
      setIsDrawerOpen(false);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllVendors());
        if (Array.isArray(response)) {
          const options = response.map((vendor) => ({ value: vendor.id, label: vendor.shortname }));
          setVendor([{ value: 'new', label: 'Create New Vendor' }, ...options]);
        }
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Create Purchase Return
        </Typography>
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Vendor</Typography>
              <Select color="secondary" options={vendor} onChange={handleSelectChange} />
            </Grid>
            <AnchorVendorDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Debit Note No.</Typography>
              <StyledInput placeholder="CN0102" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Debit Note Date</Typography>
              <StyledInput type="date" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Reference No.</Typography>
              <StyledInput placeholder="AD00/02" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Reference Date</Typography>
              <StyledInput type="date" fullWidth />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>Sr.NO.</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px', width: '180px' }}>PRODUCT</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '0px' }}>BATCH NO.</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '0px', width: '150px' }}>EXPR.DATE</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>MRP</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px', width: '150px' }}>Bill NO</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>Bill DATE</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>Bill QTY</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>QTY</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>RATE (₹)</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>TAXABLE AMT</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>CESS(%)</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>AMOUNT (₹)</TableCell>
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
                <div
                  style={{
                    borderBottom: '0.2px solid lightgrey',
                    borderTop: '0.2px solid lightgrey',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
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
                <div
                  id="subtotalcs"
                  style={{
                    borderTop: '0.2px solid lightgrey',
                    margin: '0px'
                  }}
                >
                  <p>Sub Total</p>
                  <p>₹0.00</p>
                </div>
              </div>
            )}
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/purchasereturnList" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button id="savebtncs">Save</button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/purchasereturnList" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button
                  id="savebtncs"
                  style={{
                    marginRight: '10px'
                  }}
                >
                  Save & Next
                </button>
                <button id="savebtncs">Save</button>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </Paper>
  );
};

export default Purchasereturn;
