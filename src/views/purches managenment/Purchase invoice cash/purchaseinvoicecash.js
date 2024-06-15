import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorProductDrawer from '../../../component/productadd';
import { useMediaQuery } from '@mui/material';
import {
  PurchaseInvoiceviewCash,
  createPurchaseInvoiceCash,
  fetchAllVendorsCash,
  fetchAllProductsCash,
  updatePurchaseInvoiceCash
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import AnchorVendorDrawer from 'component/vendor';

const Purchaseinvoicecash = () => {
  const { canDeleteSalescash, canCreateVendor, canCreateProduct } = useCan();
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:600px)');
  const [rows, setRows] = useState([{ product: '', qty: '', rate: '', mrp: '' }]);
  const [formData, setFormData] = useState({
    vendorId: '',
    date: new Date()
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [vendor, setvendor] = useState([]);
  const [selectvendor, setSelectvendor] = useState([]);
  const [vendorname, setvendorname] = useState('');
  const [product, setProduct] = useState('');
  const [selectproduct, setSelectproduct] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [canCreateVendorValue, setCanCreateVendorValue] = useState(null);
  const [canCreateProductvalue, setCanCreateProductvalue] = useState(null);
  useEffect(() => {
    setCanCreateVendorValue(canCreateVendor());
    setCanCreateProductvalue(canCreateProduct());
  }, [canCreateVendor, canCreateProduct]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  {
    console.log(selectvendor);
  }
  const handleDeleteRow = async (index) => {
    const updatedRows = [...rows];
    const deletedRow = updatedRows.splice(index, 1)[0];
    setRows(updatedRows);

    const deletedAmount = deletedRow.mrp;
    const newSubtotal = subtotal - deletedAmount;
    setSubtotal(newSubtotal < 0 ? 0 : newSubtotal);
  };

  const handleAddRow = () => {
    const newRow = { product: '', qty: '', rate: '', mrp: '' };
    setRows((prevRows) => [...prevRows, newRow]);
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
            productname: selectedOption.label
          };
        }
        return row;
      });

      setRows(updatedRows);
      setSelectproduct(selectedOption.value);
      setIsproductDrawerOpen(false);
    }
  };

  // called api of all product and vendor for show name of them in dropdown
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllVendorsCash());
        if (Array.isArray(response)) {
          const options = response.map((vendor) => ({ value: vendor.id, label: vendor.vendorname }));
          setvendor([{ value: 'new', label: 'Create New Vendor' }, ...options]);
          if (!canCreateVendorValue) {
            setvendor(options);
          }
        }
        const productResponse = await dispatch(fetchAllProductsCash());
        if (Array.isArray(productResponse)) {
          const options = productResponse.map((product) => ({
            value: product.id,
            label: product.productname
          }));
          setProduct([{ value: 'new', label: 'Create New Product' }, ...options]);
          if (!canCreateProductvalue) {
            setProduct(options);
          }
        } else {
          console.error('fetchAllProductsCash returned an unexpected response:', productResponse);
        }
      } catch (error) {
        console.error('Error fetching purchase invoice cash:', error);
      }
    };
    if (canCreateVendorValue !== null || canCreateProductvalue !== null) {
      fetchData();
    }
  }, [dispatch, id, canCreateVendorValue, canCreateProductvalue]);

  // use for select vendor name from dropdown
  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Vendor') {
      setIsDrawerOpen(true);
    } else {
      formData.vendorId = selectedOption.value;
      setFormData(formData);
      setvendorname(selectedOption.label);
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    const initialSubtotal = rows.reduce((acc, row) => acc + row.mrp, 0);
    setSubtotal(initialSubtotal);
    // const updateTotalQuantity = () => {
    //   let total = 0;
    //   rows.forEach((row) => {
    //     total += parseInt(row.qty);
    //   });
    //   setTotalQuantity(total);
    // };
    // updateTotalQuantity();
  }, [rows]);

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date });
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
      const amount = row.qty * row.rate || 0;
      row.mrp = amount;
    });
    setRows(updatedRows);
    // let total = 0;
    // rows.forEach((row) => {
    //   total += parseInt(row.qty);
    // });
    // setTotalQuantity(total);
  };

  useEffect(() => {
    const data = async () => {
      if (id) {
        const response = await dispatch(PurchaseInvoiceviewCash(id));
        const { date, totalMrp, VendorPurchase } = response;
        setFormData({ date, totalMrp, vendorId: VendorPurchase.id });
        setSelectvendor(VendorPurchase.id);
        setvendorname(VendorPurchase.vendorname);
        const updatedRows = response.items.map((item) => ({
          id: item.id,
          productId: item.ProductPurchase.id,
          productname: item.ProductPurchase.productname,
          qty: item.qty,
          rate: item.rate,
          mrp: item.qty * item.rate
        }));
        console.log(updatedRows, 'updatedRows');
        setRows(updatedRows);
      }
    };
    data();
  }, [dispatch, id]);

  const handlecreatePurchaseinvoicecash = async () => {
    try {
      if (id) {
        const payload = {
          ...formData,
          // totalQty: totalQuantity,
          totalMrp: subtotal,
          items: rows.map((row) => ({
            id: row.id || null,
            productId: row.productId,
            qty: Number(row.qty),
            rate: row.rate,
            mrp: row.mrp
          }))
        };
        await dispatch(updatePurchaseInvoiceCash(id, payload, navigate));
      } else {
        const payload = {
          ...formData,
          // totalQty: totalQuantity,
          totalMrp: subtotal,
          items: rows.map((row) => ({
            id: row.id || null,
            productId: row.productId,
            qty: Number(row.qty),
            rate: row.rate,
            mrp: row.mrp
          }))
        };
        console.log(selectvendor);
        await dispatch(createPurchaseInvoiceCash(payload, navigate));
      }
    } catch (error) {
      console.error('Error creating purchase invoice cash:', error);
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Purchase Cash
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Purchase Cash
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Venoder : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
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
                Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.date}
                onChange={(date) => handleDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} style={isMobileX ? { overflowX: 'auto' } : {}}>
            <div style={{ maxWidth: '100%' }}>
              <Table>
                <TableHead>
                  <TableCell width={500} sx={{ fontSize: '12px' }}>
                    PRODUCT : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    QTY : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    RATE (₹) : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    AMOUNT (₹) : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
                </TableHead>
                <TableBody>
                  {rows?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Select
                          color="secondary"
                          onChange={(selectedOption) => handleSelectproductChange(selectedOption, index)}
                          options={product}
                          value={{ value: row.productId, label: row.productname }}
                        />
                      </TableCell>
                      <AnchorProductDrawer
                        open={isproductDrawerOpen}
                        onClose={() => setIsproductDrawerOpen(false)}
                        onSelectProduct={(selectedOption) => handleSelectproductChange(selectedOption, index)}
                      />
                      <TableCell id="newcs">
                        <input placeholder="qty" value={row.qty} onChange={(e) => handleInputChange(index, 'qty', e.target.value)} />
                      </TableCell>
                      <TableCell id="newcs">
                        <input placeholder="Rate" value={row.rate} onChange={(e) => handleInputChange(index, 'rate', e.target.value)} />
                      </TableCell>
                      <TableCell id="newcs" style={{ fontSize: '16px' }}>
                        {row.mrp}
                      </TableCell>
                      <TableCell disabled={!canDeleteSalescash()}>
                        <DeleteIcon
                          onClick={() => {
                            handleDeleteRow(index);
                          }}
                        />
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
                <Link to="/purchaseinvoicecashList" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button id="savebtncs" onClick={handlecreatePurchaseinvoicecash}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/purchaseinvoicecashList" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handlecreatePurchaseinvoicecash}>
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

export default Purchaseinvoicecash;
