import React from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableHead, TableCell } from '@mui/material';
import { withStyles } from '@mui/styles';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
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

const StockManagement = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Add Stock Adjust
        </Typography>
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Doc No.</Typography>
              <StyledInput placeholder="ADJ0102" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Entry Date</Typography>
              <StyledInput type="date" fullWidth />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableCell sx={{ fontSize: '12px', padding: '8px', width: '200px' }}>ITEM NAME</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>UNIT</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>COMPU. STK.</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>BATCH NO.</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>PHYSICAL STK.</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>ADJ.QTY</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>ADJUST COMMENT</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>WASTAGE QTY</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>WASTAGE COMMENT</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>CONSUME QTY</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>CONSUME COMMENT</TableCell>
                  {/* <TableCell sx={{ fontSize: '12px', padding: '8px' }}>TAXABLE AMT</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>GST RATE(%)</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>CESS(%)</TableCell>
                  <TableCell sx={{ fontSize: '12px', padding: '8px' }}>AMOUNT (₹)</TableCell> */}
                  {/* <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell> */}
                </TableHead>
              </Table>
              <p style={{ display: 'flex', justifyContent: 'center' }}>No item created yet</p>
            </div>
          </Grid>
          {/* <Grid item xs={12}>
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
          </Grid> */}
          {/* 
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
          </Grid> */}

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
                {/* <button
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
                </button> */}
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

export default StockManagement;
