import React, { useState } from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { withStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import Select from 'react-select';
import AnchorTemporaryDrawer from '../../component/customeradd';
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

const GeneralPage = () => {
  const [rows, setRows] = useState([{ srNo: 1, account: '', description: '', debit: '', credit: '' }]);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleAddRow = () => {
    const newRow = { srNo: rows.length + 1, account: '', description: '', debit: '', credit: '' };
    setRows([...rows, newRow]);
  };
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
  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Create General Voucher
        </Typography>
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            {/* First row containing the first 4 grid inputs */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">GV No.</Typography>
              <StyledInput placeholder="Gv001" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">JV Date</Typography>
              <StyledInput type="date" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Reference No.</Typography>
              <StyledInput placeholder="AD/0102" fullWidth />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'end' }}>
              <div>
                <p style={{ margin: '0px' }}>credit Paid</p>
                <h2 style={{ margin: '5px' }}>₹ 100.00</h2>
              </div>
            </Grid> */}
          </Grid>

          <Grid item xs={12}>
            <div style={{ overflowX: 'auto', maxHeight: '300px', maxWidth: '100%' }}>
              <Table>
                <TableHead>
                  <TableCell sx={{ fontSize: '12px' }}>Sr.No.</TableCell>
                  <TableCell width={450} sx={{ fontSize: '12px' }}>
                    ACCOUNT
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px', width: '450px' }}>DESCRIPTION</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DEBIT (₹)</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>CREDIT (₹)</TableCell>
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
                      <TableCell>
                        <Select color="secondary" options={options} onChange={handleSelectChange} />
                        <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
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
                          placeholder="debit"
                          // value={row.debit}
                          onChange={(e) => handleInputChange(row.debit, 'debit', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledInput
                          placeholder="credit"
                          // value={row.credit}
                          onChange={(e) => handleInputChange(row.credit, 'credit', e.target.value)}
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
              // For mobile screens, show each total on sepadebit lines
              <>
                <div
                  style={{
                    borderBottom: '0.2px solid lightgrey',
                    borderTop: '0.2px solid lightgrey',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '5px 0px'
                  }}
                >
                  <p>Total Amt.</p>
                  <h3>₹0</h3>
                  <h3>₹0</h3>
                </div>
              </>
            ) : (
              // For larger screens, show all totals on one line
              <div style={{ float: 'right', width: '30%' }}>
                <div
                  style={{
                    borderBottom: '0.2px solid lightgrey',
                    borderTop: '0.2px solid lightgrey',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <p>Total Amt.</p>
                  <h3>₹0</h3>
                  <h3>₹0</h3>
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

export default GeneralPage;
