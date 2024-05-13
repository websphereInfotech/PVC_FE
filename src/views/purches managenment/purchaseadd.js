import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import AnchorProductDrawer from '../../component/productadd';
import AnchorTemporaryDrawer from '../../component/customeradd';
import { useMediaQuery } from '@mui/material';
import {
  fetchAllProducts,
  fetchAllCustomers,
  createPurchase,
  createPurchaseItem,
  purchaseview,
  updatePurchase,
  updatePurchaseItem,
  deletePurchaseItem
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// Custom styled input component
// const input = withStyles((theme) => ({
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

const AddPurchasePage = () => {
  const [rows, setRows] = useState([{ srNo: '1', product: '', qty: '', rate: '', discount: '', mrp: '' }]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [customer, setcustomer] = useState([]);
  const [selectcustomer, setSelectcustomer] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectproduct, setSelectproduct] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [formData, setFormData] = useState({
    quotation_no: '',
    date: '',
    email: '',
    mobileno: '',
    quotationref: '',
    pono: '',
    customer: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();
  // const { Id } = useParams();
  const handleAddRow = () => {
    const newRow = { srNo: (rows.length + 1).toString(), product: '', qty: '', rate: '', discount: '', mrp: '' };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (srNo, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.srNo === srNo) {
        return { ...row, [field]: value };
      }
      return row;
    });

    updatedRows.forEach((row) => {
      const qty = parseFloat(row.qty);
      const rate = parseFloat(row.rate);
      const discount = parseFloat(row.discount);
      const mrp = parseFloat(row.mrp);
      const amount = qty * mrp * rate - discount;
      row.amount = isNaN(amount) ? 0 : amount;
    });
    const newSubtotal = updatedRows.reduce((acc, row) => acc + row.amount, 0);
    setSubtotal(Number.isNaN(newSubtotal) ? 0 : newSubtotal);
    setRows(updatedRows);
  };

  const handleDeleteRow = async (srNo, id) => {
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

    await dispatch(deletePurchaseItem(id));
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.value === 'new') {
      setIsDrawerOpen(true);
    } else {
      console.log(setSelectcustomer);
      setFormData({ ...formData, customer: selectedOption.label });
      setIsDrawerOpen(false);
    }
  };

  const handleSelectproductChange = (selectedOption, srNo) => {
    if (selectedOption && selectedOption.value === 'new') {
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
        const customers = await dispatch(fetchAllCustomers());
        if (Array.isArray(customers)) {
          const options = customers.map((customer) => ({ value: customer.id, label: customer.shortname }));
          setcustomer([{ value: 'new', label: 'Create New Customer' }, ...options]);
        }
        const products = await dispatch(fetchAllProducts());
        if (Array.isArray(products)) {
          // setProduct(productResponse);
          const options = products.map((product) => ({ value: product.id, label: product.productname }));
          setProduct([{ value: 'new', label: 'Create New Product' }, ...options]);
        }

        if (id) {
          const response = await dispatch(purchaseview(id));
          const { customer, date, email, mobileno, quotation_no, quotationref, pono } = response;
          setFormData({ customer, date, email, mobileno, quotation_no, quotationref, pono });

          const purchaseItems = response.purchaseitems;
          const updatedRows = purchaseItems.map((item, index) => ({
            id: item.id,
            srNo: index + 1,
            product: item.product,
            qty: item.qty,
            rate: item.rate,
            discount: item.discount,
            mrp: item.mrp,
            amount: item.amount
          }));

          setRows(updatedRows);
        }
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const handlePurchase = async () => {
    try {
      if (id) {
        await dispatch(updatePurchase(id, formData));

        for (const row of rows) {
          const updateItemData = {
            date: formData.date,
            serialno: row.srNo,
            discount: row.discount,
            product: row.product,
            rate: row.rate,
            qty: row.qty,
            mrp: row.mrp
          };
          const itemid = row.id;
          await dispatch(updatePurchaseItem(itemid, updateItemData));
          alert('Purchase updated successfully');
          navigate('/purchaselist');
        }
      } else {
        const purchaseData = {
          customer: selectcustomer,
          ...formData
        };
        const createdPurchase = await dispatch(createPurchase(purchaseData));
        const purchaseId = createdPurchase.data.data.id;
        const payload = {
          purchaseId,
          items: rows.map((row) => ({
            serialno: row.srNo,
            discount: row.discount,
            product: selectproduct,
            rate: row.rate,
            mrp: row.mrp,
            qty: row.qty
          }))
        };
        dispatch(createPurchaseItem(payload));
        alert('Purchase created successfully');
        navigate('/purchaselist');
      }
    } catch (error) {
      console.error('Error creating Purchase:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      {id ? (
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Update Purchase
        </Typography>
      ) : (
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Add Purchase
        </Typography>
      )}

      <Grid container spacing={2}>
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
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Po No.</Typography>
          <input
            placeholder="Enter Po No."
            id="pono"
            value={formData.pono}
            onChange={(e) => setFormData({ ...formData, pono: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Po Date</Typography>
          <input
            type="date"
            id="date"
            value={formData.date ? formData.date.split('T')[0] : ''}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Quotation No.</Typography>
          <input
            placeholder="Enter quotation number"
            id="quotationno"
            value={formData.quotation_no}
            onChange={(e) => setFormData({ ...formData, quotation_no: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Quotation Ref.</Typography>
          <input
            placeholder="Enter reference number"
            id="quotationref"
            value={formData.quotationref}
            onChange={(e) => setFormData({ ...formData, quotationref: e.target.value })}
          />
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
                <TableCell sx={{ fontSize: '12px' }}>DISC. (₹)</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>AMOUNT (₹)</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.srNo}>
                    <TableCell>
                      <input
                        placeholder="Enter Sr.No."
                        value={row.srNo}
                        onChange={(e) => handleInputChange(row.srNo, 'srNo', e.target.value)}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '5px' }}>
                      <Select
                        color="secondary"
                        placeholder="select Product"
                        onChange={(selectedOption) => handleSelectproductChange(selectedOption, row.srNo)}
                        options={product}
                        value={{ label: row.product }}
                      />
                    </TableCell>
                    <AnchorProductDrawer open={isproductDrawerOpen} onClose={() => setIsproductDrawerOpen(false)} />
                    <TableCell>
                      <input placeholder="qty" value={row.qty} onChange={(e) => handleInputChange(row.srNo, 'qty', e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <input placeholder="Rate" value={row.rate} onChange={(e) => handleInputChange(row.srNo, 'rate', e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <input
                        placeholder="Discount"
                        value={row.discount}
                        onChange={(e) => handleInputChange(row.srNo, 'discount', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <input placeholder="Amount" value={row.mrp} onChange={(e) => handleInputChange(row.srNo, 'mrp', e.target.value)} />
                    </TableCell>

                    <TableCell>
                      <DeleteIcon onClick={() => handleDeleteRow(row.srNo, row.id)} />
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
              <div id="subtotalcs">
                <p>Taxable Amt.</p>
                <p>₹0.00</p>
              </div>
              <div id="subtotalcs">
                <p>Sub Total</p>
                <p>₹{subtotal}</p>
              </div>
              <div id="subtotalcs">
                <p>Total Amt.</p>
                <p>₹{subtotal}</p>
              </div>
            </div>
          )}
        </Grid>

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Link to="/purchaselist" style={{ textDecoration: 'none' }}>
                <button
                  id="savebtncs"
                  style={{
                    marginRight: '5px'
                  }}
                >
                  Cancel
                </button>
              </Link>
              <button id="savebtncs" onClick={handlePurchase}>
                Save
              </button>
            </div>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Link to="/purchaselist" style={{ textDecoration: 'none' }}>
                <button id="savebtncs">Cancel</button>
              </Link>
            </div>
            <div style={{ display: 'flex' }}>
              <button
                id="savebtncs"
                style={{
                  marginRight: '10px'
                }}
                onClick={handlePurchase}
              >
                Save & Next
              </button>
              <button id="savebtncs" onClick={handlePurchase}>
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
