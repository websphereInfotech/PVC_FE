import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { withStyles } from '@mui/styles';
import Select from 'react-select';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import AnchorTemporaryDrawer from '../../component/customerqutation';
import AnchorDeliverychallanProductDrawer from '../../component/deliverychallanproduct';
import { fetchAllProducts, fetchAllCustomers, createSalesInvoice, createSalesinvoiceItem } from 'store/thunk';
import { useNavigate } from 'react-router-dom';
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

const Salesinvoice = () => {
  const [rows, setRows] = useState([{ srNo: '1', product: '', qty: '', rate: '', mrp: '' }]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [customer, setcustomer] = useState([]);
  const [selectcustomer, setSelectcustomer] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectproduct, setSelectproduct] = useState([]);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  const handleAddRow = () => {
    const newRow = { srNo: (rows.length + 1).toString(), product: '', qty: '', rate: '', mrp: '' };
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
      const amount = row.qty * row.rate * row.mrp; // Calculate amount for the current row only
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
      // console.log(isDrawerOpen, 'open');
    } else {
      console.log(selectcustomer, 'customers>?????/??????????');
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

  const handleSalesinvoice = async () => {
    try {
      const mobileno = document.getElementById('mobileno').value;
      const email = document.getElementById('email').value;
      const book = document.getElementById('book').value;
      const seriesname = document.getElementById('seriesname').value;
      const invoicedate = document.getElementById('invoicedate').value;
      const invoiceno = document.getElementById('invoiceno').value;
      const terms = document.getElementById('terms').value;
      const duedate = document.getElementById('duedate').value;
      const quotation_no = document.getElementById('quotation_no').value;
      const salesinvoicedata = {
        customer: selectcustomer,
        mobileno,
        email,
        book,
        seriesname,
        invoiceno,
        invoicedate,
        terms,
        duedate,
        quotation_no
      };
      const salesinvoice = await dispatch(createSalesInvoice(salesinvoicedata));
      // console.log('data>>>>', salesinvoice);
      const salesInvoiceId = salesinvoice.data.data.id;
      const payload = {
        salesInvoiceId,
        items: rows.map((row) => ({
          serialno: row.srNo,
          product: row.product,
          mrp: row.mrp,
          rate: row.rate,
          qty: row.qty
        }))
      };
      // console.log(payload, 'payload????');
      dispatch(createSalesinvoiceItem(payload));
      alert('Sales Invoice created successfully');
      navigate('/salesinvoicemain');
    } catch (error) {
      console.error('Error creating Sales Invoice:', error);
      alert('Failed to create Sales Invoice');
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Create Sales Invoice
        </Typography>
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
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
              <StyledInput placeholder="Enter Mobile No." id="mobileno" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Email</Typography>
              <StyledInput placeholder="Enter Email Address" id="email" fullWidth />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Book</Typography>
              <StyledInput fullWidth id="book" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Series Name</Typography>
              <StyledInput placeholder="Sales invoice" id="seriesname" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Invoice No.</Typography>
              <StyledInput placeholder="0001" fullWidth id="invoiceno" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Invoice Date</Typography>
              <StyledInput type="date" fullWidth id="invoicedate" />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Terms (Days)</Typography>
              <StyledInput placeholder="Terms (Days)" fullWidth id="terms" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Due Date</Typography>
              <StyledInput type="date" fullWidth id="duedate" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Quotation No.</Typography>
              <StyledInput placeholder="Quotation no." id="quotation_no" fullWidth />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
              <Table>
                <TableHead>
                  <TableCell sx={{ fontSize: '12px' }}>Sr.No.</TableCell>
                  <TableCell width={650} sx={{ fontSize: '12px' }}>
                    PRODUCT
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>QTY</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>RATE (₹)</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>AMOUNT (₹)</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.srNo}>
                      <TableCell sx={{ padding: '5px' }}>
                        <StyledInput
                          placeholder="Sr.No."
                          value={row.srNo}
                          readOnly
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
                      <AnchorDeliverychallanProductDrawer open={isproductDrawerOpen} onClose={() => setIsproductDrawerOpen(false)} />
                      <TableCell sx={{ padding: '5px' }}>
                        <StyledInput
                          placeholder="qty"
                          // value={row.qty}
                          fullWidth
                          onChange={(e) => handleInputChange(row.srNo, 'qty', e.target.value)}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '5px' }}>
                        <StyledInput
                          placeholder="rate"
                          // value={row.rate}
                          onChange={(e) => handleInputChange(row.srNo, 'rate', e.target.value)}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '5px' }}>
                        <StyledInput
                          placeholder="amount"
                          // value={row.amount}
                          onChange={(e) => handleInputChange(row.srNo, 'mrp', e.target.value)}
                        />
                      </TableCell>
                      <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
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
                <div
                  style={{
                    borderBottom: '0.2px solid lightgrey',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '5px 0px'
                  }}
                >
                  <p>Taxable Amt.</p>
                  <p>₹0.00</p>
                </div>
                <div
                  style={{
                    borderBottom: '0.2px solid lightgrey',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '5px 0px'
                  }}
                >
                  <p>Total Taxable Amt.</p>
                  <p>₹0.00</p>
                </div>
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
                  <p>₹{subtotal}</p>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '5px 0px'
                  }}
                >
                  <h3>Total Amt.</h3>
                  <h3>₹0.00</h3>
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
                  <p>Taxable Amt.</p>
                  <p>₹0.00</p>
                </div>
                <div
                  style={{
                    borderBottom: '0.2px solid lightgrey',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '5px 0px'
                  }}
                >
                  <p>Total Taxable Amt.</p>
                  <p>₹0.00</p>
                </div>
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
                  <p>₹{subtotal}</p>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '5px 0px'
                  }}
                >
                  <h3>Total Amt.</h3>
                  <h3>₹0.00</h3>
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
                  onClick={handleSalesinvoice}
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
                  onClick={handleSalesinvoice}
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
                  onClick={handleSalesinvoice}
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

export default Salesinvoice;
