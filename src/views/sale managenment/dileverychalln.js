import React, { useState } from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { withStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import Select from 'react-select';
import AnchorTemporaryDrawer from './customerqutation';
import AnchorDeliverychallanProductDrawer from './deliverychallanproduct';
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

const Deliverychallan = () => {
  const [rows, setRows] = useState([{ srNo: 1, product: '', qty: '', rate: '', amount: '' }]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddRow = () => {
    const newRow = { srNo: rows.length + 1, product: '', qty: '', rate: '', amount: '' };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (srNo, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.srNo === srNo) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleDeleteRow = (srNo) => {
    const updatedRows = rows.filter((row) => row.srNo !== srNo);
    // Update serial numbers after deletion
    const updatedRowsWithSerialNumbers = updatedRows.map((row, index) => ({
      ...row,
      srNo: index + 1
    }));
    setRows(updatedRowsWithSerialNumbers);
  };
  const handleSelectChange = (selectedOption) => {
    if ((selectedOption && selectedOption.value === 'customer') || (selectedOption && selectedOption.value === 'product')) {
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
  const product = [
    {
      value: 'product',
      label: 'create new product'
    }
  ];
  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Create Delivery Challan
        </Typography>
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Customer</Typography>
              <Select color="secondary" options={options} onChange={handleSelectChange} />
            </Grid>
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Mobile No.</Typography>
              <StyledInput placeholder="Enter Mobile No." fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Email</Typography>
              <StyledInput placeholder="Enter Email Address" fullWidth />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Challan No.</Typography>
              <StyledInput placeholder="0001" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Challan Date</Typography>
              <StyledInput type="date" fullWidth />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div style={{ overflowX: 'auto', maxWidth: '100%', maxHeight: '300px' }}>
              <Table>
                <TableHead>
                  <TableCell sx={{ fontSize: '12px' }}>Sr.No.</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>QUOTATION NO.</TableCell>
                  <TableCell width={650} sx={{ fontSize: '12px' }}>
                    PRODUCT
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>BATCH NO.</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>EXP.DATE</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>MRP</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>QTY</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <React.Fragment key={row.srNo}>
                      <TableRow>
                        <TableCell sx={{ padding: '5px' }}>
                          <StyledInput
                            placeholder="Sr.No."
                            value={row.srNo}
                            readOnly
                            onChange={(e) => handleInputChange(row.srNo, 'srNo', e.target.value)}
                          />
                        </TableCell>
                        <TableCell sx={{ padding: '5px' }}>
                          <StyledInput
                            placeholder="Quotation no."
                            // value={row.srNo}
                            onChange={(e) => handleInputChange(row, 'srNo', e.target.value)}
                          />
                        </TableCell>
                        <TableCell sx={{ padding: '5px' }}>
                          <Select color="secondary" options={product} onChange={handleSelectChange} />
                        </TableCell>
                        <AnchorDeliverychallanProductDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
                        <TableCell sx={{ padding: '5px', display: 'flex', justifyContent: 'center' }}>N/A</TableCell>
                        <TableCell sx={{ padding: '5px' }}>
                          <StyledInput
                            placeholder="date"
                            // value={row.qty}
                            fullWidth
                            onChange={(e) => handleInputChange(row.qty, 'qty', e.target.value)}
                          />
                        </TableCell>
                        <TableCell sx={{ padding: '5px' }}>
                          <StyledInput
                            placeholder="0.00"
                            // value={row.rate}
                            onChange={(e) => handleInputChange(row.rate, 'rate', e.target.value)}
                          />
                        </TableCell>
                        <TableCell sx={{ padding: '5px' }}>
                          <StyledInput
                            placeholder="qty"
                            // value={row.amount}
                            onChange={(e) => handleInputChange(row.amount, 'amount', e.target.value)}
                          />
                        </TableCell>
                        <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                          <DeleteIcon onClick={() => handleDeleteRow(row.srNo)} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan={6} sx={{ padding: '5px' }}>
                          <StyledInput
                            placeholder="Enter product description"
                            // value={row.productDescription}
                            sx={{ width: '625px' }}
                            onChange={(e) => handleInputChange(row, 'productDescription', e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            {isMobile ? (
              // For mobile screens, show each total on separate lines
              <>
                <div
                  style={{
                    borderBottom: '0.2px solid lightgrey',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '5px 0px'
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
                    borderBottom: '0.2px solid lightgrey',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '5px 0px'
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

export default Deliverychallan;
