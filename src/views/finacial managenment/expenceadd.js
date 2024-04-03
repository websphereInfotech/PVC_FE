import React, { useState } from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { withStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import Select from 'react-select';
import AnchorTemporaryDrawer from '../../component/customerqutation';
import Expencedrawer from 'component/expencecreate';

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

const AddExpense = () => {
  const [rows, setRows] = useState([{ srNo: 1, natureofexpencse: '', description: '', rate: '', amount: '' }]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);

  const handleAddRow = () => {
    const newRow = { srNo: rows.length + 1, natureofexpencse: '', description: '', rate: '', amount: '' };
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
    if (selectedOption && selectedOption.value === 'customer') {
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
    }
  };
  const handleSelectproductChange = (selectedOption) => {
    if (selectedOption && selectedOption.value === 'product') {
      setIsproductDrawerOpen(true);
    } else {
      setIsproductDrawerOpen(false);
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
      label: 'create new expence'
    }
  ];

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Add Expense
        </Typography>
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            {/* First row containing the first 4 grid inputs */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Customer</Typography>
              <Select color="secondary" options={options} onChange={handleSelectChange} />
            </Grid>
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Voucher No.</Typography>
              <StyledInput placeholder="Enter Voucher number" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Date</Typography>
              <StyledInput type="date" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">GSTIN</Typography>
              <StyledInput placeholder="Enter GSTIN" fullWidth />
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            {/* Second row containing the next 5 grid inputs */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Mobile No.</Typography>
              <StyledInput placeholder="Enter Mobile number" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Email</Typography>
              <StyledInput placeholder="Enter Email" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Bill No.</Typography>
              <StyledInput placeholder="Enter Bill No." fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Bill Date</Typography>
              <StyledInput type="date" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Payment Method</Typography>
              <StyledInput placeholder="Enter Payment Method" fullWidth />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={{ overflowX: 'auto', maxHeight: '300px', maxWidth: '100%' }}>
              <Table>
                <TableHead>
                  <TableCell sx={{ fontSize: '12px' }}>SR.NO.</TableCell>
                  <TableCell width={420} sx={{ fontSize: '12px' }}>
                    NATURE OF EXPENSE
                  </TableCell>
                  <TableCell width={420} sx={{ fontSize: '12px' }}>
                    DESCRIPTION
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>TAXABLE AMT. (₹)</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>AMOUNT (₹)</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.srNo}>
                      <TableCell>
                        <StyledInput
                          placeholder="Enter Sr.No."
                          value={row.srNo}
                          onChange={(e) => handleInputChange(row.srNo, 'srNo', e.target.value)}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '5px' }}>
                        <Select color="secondary" options={product} onChange={handleSelectproductChange} />
                      </TableCell>
                      <Expencedrawer open={isproductDrawerOpen} onClose={() => setIsproductDrawerOpen(false)} />
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
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
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

export default AddExpense;
