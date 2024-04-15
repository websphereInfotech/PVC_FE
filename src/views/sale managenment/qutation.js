import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
// import { withStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import AnchorTemporaryDrawer from '../../component/customerqutation';
import AnchorProductDrawer from '../../component/productquotation';
import { useDispatch } from 'react-redux';
import { createQuotation, createQuotationItem, fetchAllCustomers, Quotationview, updateQuotationItem, updateQutation } from 'store/thunk';
import { fetchAllProducts } from 'store/thunk';
// import { deleteQuotationItem } from 'store/thunk';
import { useNavigate, useParams } from 'react-router-dom';

// const StyledInput = withStyles((theme) => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3)
//     }
//   },
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.common.white,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     width: '100%',
//     padding: '10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     '&:focus': {
//       boxShadow: `${theme.palette.secondary.main} 0 0 0 0.5px`,
//       borderColor: theme.palette.secondary.main
//     }
//   }
// }))(InputBase);

const Qutation = () => {
  const [rows, setRows] = useState([{ srNo: 1, product: '', qty: '', rate: '', mrp: '' }]);
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
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleAddRow = () => {
    const newRow = { srNo: rows.length + 1, product: '', qty: '', rate: '', mrp: '' };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (srNo, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.srNo === srNo) {
        // const newValue = parseFloat(value);
        return { ...row, [field]: value };
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
    if (selectedOption && selectedOption.label === 'Create New Customer') {
      setIsDrawerOpen(true);
      console.log(isDrawerOpen, 'open');
    } else {
      console.log(setSelectcustomer, 'customers>???????????????');
      setFormData({ ...formData, customer: selectedOption.label });
      setIsDrawerOpen(false);
    }
  };

  const handleSelectproductChange = (selectedOption, srNo) => {
    // console.log("selected>>>>>",selectedOption);
    console.log(selectproduct);
    if (selectedOption && selectedOption.label === 'Create New Product') {
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
          const options = response.map((customer) => ({ value: customer.id, label: customer.shortname }));
          setcustomer([{ value: 'new', label: 'Create New Customer' }, ...options]);
          // console.log(response, 'customer>>>>>>>>>>>>>>>>>>>>>>>>>>');
        }
        const productResponse = await dispatch(fetchAllProducts());
        if (Array.isArray(productResponse)) {
          const options = productResponse.map((product) => ({ value: product.id, label: product.productname }));
          setProduct([{ value: 'new', label: 'Create New Product' }, ...options]);
          // console.log(productResponse, '????????????');
        } else {
          console.error('fetchAllProducts returned an unexpected response:', productResponse);
        }

        if (id) {
          const response = await dispatch(Quotationview(id));
          // console.log('response@@@@@@@@@@', response);
          const { customer, date, email, mobileno, quotation_no, validtill } = response;
          setFormData({ customer, date, email, mobileno, quotation_no, validtill });

          const quotationItems = response.quotationItems;
          // console.log('pur&&&&&&&&&&&&', purchaseItems);
          const updatedRows = quotationItems.map((item) => ({
            id: item.id,
            srNo: item.srNo,
            product: item.product,
            qty: item.qty,
            rate: item.rate,
            mrp: item.mrp
          }));
          // console.log("@@@@@@@@@@",rows);
          // console.log("Mapped purchase items:", updatedRows);

          setRows(updatedRows);
        }
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const handleCreateQuotation = async () => {
    try {
      if (id) {
        const updateData = await dispatch(updateQutation(id, formData));
        console.log(updateData.data.data);
        for (const row of rows) {
          const updateItemData = {
            srNo: row.srNo,
            product: row.product,
            rate: row.rate,
            qty: row.qty,
            mrp: row.mrp
          };
          console.log('@@@@@@', rows);
          const itemid = row.id;
          await dispatch(updateQuotationItem(itemid, updateItemData));
        }
        alert('Quotation updated successfully');
        navigate('/qutationlist');
      } else {
        const quotationData = {
          customer: selectcustomer,
          ...formData
        };
        const createdQuotation = await dispatch(createQuotation(quotationData));
        // console.log('data>>>>', quotationData);
        const quotationId = createdQuotation.id;
        const payload = {
          quotationId,
          items: rows.map((row) => ({
            srNo: row.srNo,
            product: selectproduct,
            qty: row.qty,
            rate: row.rate,
            mrp: row.mrp
          }))
        };
        dispatch(createQuotationItem(payload));
        // console.log(payload);
        alert('Quotation created successfully');
        navigate('/qutationlist');
      }
    } catch (error) {
      console.error('Error creating quotation:', error);
      alert('Failed to create quotation');
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
                // onChange={(selectedOption) => handleSelectChange(selectedOption)}
                options={customer}
                value={{ label: formData.customer }}
                onChange={handleSelectChange}
              />
            </Grid>
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Mobil No.</Typography>
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
                        <input
                          placeholder="Enter Sr.No."
                          value={row.srNo}
                          onChange={(e) => handleInputChange(row.srNo, 'srNo', e.target.value)}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: '5px' }}>
                        <Select
                          color="secondary"
                          // options={
                          //   Array.isArray(product)
                          //     ? [
                          //         {
                          //           value: 'product',
                          //           label: 'create new product'
                          //         },
                          //         ...product.map((products) => ({ value: products.id, label: products.productname }))
                          //       ]
                          //     : []
                          // }
                          // onChange={(selectedOption) => handleSelectproductChange(selectedOption, row.srNo)}
                          onChange={(selectedOption) => handleSelectproductChange(selectedOption, row.srNo)}
                          options={product}
                          value={{ label: row.product }}
                        />
                      </TableCell>
                      <AnchorProductDrawer open={isproductDrawerOpen} onClose={() => setIsproductDrawerOpen(false)} />
                      <TableCell sx={{ padding: '5px' }}>
                        <input placeholder="qty" value={row.qty} onChange={(e) => handleInputChange(row.srNo, 'qty', e.target.value)} />
                      </TableCell>
                      <TableCell sx={{ padding: '5px' }}>
                        <input placeholder="Rate" value={row.rate} onChange={(e) => handleInputChange(row.srNo, 'rate', e.target.value)} />
                      </TableCell>
                      <TableCell sx={{ padding: '5px' }}>
                        <input placeholder="Amount" value={row.mrp} onChange={(e) => handleInputChange(row.srNo, 'mrp', e.target.value)} />
                      </TableCell>
                      <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                        <DeleteIcon onClick={() => handleDeleteRow(row.srNo, row.id)} />
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
                  <h3>₹{subtotal}</h3>
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
                  <p>₹0</p>
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
                </Link>
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
                  onClick={handleCreateQuotation}
                >
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/qutationlist" style={{ textDecoration: 'none' }}>
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
                </Link>
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
                  onClick={handleCreateQuotation}
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
                  onClick={handleCreateQuotation}
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

export default Qutation;
