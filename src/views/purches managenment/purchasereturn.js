import React, { useState } from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableHead, TableCell } from '@mui/material';
import { withStyles } from '@mui/styles';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorTemporaryDrawer from '../../component/customerqutation';
import { useMediaQuery } from '@mui/material';
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
  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.value === 'customer') {
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
    }
  };
  const options = [
    {
      value: 'customer',
      label: 'create new customer'
    }
  ];

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
              <Select color="secondary" options={options} onChange={handleSelectChange} />
            </Grid>
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
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
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <p>Taxable Amt</p>
                  <p>₹0.00</p>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <p>SGST</p>
                  <p>₹0.00</p>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
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
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <p>Taxable Amt</p>
                  <p>₹0.00</p>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <p>SGST</p>
                  <p>₹0.00</p>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
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

export default Purchasereturn;
