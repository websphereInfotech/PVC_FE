import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { withStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import Select from 'react-select';
import AnchorTemporaryDrawer from '../../component/customeradd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Expenseview,
  createExpense,
  createExpenseItem,
  // deleteExpense,
  fetchAllCustomers,
  updateExpense,
  updateExpenseItem
} from 'store/thunk';
import { useParams } from 'react-router-dom';

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
  const dispatch = useDispatch();
  const { id } = useParams();
  const [rows, setRows] = useState([{ srNo: '1', expensse: '', description: '', taxable: '', mrp: '' }]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [customer, setcustomer] = useState([]);
  const [selectcustomer, setSelectcustomer] = useState([]);
  // const [idMapping, setIdMapping] = useState({});
  const [formData, setFormData] = React.useState({
    voucherno: '',
    date: '',
    gstin: '',
    mobileno: '',
    email: '',
    billno: '',
    billdate: '',
    payment: ''
  });
  const handleAddRow = () => {
    const newRow = { srNo: (rows.length + 1).toString(), expensse: '', description: '', taxable: '', mrp: '' };
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
    // const id = idMapping[srNo];

    const updatedRows = rows.filter((row) => row.srNo !== srNo);
    // Update serial numbers after deletion
    const updatedRowsWithSerialNumbers = updatedRows.map((row, index) => ({
      ...row,
      srNo: index + 1
    }));
    setRows(updatedRowsWithSerialNumbers);
    // console.log('id', id);
    dispatch(deleteExpense(id));
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.value === 'new') {
      setIsDrawerOpen(true);
      // console.log(isDrawerOpen, 'open');
    } else {
      console.log(setSelectcustomer, 'customers>???????????????');
      // setSelectcustomer(selectedOption.label);
      setFormData({ ...formData, customer: selectedOption.label });
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customers = await dispatch(fetchAllCustomers());
        if (Array.isArray(customers)) {
          const options = customers.map((customer) => ({ value: customer.id, label: customer.shortname }));
          setcustomer([{ value: 'new', label: 'Create New Customer' }, ...options]);
          // console.log(response, 'customer>>>>>>>>>>>>>>>>>>>>>>>>>>');
        } else {
          console.error('fetchAllCustomers returned an unexpected response:', response);
        }
        if (id) {
          const response = await dispatch(Expenseview(id));
          const { customer, voucherno, date, gstin, mobileno, email, billno, billdate, payment } = response;
          setFormData({ customer, voucherno, date, gstin, mobileno, email, billno, billdate, payment });

          const expenseItems = response.expenseItems;
          // console.log("res@@@@@@@@",response.expenseItems[1].id);
          const updatedRows = expenseItems.map((item, index) => ({
            // const rowId = index + 1;
            // const { id } = item;
            // setIdMapping((prevState) => ({ ...prevState, [rowId]: id }));
            // return {
            // id: rowId,
            // srNo: rowId,
            srNo: index + 1,
            expensse: item.expensse,
            description: item.description,
            taxable: item.taxable,
            mrp: item.mrp
            // };
          }));
          // console.log('update', updatedRows);
          setRows(updatedRows);
        }
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };
    fetchData();
  }, [dispatch, id]);
  const handleSave = async () => {
    try {
      if (id) {
        console.log('id', id);
        await dispatch(updateExpense(id, formData));
        // console.log('response', response);

        for (const row of rows) {
          const updateData = {
            serialno: row.srNo,
            expensse: row.expensse,
            description: row.description,
            taxable: row.taxable,
            mrp: row.mrp
          };
          // const id = row.id;

          console.log('updateData$$$$$$', updateData);
          dispatch(updateExpenseItem(id, updateData));
        }
      } else {
        const data = {
          ...formData,
          customer: selectcustomer
        };
        // console.log(data,"data@@@@@@@@@@@@@@@@@");
        const expenceData = await dispatch(createExpense(data));
        // console.log('expense', expenceData);
        const expenseId = expenceData.data.data.id;
        // console.log(Id, 'id>>>>>>>>>>>>>>>');
        const payload = {
          expenseId,
          items: rows.map((row) => ({
            serialno: row.srNo,
            expensse: row.expensse,
            description: row.description,
            taxable: row.taxable,
            mrp: row.mrp
          }))
        };
        dispatch(createExpenseItem(payload));
        alert('expence add successfully');
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Expense
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Add Expense
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            {/* First row containing the first 4 grid inputs */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Customer</Typography>
              <Select
                color="secondary"
                // options={
                //   Array.isArray(customer)
                //     ? [
                //         {
                //           value: 'customer',
                //           label: 'create new customer'
                //         },
                //         ...customer.map((customers) => ({ value: customers.id, label: customers.shortname }))
                //       ]
                //     : []
                // }
                options={customer}
                value={{ label: formData.customer }}
                onChange={handleSelectChange}
              />
            </Grid>
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Voucher No.</Typography>
              <StyledInput placeholder="Enter Voucher number" id="voucherno" value={formData.voucherno} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Date</Typography>
              <StyledInput type="date" id="date" value={formData.date ? formData.date.split('T')[0] : ''} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">GSTIN</Typography>
              <StyledInput placeholder="Enter GSTIN" id="gstin" value={formData.gstin} onChange={handleChange} />
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            {/* Second row containing the next 5 grid inputs */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Mobile No.</Typography>
              <StyledInput placeholder="Enter Mobile number" id="mobileno" value={formData.mobileno} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Email</Typography>
              <StyledInput placeholder="Enter Email" id="email" value={formData.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Bill No.</Typography>
              <StyledInput placeholder="Enter Bill No." id="billno" value={formData.billno} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Bill Date</Typography>
              <StyledInput type="date" id="billdate" value={formData.billdate} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Payment Method</Typography>
              <StyledInput placeholder="Enter Payment Method" id="payment" value={formData.payment} onChange={handleChange} />
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
                      <TableCell>
                        <StyledInput
                          placeholder="Enter"
                          value={row.expensse}
                          onChange={(e) => handleInputChange(row.srNo, 'expensse', e.target.value)}
                        />
                      </TableCell>
                      {/* <TableCell sx={{ padding: '5px' }}>
                        <Select color="secondary" options={product} onChange={handleSelectproductChange} />
                      </TableCell>
                      <Expencedrawer open={isproductDrawerOpen} onClose={() => setIsproductDrawerOpen(false)} /> */}
                      <TableCell>
                        <StyledInput
                          placeholder="description"
                          value={row.description}
                          onChange={(e) => handleInputChange(row.srNo, 'description', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledInput
                          placeholder="Rate"
                          value={row.taxable}
                          onChange={(e) => handleInputChange(row.srNo, 'taxable', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <StyledInput
                          placeholder="Amount"
                          value={row.mrp}
                          onChange={(e) => handleInputChange(row.srNo, 'mrp', e.target.value)}
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
          {id ? (
            ''
          ) : (
            <Grid item xs={12}>
              <button id="buttoncs" onClick={handleAddRow}>
                <AddIcon sx={{ fontSize: '18px' }} /> Add Row
              </button>
            </Grid>
          )}
          <Grid item xs={12}>
            {isMobile ? (
              // For mobile screens, show each total on separate lines
              <>
                <div id="subtotalcs" style={{ margin: '0px' }}>
                  <p>Taxable Amt.</p>
                  <p>₹0.00</p>
                </div>
                <div id="subtotalcs" style={{ margin: '0px' }}>
                  <p>Sub Total</p>
                  <p>₹0.00</p>
                </div>
                <div id="subtotalcs" style={{ margin: '0px' }}>
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
                <Link to="/expenselist" style={{ textDecoration: 'none' }}>
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
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Link to="/expenselist" style={{ textDecoration: 'none' }}>
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
                <button id="savebtncs" onClick={handleSave}>
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
