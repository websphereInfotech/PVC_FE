import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, InputBase, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { withStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import AnchorTemporaryDrawer from '../../component/customerqutation';
import AnchorDeliverychallanProductDrawer from '../../component/deliverychallanproduct';
import { createDeliveryChallan, createDeliveryChallanItem } from 'store/thunk';
import { fetchAllProducts, fetchAllCustomers } from 'store/thunk';
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
  const [rows, setRows] = useState([
    { srNo: '1', product: '', qty: '', mrp: '', description: '', expirydate: '', batchno: '', quotationno: '' }
  ]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [customer, setcustomer] = useState([]);
  const [selectcustomer, setSelectcustomer] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectproduct, setSelectproduct] = useState([]);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  const handleAddRow = () => {
    const newRow = { srNo: (rows.length + 1).toString(), product: '', qty: '', rate: '', amount: '' };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (srNo, field, value) => {
    const updatedRows = rows.map((row) => {
      // console.log("roe@@@@@@@@@@@@",value);
      if (row.srNo === srNo) {
        // const newValue = parseFloat(value);
        return { ...row, [field]: value };
      }
      return row;
    });

    updatedRows.forEach((row) => {
      const amount = row.qty * row.mrp; // Calculate amount for the current row only
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

  const handlecreatedeliverychallan = async () => {
    try {
      const challanno = document.getElementById('challanno').value;
      const date = document.getElementById('date').value;
      const email = document.getElementById('email').value;
      const mobileno = document.getElementById('mobileno').value;

      const ChallanData = {
        challanno,
        date,
        email,
        mobileno,
        customer: selectcustomer
      };
      const Deliverychallan = await dispatch(createDeliveryChallan(ChallanData));
      // console.log('data>>>>', Deliverychallan);
      const deliverychallanId = Deliverychallan.data.data.id;
      // console.log("id",deliverychallanId);
      const payload = {
        deliverychallanId,
        items: rows.map((row) => ({
          serialno: row.srNo,
          product: row.product,
          description: row.description,
          quotationno: row.quotationno,
          batchno: row.batchno,
          expirydate: row.expirydate,
          qty: row.qty,
          mrp: row.mrp
        }))
      };
      // console.log(payload, 'payload????');
      dispatch(createDeliveryChallanItem(payload));
      alert('Deliverychallan created successfully');
    } catch (error) {
      console.error('Error creating Deliverychallan:', error);
      alert('Failed to create Deliverychallan');
    }
  };

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
              <Typography variant="subtitle1">Challan No.</Typography>
              <StyledInput placeholder="0001" id="challanno" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Challan Date</Typography>
              <StyledInput type="date" id="date" fullWidth />
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
                            onChange={(e) => handleInputChange(row.srNo, 'quotationno', e.target.value)}
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
                        <TableCell sx={{ padding: '5px', display: 'flex', justifyContent: 'center' }}>
                          <StyledInput
                            placeholder="date"
                            // value={row.qty}
                            fullWidth
                            onChange={(e) => handleInputChange(row.srNo, 'batchno', e.target.value)}
                          />
                        </TableCell>
                        <TableCell sx={{ padding: '5px' }}>
                          <StyledInput
                            placeholder="date"
                            // value={row.qty}
                            fullWidth
                            onChange={(e) => handleInputChange(row.srNo, 'expirydate', e.target.value)}
                          />
                        </TableCell>
                        <TableCell sx={{ padding: '5px' }}>
                          <StyledInput
                            placeholder="0.00"
                            // value={row.rate}
                            onChange={(e) => handleInputChange(row.srNo, 'mrp', e.target.value)}
                          />
                        </TableCell>
                        <TableCell sx={{ padding: '5px' }}>
                          <StyledInput
                            placeholder="qty"
                            // value={row.amount}
                            onChange={(e) => handleInputChange(row.srNo, 'qty', e.target.value)}
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
                            onChange={(e) => handleInputChange(row.srNo, 'description', e.target.value)}
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
                  <p>₹{subtotal}</p>
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
                  <p>₹{subtotal}</p>
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
                  onClick={handlecreatedeliverychallan}
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
                  onClick={handlecreatedeliverychallan}
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
                  onClick={handlecreatedeliverychallan}
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
