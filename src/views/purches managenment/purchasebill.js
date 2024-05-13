import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { withStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorProductDrawer from '../../component/productadd';
import AnchorTemporaryDrawer from '../../component/customeradd';
import { useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createPurchaseBill, createPurchaseBillItem, fetchAllProducts, fetchAllCustomers } from 'store/thunk';
import { Link, useNavigate } from 'react-router-dom';
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

const Purchasebill = () => {
  const [rows, setRows] = useState([{ srNo: '1', productService: '', qty: '', rate: '', mrp: '' }]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [customer, setcustomer] = useState([]);
  const [selectcustomer, setSelectcustomer] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectproduct, setSelectproduct] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  const handleAddRow = () => {
    const newRow = { srNo: (rows.length + 1).toString(), productService: '', qty: '', rate: '', mrp: '' };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (srNo, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.srNo === srNo) {
        const newValue = parseFloat(value);
        return { ...row, [field]: newValue };
      }
      return row;
    });

    updatedRows.forEach((row) => {
      const amount = row.qty * row.mrp * row.rate; // Calculate amount for the current row only
      row.amount = Number.isNaN(amount) ? 0 : amount;
    });

    const newSubtotal = updatedRows.reduce((acc, row) => acc + row.amount, 0);
    setSubtotal(Number.isNaN(newSubtotal) ? 0 : newSubtotal);
    setRows(updatedRows);
  };

  const handleDeleteRow = async (srNo) => {
    const deletedRow = rows.find((row) => row.srNo === srNo);
    if (!deletedRow) return;

    const updatedRows = rows.filter((row) => row.srNo !== srNo);
    const updatedRowsWithSerialNumbers = updatedRows.map((row, index) => ({
      ...row,
      srNo: index + 1
    }));

    const deletedAmount = deletedRow.amount;
    const newSubtotal = subtotal - deletedAmount;

    setRows(updatedRowsWithSerialNumbers);
    setSubtotal(newSubtotal < 0 ? 0 : newSubtotal);
  };
  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'create new customer') {
      setIsDrawerOpen(true);
      console.log(isDrawerOpen, 'open');
    } else {
      // console.log(selectcustomer, 'customers>???????????????');
      setSelectcustomer(selectedOption.label);
      setIsDrawerOpen(false);
    }
  };

  const handleSelectproductChange = (selectedOption, srNo) => {
    // console.log("selected>>>>>",selectedOption);
    console.log(selectproduct);
    if (selectedOption && selectedOption.label === 'create new product') {
      setIsproductDrawerOpen(true);
    } else {
      const updatedRows = rows.map((row) => {
        if (row.srNo === srNo) {
          return { ...row, product: selectedOption.label };
        }
        return row;
      });
      setRows(updatedRows);
      setSelectproduct(selectedOption.label);
      setIsproductDrawerOpen(false);
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
        const productResponse = await dispatch(fetchAllProducts());
        if (Array.isArray(productResponse)) {
          setProduct(productResponse);
          // console.log(productResponse, '????????????');
        } else {
          console.error('fetchAllProducts returned an unexpected response:', productResponse);
        }
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handlePurchaseBill = async () => {
    try {
      const mobileno = document.getElementById('mobileno').value;
      const email = document.getElementById('email').value;
      const date = document.getElementById('date').value;
      const billno = document.getElementById('billno').value;
      const terms = document.getElementById('terms').value;
      const duedate = document.getElementById('duedate').value;
      const book = document.getElementById('book').value;
      const pono = document.getElementById('pono').value;

      const purchaseData = {
        vendor: selectcustomer,
        mobileno,
        email,
        billdate: date,
        billno,
        terms,
        duedate,
        book,
        pono
      };
      const createdPurchase = await dispatch(createPurchaseBill(purchaseData));
      console.log('data>>>>', createdPurchase);
      const purchasebillId = createdPurchase.data.data.id;
      const payload = {
        purchasebillId,
        items: rows.map((row) => ({
          product: row.product,
          rate: row.rate,
          mrp: row.mrp,
          qty: row.qty
        }))
      };
      dispatch(createPurchaseBillItem(payload));
      console.log(payload);
      alert('Purchase bill created successfully');
      navigate('/purchasebillList');
    } catch (error) {
      console.error('Error creating Purchase:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" gutterBottom id="mycss">
        Create Purchase Bill
      </Typography>
      <Grid container spacing={2} sx={{ padding: '0px 20px' }}>
        <Grid container spacing={3}>
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
            <Typography variant="subtitle1">Mobile No.</Typography>
            <StyledInput placeholder="Enter Mobile number" id="mobileno" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Email</Typography>
            <StyledInput placeholder="Enter Email" id="email" fullWidth />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Bill Date</Typography>
            <StyledInput type="date" id="date" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Bill No</Typography>
            <StyledInput placeholder="Enter Bill No" id="billno" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Terms (Days)</Typography>
            <StyledInput placeholder="Enter Terms (Days)" id="terms" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Due Date</Typography>
            <StyledInput type="date" id="duedate" fullWidth />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Book</Typography>
            <StyledInput placeholder="Enter Terms (Days)" id="book" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">PO No</Typography>
            <StyledInput placeholder="Enter PO No." id="pono" fullWidth />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <div style={{ overflowX: 'auto', maxHeight: '300px', maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableCell sx={{ fontSize: '12px' }}>SR.NO.</TableCell>
                <TableCell width={420} sx={{ fontSize: '12px' }}>
                  PRODUCT/SERVICE
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>QTY</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>RATE (₹)</TableCell>
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
                      <Select
                        color="secondary"
                        options={
                          Array.isArray(product)
                            ? [
                                {
                                  value: 'product',
                                  label: 'create new product'
                                },
                                ...product.map((products) => ({ value: products.id, label: products.productname }))
                              ]
                            : []
                        }
                        onChange={(selectedOption) => handleSelectproductChange(selectedOption, row.srNo)}
                      />
                    </TableCell>
                    <AnchorProductDrawer open={isproductDrawerOpen} onClose={() => setIsproductDrawerOpen(false)} />
                    <TableCell>
                      <StyledInput
                        placeholder="qty"
                        // value={row.qty}
                        onChange={(e) => handleInputChange(row.srNo, 'qty', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <StyledInput
                        placeholder="Rate"
                        // value={row.rate}
                        onChange={(e) => handleInputChange(row.srNo, 'rate', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <StyledInput
                        placeholder="Amount"
                        // value={row.amount}
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
        <Grid item xs={12}>
          <button id="buttoncs" onClick={handleAddRow}>
            <AddIcon sx={{ fontSize: '18px' }} /> Add Row
          </button>
        </Grid>
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
                <p>₹{subtotal}</p>
              </div>
              <div id="subtotalcs" style={{ margin: '0px' }}>
                <p>Total Amt.</p>
                <p>₹{subtotal}</p>
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
                <p>₹{subtotal}</p>
              </div>
              <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                <p>Total Amt.</p>
                <p>₹{subtotal}</p>
              </div>
            </div>
          )}
        </Grid>

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Link to="/purchasebillList" style={{ textDecoration: 'none' }}>
                <button
                  id="savebtncs"
                  style={{
                    marginRight: '5px'
                  }}
                >
                  Cancel
                </button>
              </Link>
              <button id="savebtncs" onClick={handlePurchaseBill}>
                Save
              </button>
            </div>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Link to="/purchasebillList" style={{ textDecoration: 'none' }}>
                <button id="savebtncs" href="/purchasebill">
                  Cancel
                </button>
              </Link>
            </div>
            <div style={{ display: 'flex' }}>
              <button
                id="savebtncs"
                style={{
                  marginRight: '10px'
                }}
                onClick={handlePurchaseBill}
              >
                Save & Next
              </button>
              <button id="savebtncs" onClick={handlePurchaseBill}>
                Save
              </button>
            </div>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Purchasebill;
