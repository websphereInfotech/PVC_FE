import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import AnchorProductDrawer from '../../component/productadd';
import AnchorVendorDrawer from '../../component/vendor';
import { useMediaQuery } from '@mui/material';
import {
  fetchAllProducts,
  createPurchase,
  createPurchaseItem,
  // purchaseview,
  updatePurchase,
  updatePurchaseItem,
  deletePurchaseItem,
  fetchAllVendors
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddPurchasePage = () => {
  const [rows, setRows] = useState([{ product: '', qty: '', rate: '', mrp: '' }]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [vendor, setvendor] = useState([]);
  const [selectvendor, setSelectvendor] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectproduct, setSelectproduct] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [vendorname, setvendorname] = useState('');
  const [companystate, setCompanystate] = useState('');
  const [gststate, setGststate] = useState('');
  const [vendorstate, setvendorstate] = useState('');
  const [formData, setFormData] = useState({
    invoicedate: new Date(),
    vendorId: '',
    duedate: new Date(),
    terms: '',
    invoiceno: '',
    totalSgst: 0,
    totalIgst: 0,
    totalMrp: 0,
    mainTotal: 0
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleAddRow = () => {
    const newRow = { product: '', qty: '', rate: '', mrp: '' };
    setRows((prevRows) => [...prevRows, newRow]);
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
    if (selectedOption && selectedOption.label === 'Create New Customer') {
      setIsDrawerOpen(true);
    } else {
      formData.customerId = selectedOption.value;
      setFormData(formData);
      setvendorname(selectedOption.label);
      setvendorstate(selectedOption.state);
      setIsDrawerOpen(false);
    }
  };

  // use for select product name from dropdown
  const handleSelectproductChange = (selectedOption, index) => {
    console.log(selectproduct);
    if (selectedOption && selectedOption.label === 'Create New Product') {
      setIsproductDrawerOpen(true);
    } else {
      const updatedRows = rows.map((row, rowIndex) => {
        if (rowIndex === index) {
          return {
            ...row,
            productId: selectedOption.value,
            product: selectedOption.label,
            rate: selectedOption.rate,
            gstrate: selectedOption.gstrate
          };
        }
        return row;
      });

      setRows(updatedRows);
      setSelectproduct(selectedOption.value);
      setIsproductDrawerOpen(false);
    }
  };

  console.log(selectvendor, companystate);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllVendors());
        if (Array.isArray(response)) {
          const options = response.map((vendor) => ({ value: vendor.id, label: vendor.accountname, state: vendor.state }));
          setvendor([{ value: 'new', label: 'Create New Vendor', state: '' }, ...options]);
        }
        const productResponse = await dispatch(fetchAllProducts());
        if (Array.isArray(productResponse)) {
          setProductResponse(productResponse);
          const options = productResponse.map((product) => ({
            value: product.id,
            label: product.productname,
            rate: product.salesprice,
            gstrate: product.gstrate
          }));
          setProduct([{ value: 'new', label: 'Create New Product', rate: '', gstrate: '' }, ...options]);
        } else {
          console.error('fetchAllProducts returned an unexpected response:', productResponse);
        }

        const data = await dispatch(fetchAllCompany());
        const datademo = data[0].state === vendorstate;
        setCompanystate(data[0].state);
        setGststate(datademo);
      } catch (error) {
        console.error('Error fetching Purchase:', error);
      }
    };

    fetchData();
  }, [dispatch, vendorstate, gststate, id]);

  useEffect(() => {
    const data = async () => {
      if (id) {
        const response = await dispatch(Creditnoteviewdata(id));
        console.log(response);
        const { CreditCustomer, date, ProFormaInvoice_no, validtill, totalSgst, mainTotal, totalMrp, totalIgst } = response;
        setFormData({ customerId: CreditCustomer.id, date, ProFormaInvoice_no, validtill, totalSgst, mainTotal, totalMrp, totalIgst });
        setSelectvendor(CreditCustomer.id);
        setvendorstate(CreditCustomer.state);
        setvendorname(CreditCustomer.shortname);
        const updatedRows = response.items.map((item) => ({
          id: item.id,
          productId: item.CreditProduct.id,
          product: item.CreditProduct.productname,
          qty: item.qty,
          rate: item.rate,
          mrp: item.rate * item.qty,
          gstrate: item.CreditProduct.gstrate,
          gst: item.mrp * (item.CreditProduct.gstrate / 100)
        }));
        setRows(updatedRows);
        const totalGST = updatedRows.reduce((acc, row) => acc + row.gst, 0);
        setPlusgst(totalGST);
      }
    };
    data();
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
          vendor: selectcustomer,
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
  const handleInvoiceDateChange = (date) => {
    setFormData({ ...formData, invoicedate: date });
  };
  const handledueDateChange = (date) => {
    setFormData({ ...formData, duedate: date });
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
          <Typography variant="subtitle1">
            Vendor : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
          </Typography>
          <Select
            color="secondary"
            options={vendor}
            value={{ value: formData.vendorId, label: vendorname }}
            onChange={handleSelectChange}
          />
        </Grid>
        <AnchorVendorDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">terms</Typography>
          <input
            placeholder="Enter terms days"
            id="terms"
            value={formData.terms}
            onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Inv. No.</Typography>
          <input
            placeholder="Enter Inv. No."
            id="invoiceno"
            value={formData.invoiceno}
            onChange={(e) => setFormData({ ...formData, invoiceno: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Inv. Date</Typography>
          <DatePicker
            selected={formData.invoicedate}
            onChange={(date) => handleInvoiceDateChange(date)}
            dateFormat="dd/MM/yyyy"
            isClearable={false}
            showTimeSelect={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Due Date</Typography>
          <DatePicker
            selected={formData.duedate}
            onChange={(date) => handledueDateChange(date)}
            dateFormat="dd/MM/yyyy"
            isClearable={false}
            showTimeSelect={false}
          />
        </Grid>
        <Grid item xs={12}>
          <div style={{ overflowX: 'auto', maxHeight: '300px', maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableCell width={420} sx={{ fontSize: '12px' }}>
                  PRODUCT/SERVICE
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>QTY</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>RATE (₹)</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>AMOUNT (₹)</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ padding: '5px' }}>
                      <Select
                        color="secondary"
                        onChange={(selectedOption) => handleSelectproductChange(selectedOption, index)}
                        options={product}
                        value={{ value: row.productId, label: row.product }}
                      />
                    </TableCell>
                    <AnchorProductDrawer
                      open={isproductDrawerOpen}
                      onClose={() => setIsproductDrawerOpen(false)}
                      onSelectProduct={(selectedOption) => handleSelectproductChange(selectedOption, index)}
                    />
                    <TableCell>
                      <input placeholder="qty" value={row.qty} onChange={(e) => handleInputChange(index, 'qty', e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <input placeholder="Rate" value={row.rate} onChange={(e) => handleInputChange(index, 'rate', e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <input placeholder="Amount" value={row.mrp} onChange={(e) => handleInputChange(index, 'mrp', e.target.value)} />
                    </TableCell>

                    <TableCell>
                      <DeleteIcon onClick={() => handleDeleteRow(row.id, index)} />
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
