import React, { useState } from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableCell, TableBody, TableRow, Card } from '@mui/material';
import { withStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
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

const AddCompanyForm = () => {
  const [rows, setRows] = useState([{ srNo: 1, account: '', description: '', debit: '', credit: '' }]);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleAddRow = () => {
    const newRow = { srNo: rows.length + 1, account: '', description: '', debit: '', credit: '' };
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
  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Create Account
        </Typography>
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            {/* First row containing the first 4 grid inputs */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Under group</Typography>
              <StyledInput placeholder="Gv001" fullWidth />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            {/* First row containing the first 4 grid inputs */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Account Name</Typography>
              <StyledInput placeholder="Gv001" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Shorts/Alias Name</Typography>
              <StyledInput type="date" fullWidth />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            {/* First row containing the first 4 grid inputs */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Email</Typography>
              <StyledInput placeholder="example@gmail.com" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Contact person name</Typography>
              <StyledInput placeholder="Enter name" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Mobile No.</Typography>
              <StyledInput placeholder="Mobile no." fullWidth />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">PAN/IT/TAN No.</Typography>
              <StyledInput placeholder="BJXXXXAJ" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Default Credit Period (In days)</Typography>
              <StyledInput placeholder="Default Credit Period (In days)" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Mode</Typography>
              <StyledInput placeholder="cheque" fullWidth />
            </Grid>
          </Grid>
          <Typography variant="h5" align="center" gutterBottom>
            Mailing Details
          </Typography>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Address 1</Typography>
              <StyledInput placeholder="Floor NO.,Building Name" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Address 2</Typography>
              <StyledInput placeholder="Near by Location" fullWidth />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Country</Typography>
              <StyledInput placeholder="Country" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Pincode</Typography>
              <StyledInput placeholder="Pincode" fullWidth />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">State</Typography>
              <StyledInput placeholder="State" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">City</Typography>
              <StyledInput placeholder="city" fullWidth />
            </Grid>
          </Grid>
          <Card sx={{ padding: '15px' }}>
            <Grid item xs={12} sm={6} md>
              <div style={{ overflowX: 'auto' }}>
                <Typography variant="h6" align="left" gutterBottom>
                  Custom Feild
                </Typography>
                <Table>
                  <TableCell>Lable</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.srNo}>
                        <TableCell>
                          <StyledInput
                            // full
                            placeholder="Enter label"
                            onChange={(e) => handleInputChange(row.lable, 'label', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <StyledInput
                            placeholder="Enter value"
                            // value={row.account}
                            fullWidth
                            onChange={(e) => handleInputChange(row.value, 'value', e.target.value)}
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
          </Card>
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
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ marginTop: '15px' }}>
              Opening Balance
            </Typography>
            <StyledInput placeholder="₹0" fullWidth />
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
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0px' }}>
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

export default AddCompanyForm;
