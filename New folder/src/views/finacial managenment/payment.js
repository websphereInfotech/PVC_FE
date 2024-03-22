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

const PaymentPage = () => {
  // const [rows, setRows] = useState([{ srNo: 1, natureofexpencse: '', description: '', rate: '', amount: '' }]);
  const isMobile = useMediaQuery('(max-width:600px)');

  // const handleAddRow = () => {
  //   const newRow = { srNo: rows.length + 1, natureofexpencse: '', description: '', rate: '', amount: '' };
  //   setRows([...rows, newRow]);
  // };

  // const handleInputChange = (srNo, field, value) => {
  //   const updatedRows = rows.map((row) => {
  //     if (row.srNo === srNo) {
  //       return { ...row, [field]: value };
  //     }
  //     return row;
  //   });
  //   setRows(updatedRows);
  // };

  // const handleDeleteRow = (srNo) => {
  //   const updatedRows = rows.filter((row) => row.srNo !== srNo);
  //   // Update serial numbers after deletion
  //   const updatedRowsWithSerialNumbers = updatedRows.map((row, index) => ({
  //     ...row,
  //     srNo: index + 1
  //   }));
  //   setRows(updatedRowsWithSerialNumbers);
  // };
  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Add Payment
        </Typography>
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            {/* First row containing the first 4 grid inputs */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Voucher No.</Typography>
              <StyledInput placeholder="Enter Voucher No." fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Account</Typography>
              <StyledInput placeholder="Enter Account" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Email</Typography>
              <StyledInput placeholder="Enter Email" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'end' }}>
              <div>
                <p style={{ margin: '0px' }}>Amount Paid</p>
                <h2 style={{ margin: '5px' }}>₹ 100.00</h2>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            {/* Second row containing the next 5 grid inputs */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Payment Date</Typography>
              <StyledInput type="date" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Mode</Typography>
              <StyledInput placeholder="Enter Mode" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Reference No.</Typography>
              <StyledInput placeholder="Enter Reference No." fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Paid from</Typography>
              <StyledInput placeholder="Enter Paid from" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Amount Paid (₹)</Typography>
              <StyledInput placeholder="Enter Amount" fullWidth />
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
              <StyledInput placeholder="Find Bill No." fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Bill From Date</Typography>
              <StyledInput type="date" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Bill From To</Typography>
              <StyledInput type="date" fullWidth />
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

export default PaymentPage;
