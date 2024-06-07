import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import AnchorProductDrawer from '../../../component/productadd';
import AnchorVendorDrawer from '../../../component/vendor';
import { useMediaQuery } from '@mui/material';
import { fetchAllProducts, createPurchaseinvoice, fetchAllVendors, viewPurchaseinvoice, updatePurchaseinvoice } from 'store/thunk';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';

const Purchaseinvoice = () => {
  const [rows, setRows] = useState([{ product: '', qty: '', rate: '', mrp: '' }]);
  const { canCreateVendor, canCreateProduct } = useCan();
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
  const [plusgst, setPlusgst] = useState(0);
  const [vendorstate, setvendorstate] = useState('');
  const [productResponse, setProductResponse] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [formData, setFormData] = useState({
    invoicedate: new Date(),
    vendorId: '',
    duedate: new Date(),
    invoiceno: Number(),
    totalSgst: 0,
    totalIgst: 0,
    totalMrp: 0,
    mainTotal: 0
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [canCreateVendorValue, setCanCreateVendorValue] = useState(null);
  const [canCreateProductvalue, setCanCreateProductvalue] = useState(null);
  useEffect(() => {
    setCanCreateVendorValue(canCreateVendor());
    setCanCreateProductvalue(canCreateProduct());
  }, [canCreateVendor, canCreateProduct]);

  const handleAddRow = () => {
    const newRow = { product: '', qty: '', rate: '', mrp: '' };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) => {
      if (rowIndex === index) {
        return { ...row, [field]: value };
      }
      return row;
    });

    setRows(updatedRows);
    let total = 0;
    rows.forEach((row) => {
      total += parseInt(row.qty);
    });
    setTotalQuantity(total);

    updatedRows.forEach((row) => {
      const amount = row.qty * row.rate;
      row.mrp = amount;
      const gstAmount = row.mrp * (row.gstrate / 100);
      row.gst = gstAmount;
    });

    const newSubtotal = updatedRows.reduce((acc, row) => acc + row.mrp, 0);
    setSubtotal(newSubtotal);
    if (id && gststate) {
      const newPlusgst = updatedRows.reduce((acc, row) => acc + row.gst, 0);
      setFormData((prevFormData) => ({
        ...prevFormData,
        totalSgst: newPlusgst
      }));
    } else {
      const newPlusgst = updatedRows.reduce((acc, row) => acc + row.gst, 0);
      setFormData((prevFormData) => ({
        ...prevFormData,
        totalIgst: newPlusgst
      }));
    }
    setRows(updatedRows);

    const rowId = rows[index];
    const selectedProduct = productResponse.find((product) => product.gstrate === rowId.gstrate);
    if (selectedProduct) {
      const updatedRowsWithGST = updatedRows.map((row) => {
        const gstAmount = row.mrp * (row.gstrate / 100);
        return { ...row, gst: gstAmount };
      });
      const totalGST = updatedRowsWithGST.reduce((acc, row) => acc + row.gst, 0);
      setPlusgst(totalGST);
    }
  };

  const handleDeleteRow = async (index) => {
    const updatedRows = [...rows];
    const deletedRow = updatedRows.splice(index, 1)[0];
    setRows(updatedRows);

    const newPlusgst = plusgst - plusgst;
    setPlusgst(newPlusgst);

    const deletedAmount = deletedRow.mrp;
    const newSubtotal = subtotal - deletedAmount;
    setSubtotal(newSubtotal < 0 ? 0 : newSubtotal);
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Vendor') {
      setIsDrawerOpen(true);
    } else {
      formData.vendorId = selectedOption.value;
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
    const initialSubtotal = rows.reduce((acc, row) => acc + row.mrp, 0);
    setSubtotal(initialSubtotal);
    const updateTotalQuantity = () => {
      let total = 0;
      rows.forEach((row) => {
        total += parseInt(row.qty);
      });
      setTotalQuantity(total);
    };
    updateTotalQuantity();
  }, [rows]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllVendors());
        if (Array.isArray(response)) {
          const options = response.map((vendor) => ({ value: vendor.id, label: vendor.accountname, state: vendor.state }));
          setvendor([{ value: 'new', label: 'Create New Vendor', state: '' }, ...options]);
          if (!canCreateVendorValue) {
            setvendor(options);
          }
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
          if (!canCreateProductvalue) {
            setProduct(options);
          }
        } else {
          console.error('fetchAllProducts returned an unexpected response:', productResponse);
        }

        const data = await dispatch(fetchAllCompany());
        const datademo = data[0].state === vendorstate;
        setCompanystate(data[0].state);
        setGststate(datademo);
      } catch (error) {
        console.error('Error fetching purchase invoice:', error);
      }
    };

    if (canCreateVendorValue !== null || canCreateProductvalue !== null) {
      fetchData();
    }
  }, [dispatch, vendorstate, canCreateVendorValue, canCreateProductvalue, gststate, id]);

  useEffect(() => {
    const data = async () => {
      if (id) {
        const response = await dispatch(viewPurchaseinvoice(id));
        const { purchseVendor, invoicedate, invoiceno, duedate, totalSgst, mainTotal, totalMrp, totalIgst } = response;
        setFormData({
          vendorId: purchseVendor.id,
          invoicedate,
          invoiceno,
          duedate,
          totalSgst,
          mainTotal,
          totalMrp,
          totalIgst
        });
        setSelectvendor(purchseVendor.id);
        setvendorstate(purchseVendor.state);
        setvendorname(purchseVendor.accountname);
        const updatedRows = response.items.map((item) => ({
          id: item.id,
          productId: item.purchseProduct.id,
          product: item.purchseProduct.productname,
          qty: item.qty,
          rate: item.rate,
          mrp: item.rate * item.qty,
          gstrate: item.purchseProduct.gstrate,
          gst: item.mrp * (item.purchseProduct.gstrate / 100)
        }));
        setRows(updatedRows);
        const totalGST = updatedRows.reduce((acc, row) => acc + row.gst, 0);
        setPlusgst(totalGST);
      }
    };
    data();
  }, [dispatch, id]);

  console.log(selectvendor);
  const handlePurchase = async () => {
    try {
      if (id) {
        const payload = {
          ...formData,
          totalQty: totalQuantity,
          totalMrp: subtotal,
          mainTotal: Number(subtotal) + Number(plusgst),
          items: rows.map((row) => ({
            productId: row.productId,
            qty: Number(row.qty),
            rate: row.rate,
            mrp: row.mrp
          }))
        };
        const gststate = companystate === vendorstate ? 'true' : 'false';
        setGststate(gststate);
        if (gststate === 'true') {
          payload.totalSgst = plusgst;
          payload.totalIgst = 0;
        } else {
          payload.totalSgst = 0;
          payload.totalIgst = plusgst;
        }
        await dispatch(updatePurchaseinvoice(id, payload, navigate));
      } else {
        const payload = {
          ...formData,
          totalQty: totalQuantity,
          totalMrp: subtotal,
          mainTotal: Number(subtotal) + Number(plusgst),
          items: rows.map((row) => ({
            productId: row.productId,
            qty: Number(row.qty),
            rate: row.rate,
            mrp: row.mrp
          }))
        };
        const gststate = companystate === vendorstate ? 'true' : 'false';
        setGststate(gststate);
        if (gststate === 'true') {
          payload.totalSgst = plusgst;
          payload.totalIgst = 0;
        } else {
          payload.totalSgst = 0;
          payload.totalIgst = plusgst;
        }
        await dispatch(createPurchaseinvoice(payload, navigate));
      }
    } catch (error) {
      console.error('Error creating purchae invoice:', error);
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
          Update Purchase Invoice
        </Typography>
      ) : (
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Create Purchase Invoice
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
          <Typography variant="subtitle1">
            Inv. No.: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
          </Typography>
          <input
            placeholder="Enter Inv. No."
            id="invoiceno"
            value={formData.invoiceno}
            onChange={(e) => setFormData({ ...formData, invoiceno: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">
            Inv. Date: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
          </Typography>
          <DatePicker
            selected={formData.invoicedate}
            onChange={(date) => handleInvoiceDateChange(date)}
            dateFormat="dd/MM/yyyy"
            isClearable={false}
            showTimeSelect={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">
            Due Date: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
          </Typography>
          <DatePicker
            selected={formData.duedate}
            onChange={(date) => handledueDateChange(date)}
            dateFormat="dd/MM/yyyy"
            isClearable={false}
            showTimeSelect={false}
          />
        </Grid>
        <Grid item xs={12}>
          <div style={{ maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableCell width={420} sx={{ fontSize: '12px' }}>
                  PRODUCT/SERVICE <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>
                  QTY<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>
                  RATE (₹)<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>
                  AMOUNT (₹)<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </TableCell>
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
                    <TableCell id="newcs" style={{ fontSize: '16px' }}>
                      {row.mrp}
                    </TableCell>

                    <TableCell>
                      <DeleteIcon onClick={() => handleDeleteRow(index)} />
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
              {gststate ? (
                <>
                  <div id="subtotalcs">
                    <p>Sub Total</p>
                    <p>₹{subtotal}</p>
                  </div>
                  <div id="subtotalcs">
                    <p>SGST</p>
                    <p>₹{(plusgst / 2).toFixed(2)}</p>
                  </div>
                  <div id="subtotalcs">
                    <p>CGST</p>
                    <p>₹{(plusgst / 2).toFixed(2)}</p>
                  </div>
                </>
              ) : (
                <div id="subtotalcs">
                  <p>IGST</p>
                  <p>₹{plusgst.toFixed(2)}</p>
                </div>
              )}
              <div id="subtotalcs">
                <h3>Total Amt.</h3>
                <h3>₹{(Number(subtotal) + Number(plusgst)).toFixed(2)}</h3>
              </div>
            </>
          ) : (
            // For larger screens, show all totals on one line

            <div style={{ float: 'right', width: '30%' }}>
              <div id="subtotalcs">
                <p>Sub Total</p>
                <p>₹{subtotal}</p>
              </div>
              {gststate ? (
                <>
                  <div id="subtotalcs">
                    <p>SGST</p>
                    <p>₹{(plusgst / 2).toFixed(2)}</p>
                  </div>
                  <div id="subtotalcs">
                    <p>CGST</p>
                    <p>₹{(plusgst / 2).toFixed(2)}</p>
                  </div>
                </>
              ) : (
                <div id="subtotalcs">
                  <p>IGST</p>
                  <p>₹{plusgst.toFixed(2)}</p>
                </div>
              )}
              <div
                id="subtotalcs"
                style={{
                  borderBottom: 'none'
                }}
              >
                <h3>Total Amt.</h3>
                <h3>₹{(Number(subtotal) + Number(plusgst)).toFixed(2)}</h3>
              </div>
            </div>
          )}
        </Grid>

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Link to="/purchaseinvoiceList" style={{ textDecoration: 'none' }}>
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
              <Link to="/purchaseinvoiceList" style={{ textDecoration: 'none' }}>
                <button id="savebtncs">Cancel</button>
              </Link>
            </div>
            <div style={{ display: 'flex' }}>
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

export default Purchaseinvoice;
