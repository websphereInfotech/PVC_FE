import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import AnchorTemporaryDrawer from '../../component/customerqutation';
import AnchorProductDrawer from '../../component/productquotation';
import { useDispatch } from 'react-redux';
import { createQuotation, fetchAllCustomers, Quotationview, updateQutation, deleteQuotationItem } from 'store/thunk';
import { fetchAllProducts } from 'store/thunk';
import { useNavigate, useParams } from 'react-router-dom';
import useCan from 'views/checkpermissionvalue';

const Qutation = () => {
  const { canDeleteQuotation } = useCan();
  const [rows, setRows] = useState([{ product: '', qty: '', rate: '', mrp: '' }]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [customer, setcustomer] = useState([]);
  const [selectcustomer, setSelectcustomer] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectproduct, setSelectproduct] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [formData, setFormData] = useState({
    customer: '',
    mobileno: '',
    email: '',
    date: '',
    quotation_no: '',
    validtill: ''
  });
  const [productResponse, setProductResponse] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // manage button of addrow
  const handleAddRow = () => {
    const newRow = { product: '', qty: '', rate: '', mrp: '' };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  //manage value of input of row
  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) => {
      if (rowIndex === index) {
        return { ...row, [field]: value };
      }
      return row;
    });

    updatedRows.forEach((row) => {
      const amount = row.qty * row.rate;
      row.mrp = amount;
    });

    const newSubtotal = updatedRows.reduce((acc, row) => acc + row.mrp, 0);
    setSubtotal(newSubtotal);
    setRows(updatedRows);
  };

  //use for delete product row
  const handleDeleteRow = async (id, index) => {
    if (id) {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
      dispatch(deleteQuotationItem(id));
    } else {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      const deletedRow = rows.find((row) => row.id === id);
      if (deletedRow) {
        const deletedAmount = deletedRow.mrp;
        const newSubtotal = subtotal - deletedAmount;
        setSubtotal(newSubtotal < 0 ? 0 : newSubtotal);
      }
      setRows(updatedRows);
    }
  };

  // use for select customer name from dropdown
  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Customer') {
      setIsDrawerOpen(true);
    } else {
      console.log(setSelectcustomer);
      setFormData({ ...formData, customer: selectedOption.label });
      setIsDrawerOpen(false);
    }
  };

  // use for select product name from dropdown
  const handleSelectproductChange = (selectedOption, index) => {
    console.log(selectproduct);
    if (selectedOption && selectedOption.label === 'Create New Product') {
      setIsproductDrawerOpen(true);
    } else {
      const selectedProductData = productResponse.find((product) => product.productname === selectedOption.label);
      const salesPrice = selectedProductData ? selectedProductData.salesprice : 0;
      const updatedRows = rows.map((row, rowIndex) => {
        if (rowIndex === index) {
          return { ...row, product: selectedOption.label, rate: salesPrice };
        }
        return row;
      });
      setRows(updatedRows);
      setSelectproduct(selectedOption.label);
      setIsproductDrawerOpen(false);
    }
  };

  // called api of all product and customer for sho name of them in dropdown
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllCustomers());
        if (Array.isArray(response)) {
          const options = response.map((customer) => ({ value: customer.id, label: customer.shortname }));
          setcustomer([{ value: 'new', label: 'Create New Customer' }, ...options]);
        }
        const productResponse = await dispatch(fetchAllProducts());
        if (Array.isArray(productResponse)) {
          setProductResponse(productResponse);
          const options = productResponse.map((product) => ({ value: product.id, label: product.productname }));
          setProduct([{ value: 'new', label: 'Create New Product' }, ...options]);
        } else {
          console.error('fetchAllProducts returned an unexpected response:', productResponse);
        }

        if (id) {
          const response = await dispatch(Quotationview(id));
          const { customer, date, email, mobileno, quotation_no, validtill } = response;
          setFormData({ customer, date, email, mobileno, quotation_no, validtill });

          const quotationItems = response.items;
          const updatedRows = quotationItems.map((item) => {
            return {
              id: item.id,
              // srNo: item.srNo,
              product: item.product,
              qty: item.qty,
              rate: item.rate,
              mrp: item.mrp
            };
          });
          setRows(updatedRows);
        }
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  //use for update and create quotation data
  const handleCreateQuotation = async () => {
    try {
      if (id) {
        const payload = {
          ...formData,
          items: rows.map((row) => ({
            // srNo: row.id,
            product: row.product,
            qty: row.qty,
            rate: row.rate,
            mrp: row.mrp
          }))
        };
        await dispatch(updateQutation(id, payload, navigate));
      } else {
        const quotationData = {
          customer: selectcustomer,
          ...formData,
          items: rows.map((row) => ({
            // srNo: row.id,
            product: row.product,
            qty: row.qty,
            rate: row.rate,
            mrp: row.mrp
          }))
        };
        await dispatch(createQuotation(quotationData, navigate));
      }
    } catch (error) {
      console.error('Error creating quotation:', error);
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Quotation
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            create Quotation
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Customer</Typography>
              <Select color="secondary" options={customer} value={{ label: formData.customer }} onChange={handleSelectChange} />
            </Grid>
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Mobile No.</Typography>
              <input
                placeholder="Enter Mobile number"
                id="mobileno"
                value={formData.mobileno}
                onChange={(e) => setFormData({ ...formData, mobileno: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Email</Typography>
              <input
                placeholder="Enter Email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Quotation No.</Typography>
              <input
                placeholder="Enter Quotation No."
                id="quotation_no"
                value={formData.quotation_no}
                onChange={(e) => setFormData({ ...formData, quotation_no: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Quotation Date</Typography>
              <input
                type="date"
                id="date"
                value={formData.date ? formData.date.split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Valid Till</Typography>
              <input
                type="date"
                id="validtill"
                value={formData.validtill ? formData.validtill.split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, validtill: e.target.value })}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div style={{ maxWidth: '100%' }}>
              <Table>
                <TableHead>
                  {/* <TableCell sx={{ fontSize: '12px' }}>Sr.No.</TableCell> */}
                  <TableCell width={500} sx={{ fontSize: '12px' }}>
                    PRODUCT
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>QTY</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>RATE (₹)</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>AMOUNT (₹)</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
                </TableHead>
                <TableBody>
                  {rows?.map((row, index) => (
                    <TableRow key={index}>
                      {/* <TableCell id="newcs">
                        <input
                          placeholder="Enter Sr.No."
                          value={row.srNo}
                          onChange={(e) => handleInputChange(row.srNo, 'srNo', e.target.value)}
                        />
                      </TableCell> */}
                      <TableCell>
                        <Select
                          color="secondary"
                          onChange={(selectedOption) => handleSelectproductChange(selectedOption, index)}
                          options={product}
                          value={{ label: row.product }}
                        />
                      </TableCell>
                      <AnchorProductDrawer open={isproductDrawerOpen} onClose={() => setIsproductDrawerOpen(false)} />
                      <TableCell id="newcs">
                        <input placeholder="qty" value={row.qty} onChange={(e) => handleInputChange(index, 'qty', e.target.value)} />
                      </TableCell>
                      <TableCell id="newcs">
                        <input placeholder="Rate" value={row.rate} onChange={(e) => handleInputChange(index, 'rate', e.target.value)} />
                      </TableCell>
                      <TableCell id="newcs" style={{ fontSize: '16px' }}>
                        {row.mrp}
                      </TableCell>
                      <TableCell disabled={!canDeleteQuotation()}>
                        <DeleteIcon onClick={() => handleDeleteRow(row.id, index)} />
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
                <div id="subtotalcs">
                  <p>Taxable Amt.</p>
                  <p>₹0.00</p>
                </div>
                <div id="subtotalcs">
                  <p>Sub Total</p>
                  <p>₹{subtotal}</p>
                </div>
                <div
                  id="subtotalcs"
                  style={{
                    borderBottom: 'none'
                  }}
                >
                  <h3>Total Amt.</h3>
                  <h3>₹{subtotal}</h3>
                </div>
              </>
            ) : (
              // For larger screens, show all totals on one line
              <div style={{ float: 'right', width: '30%' }}>
                <div
                  id="subtotalcs"
                  style={{
                    borderTop: '0.2px solid lightgrey'
                  }}
                >
                  <p>Taxable Amt.</p>
                  <p>₹0</p>
                </div>
                <div id="subtotalcs">
                  <p>Sub Total</p>
                  <p>₹{subtotal}</p>
                </div>
                <div
                  id="subtotalcs"
                  style={{
                    borderBottom: 'none'
                  }}
                >
                  <h3>Total Amt.</h3>
                  <h3>₹{subtotal}</h3>
                </div>
              </div>
            )}
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/qutationlist" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button id="savebtncs" onClick={handleCreateQuotation}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/qutationlist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button
                  id="savebtncs"
                  style={{
                    marginRight: '10px'
                  }}
                  onClick={handleCreateQuotation}
                >
                  Save & Next
                </button>
                <button id="savebtncs" onClick={handleCreateQuotation}>
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

export default Qutation;
