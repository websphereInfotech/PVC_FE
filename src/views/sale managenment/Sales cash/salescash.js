import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorTemporaryDrawer from '../../../component/customeradd';
import AnchorProductDrawer from '../../../component/productadd';
import { useMediaQuery } from '@mui/material';
import {
  SalesInvoiceCashview,
  createSalesInvoiceCash,
  fetchAllCustomersCash,
  fetchAllProductsCash,
  updateSalesinvoiceCash
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';

const Salescash = () => {
  const { canDeleteSalescash, canCreateCustomer, canCreateProduct } = useCan();
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:600px)');
  const [rows, setRows] = useState([{ product: '', qty: '', unit: '', rate: '', mrp: '' }]);
  const [formData, setFormData] = useState({
    customerId: '',
    date: new Date()
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [customer, setcustomer] = useState([]);
  const [selectcustomer, setSelectcustomer] = useState([]);
  const [customername, setCustomername] = useState('');
  const [product, setProduct] = useState('');
  const [selectproduct, setSelectproduct] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  {
    console.log(selectcustomer);
  }
  const [canCreateCustomerValue, setCanCreateCustomerValue] = useState(null);
  const [canCreateProductvalue, setCanCreateProductvalue] = useState(null);
  useEffect(() => {
    setCanCreateCustomerValue(canCreateCustomer());
    setCanCreateProductvalue(canCreateProduct());
  }, [canCreateCustomer, canCreateProduct]);
  const unitOptions = [
    { value: 'box', label: 'box' },
    { value: 'fts.', label: 'fts.' },
    { value: 'kg', label: 'kg' },
    { value: 'LTR', label: 'LTR.' },
    { value: 'MTS', label: 'MTS' },
    { value: 'pcs.', label: 'pcs.' },
    { value: 'ton', label: 'ton' }
  ];

  const handleDeleteRow = async (index) => {
    const updatedRows = [...rows];
    const deletedRow = updatedRows.splice(index, 1)[0];
    setRows(updatedRows);

    const deletedAmount = deletedRow.mrp;
    const newSubtotal = subtotal - deletedAmount;
    setSubtotal(newSubtotal < 0 ? 0 : newSubtotal);
  };

  const handleAddRow = () => {
    const newRow = { product: '', qty: '', unit: '', rate: '', mrp: '' };
    setRows((prevRows) => [...prevRows, newRow]);
  };
  const handleUnitChange = (selectedOption, index) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], unit: selectedOption.value };
    setRows(updatedRows);
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
            productname: selectedOption.label,
            unit: selectedOption.unit
          };
        }
        return row;
      });

      setRows(updatedRows);
      setSelectproduct(selectedOption.value);
      setIsproductDrawerOpen(false);
    }
  };

  const handleNewProductAdded = (newProduct) => {
    const updatedProductList = [
      ...product,
      {
        value: newProduct.id,
        label: newProduct.productname,
        unit: newProduct.unit
      }
    ];
    setProduct(updatedProductList);
    setIsproductDrawerOpen(false);
  };
  // called api of all product and customer for show name of them in dropdown
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllCustomersCash());
        if (Array.isArray(response)) {
          const options = response.map((customer) => ({ value: customer.id, label: customer.customername }));
          setcustomer([{ value: 'new', label: 'Create New Customer' }, ...options]);
          if (!canCreateCustomerValue) {
            setcustomer(options);
          }
        }
        const productResponse = await dispatch(fetchAllProductsCash());
        if (Array.isArray(productResponse)) {
          const options = productResponse.map((product) => ({
            value: product.id,
            label: product.productname,
            unit: product.unit
          }));
          setProduct([{ value: 'new', label: 'Create New Product' }, ...options]);
          if (!canCreateProductvalue) {
            setProduct(options);
          }
        } else {
          console.error('fetchAllProductsCash returned an unexpected response:', productResponse);
        }
      } catch (error) {
        console.error('Error fetching sales cash:', error);
      }
    };

    if (canCreateCustomerValue !== null || canCreateProductvalue !== null) {
      fetchData();
    }
  }, [dispatch, id, canCreateCustomerValue, canCreateProductvalue]);

  // use for select customer name from dropdown
  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Customer') {
      setIsDrawerOpen(true);
    } else {
      formData.customerId = selectedOption.value;
      setFormData(formData);
      setCustomername(selectedOption.label);
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
        const response = await dispatch(SalesInvoiceCashview(id));
        const { date, totalMrp, CashCustomer } = response;
        setFormData({ date, totalMrp, customerId: CashCustomer.id });
        setSelectcustomer(CashCustomer.id);
        setCustomername(CashCustomer.customername);
        const updatedRows = response.items.map((item) => ({
          id: item.id,
          productId: item.CashProduct.id,
          productname: item.CashProduct.productname,
          unit: item.unit,
          qty: item.qty,
          rate: item.rate,
          mrp: item.qty * item.rate
        }));
        setRows(updatedRows);
      }
    };
    data();
  }, [dispatch, id]);
  //create new customer after show in dropdwon
  const handleNewCustomer = (newCustomerData) => {
    setcustomer((prevCustomers) => [
      ...prevCustomers,
      { value: newCustomerData?.data?.data?.id, label: newCustomerData?.data?.data?.accountname, state: newCustomerData?.data?.data?.state },
    ]);
    setIsDrawerOpen(false);
  };

  const handlecreateDebitnote = async () => {
    try {
      if (id) {
        const payload = {
          ...formData,
          // totalQty: totalQuantity,
          totalMrp: subtotal,
          items: rows.map((row) => ({
            id: row.id || null,
            productId: row.productId,
            unit: row.unit,
            qty: Number(row.qty),
            rate: Number(row.rate),
            mrp: row.mrp
          }))
        };
        await dispatch(updateSalesinvoiceCash(id, payload, navigate));
      } else {
        const payload = {
          ...formData,
          // totalQty: totalQuantity,
          totalMrp: subtotal,
          items: rows.map((row) => ({
            productId: row.productId,
            unit: row.unit,
            qty: Number(row.qty),
            rate: Number(row.rate),
            mrp: row.mrp
          }))
        };
        console.log(selectcustomer);
        await dispatch(createSalesInvoiceCash(payload, navigate));
      }
    } catch (error) {
      console.error('Error creating sales cash:', error);
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Sales Cash
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Sales Cash
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Customer : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={customer}
                value={{ value: formData.customerId, label: customername }}
                onChange={handleSelectChange}
              />
            </Grid>
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onChangeCustomer={handleNewCustomer} />

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
                    UNIT : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
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
                        onNewProductAdded={handleNewProductAdded}
                      />
                      <TableCell id="newcs">
                        <input placeholder="qty" value={row.qty} onChange={(e) => handleInputChange(index, 'qty', e.target.value)} />
                      </TableCell>
                      <TableCell>
                        <Select
                          options={unitOptions}
                          value={row.unit ? { label: row.unit, value: row.unit } : null}
                          onChange={(selectedOption) => handleUnitChange(selectedOption, index)}
                        />
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
                <Link to="/salescashlist" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button id="savebtncs" onClick={handlecreateDebitnote}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/salescashlist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handlecreateDebitnote}>
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

export default Salescash;
