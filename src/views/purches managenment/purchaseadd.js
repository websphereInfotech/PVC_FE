import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { withStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorDeliverychallanProductDrawer from '../../component/deliverychallanproduct';
import AnchorTemporaryDrawer from '../../component/customerqutation';
import { useMediaQuery } from '@mui/material';
import { fetchAllProducts, fetchAllCustomers, createPurchase, createPurchaseItem } from 'store/thunk';
import { useDispatch } from 'react-redux';
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

const AddPurchasePage = () => {
  const [rows, setRows] = useState([{ srNo: '1', productService: '', qty: '', rate: '', discount: '', mrp: '' }]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [customer, setcustomer] = useState([]);
  const [selectcustomer, setSelectcustomer] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectproduct, setSelectproduct] = useState([]);
  const navigate = useNavigate();

  const handleAddRow = () => {
    const newRow = { srNo: (rows.length + 1).toString(), productService: '', qty: '', rate: '', discount: '', mrp: '' };
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

  const handlePurchase = async () => {
    try {
      const mobileno = document.getElementById('mobileno').value;
      const email = document.getElementById('email').value;
      const pono = document.getElementById('pono').value;
      const date = document.getElementById('date').value;
      const quotation_no = document.getElementById('quotationno').value;
      const quotationref = document.getElementById('quotationref').value;

      const purchaseData = {
        vendor: selectcustomer,
        mobileno,
        email,
        pono,
        date,
        quotation_no,
        quotationref
      };
      const createdPurchase = await dispatch(createPurchase(purchaseData));
      console.log('data>>>>', createdPurchase);
      const purchaseId = createdPurchase.data.data.id;
      const payload = {
        purchaseId,
        items: rows.map((row) => ({
          serialno: row.srNo,
          discount: row.discount,
          product: row.product,
          rate: row.rate,
          mrp: row.mrp,
          qty: row.qty
        }))
      };
      dispatch(createPurchaseItem(payload));
      console.log(payload);
      alert('Purchase created successfully');
      navigate('/purchaselist');
    } catch (error) {
      console.error('Error creating Purchase:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" gutterBottom id="mycss">
        Add Purchase
      </Typography>
      <Grid container spacing={2}>
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
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Po No.</Typography>
          <StyledInput placeholder="Enter Po No." id="pono" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Po Date</Typography>
          <StyledInput type="date" fullWidth id="date" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Quotation No.</Typography>
          <StyledInput placeholder="Enter quotation number" id="quotationno" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Quotation Ref.</Typography>
          <StyledInput placeholder="Enter reference number" id="quotationref" fullWidth />
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
                <TableCell sx={{ fontSize: '12px' }}>DISC. (%/₹)</TableCell>
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
                    <AnchorDeliverychallanProductDrawer open={isproductDrawerOpen} onClose={() => setIsproductDrawerOpen(false)} />
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
                        placeholder="Discount"
                        // value={row.discount}
                        onChange={(e) => handleInputChange(row.srNo, 'discount', e.target.value)}
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
          <button
            style={{
              width: '100px',
              color: '#425466',
              borderColor: '#425466',
              padding: '2px',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '5px',
              lineHeight: '19px'
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
                onClick={handlePurchase}
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
                onClick={handlePurchase}
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
                onClick={handlePurchase}
              >
                Save
              </button>
            </div>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default AddPurchasePage;
