import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorTemporaryDrawer from '../../../component/customeradd';
import AnchorProductDrawer from '../../../component/productadd';
import { useMediaQuery } from '@mui/material';
import {
  Debitnoteviewdata,
  createDebitnote,
  fetchuserwiseCompany,
  fetchAllCustomers,
  fetchAllProducts,
  getallDebitnote,
  getallPurchaseinvoice,
  updateDebitnote
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';

const DebitNote = () => {
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:600px)');
  const { canDeleteDebitnote, canCreateCustomer, canCreateProduct } = useCan();
  const [rows, setRows] = useState([{ product: '', qty: '', rate: '', mrp: '' }]);
  const [formData, setFormData] = useState({
    customerId: '',
    debitdate: new Date(),
    debitnoteno: '',
    pinvoiceno: '',
    pdate: new Date(),
    totalSgst: 0,
    totalIgst: 0,
    totalMrp: 0,
    mainTotal: 0
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [customer, setcustomer] = useState([]);
  const [selectcustomer, setSelectcustomer] = useState([]);
  const [customerState, setCustomerState] = useState('');
  const [customername, setCustomername] = useState('');
  const [companystate, setCompanystate] = useState('');
  const [product, setProduct] = useState('');
  const [selectproduct, setSelectproduct] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gststate, setGststate] = useState('');
  const [plusgst, setPlusgst] = useState(0);
  const [productResponse, setProductResponse] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [purchaseinvoicedata, setPurchaseinvoicedata] = useState([]);
  const [purchasedata, setPurchasedata] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  {
    console.log(companystate, selectcustomer);
  }
  const [canCreateCustomerValue, setCanCreateCustomerValue] = useState(null);
  const [canCreateProductvalue, setCanCreateProductvalue] = useState(null);
  useEffect(() => {
    setCanCreateCustomerValue(canCreateCustomer());
    setCanCreateProductvalue(canCreateProduct());
  }, [canCreateCustomer, canCreateProduct]);

  const handleDeleteRow = async (index) => {
    const updatedRows = [...rows];
    const deletedRow = updatedRows.splice(index, 1)[0];
    setRows(updatedRows);
    const newPlusgst = plusgst - deletedRow.gst;
    setPlusgst(newPlusgst);
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
          const newMrp = row.qty * selectedOption.rate;
          const newGst = newMrp * (selectedOption.gstrate / 100);
          return {
            ...row,
            productId: selectedOption.value,
            product: selectedOption.label,
            rate: selectedOption.rate,
            mrp: newMrp,
            gstrate: selectedOption.gstrate,
            gst: newGst
          };
        }
        return row;
      });

      const totalGST = updatedRows.reduce((acc, row) => acc + row.gst, 0);
      setPlusgst(totalGST);
      console.log(selectedOption, 'row');

      setRows(updatedRows);
      setSelectproduct(selectedOption.value);
      setIsproductDrawerOpen(false);
    }
  };

  // called api of all product and customer for show name of them in dropdown
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllCustomers());
        if (Array.isArray(response)) {
          const options = response.map((customer) => ({ value: customer.id, label: customer.accountname, state: customer.state }));
          setcustomer([{ value: 'new', label: 'Create New Customer', state: '' }, ...options]);
          if (!canCreateCustomerValue) {
            setcustomer(options);
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

        const data = await dispatch(fetchuserwiseCompany());
        const defaultCompany = data.find((company) => company.setDefault === true);
        console.log(defaultCompany.companies.state, 'defaultcompany');
        if (defaultCompany) {
          setCompanystate(defaultCompany.companies.state);
          const isGstState = defaultCompany.companies.state === customerState;
          setGststate(isGstState);
        } else {
          console.error('No default company found');
        }
      } catch (error) {
        console.error('Error fetching debit note:', error);
      }
    };

    if (canCreateCustomerValue !== null || canCreateProductvalue !== null) {
      fetchData();
    }
  }, [dispatch, customerState, gststate, id, canCreateCustomerValue, canCreateProductvalue]);

  // use for select customer name from dropdown
  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Customer') {
      setIsDrawerOpen(true);
    } else {
      formData.customerId = selectedOption.value;
      setFormData(formData);
      setCustomername(selectedOption.label);
      setCustomerState(selectedOption.state);
      setIsDrawerOpen(false);
    }
  };

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

  const handleDebitDateChange = (date) => {
    setFormData({ ...formData, debitdate: date });
  };

  const handlePurchaseDateChange = (date) => {
    setFormData({ ...formData, pdate: date });
  };

  //manage value of input of row
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
  const handlepurchaseinvoiceSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      const updatefromdata = {
        ...formData,
        invoiceId: selectedOption.value,
        invoicedate: selectedOption.invoicedate
      };
      setPurchasedata(selectedOption.label);
      setFormData(updatefromdata);
    }
  };
  useEffect(() => {
    const data = async () => {
      const purchseinvoice = await dispatch(getallPurchaseinvoice());
      const options = purchseinvoice.data.map((item) => ({
        value: item.id,
        label: item.invoiceno,
        invoicedate: item.invoicedate
      }));
      setPurchaseinvoicedata(options);
      if (id) {
        const response = await dispatch(Debitnoteviewdata(id));
        const { DebitCustomer, invoiceId, invoicedate, purchaseData, debitnoteno, debitdate, totalSgst, mainTotal, totalMrp, totalIgst } =
          response;
        setFormData({
          customerId: DebitCustomer.id,
          debitdate,
          debitnoteno,
          invoiceId,
          pdate: invoicedate,
          totalSgst,
          mainTotal,
          totalMrp,
          totalIgst
        });
        setPurchasedata(purchaseData.invoiceno);
        setSelectcustomer(DebitCustomer.id);
        setCustomerState(DebitCustomer.state);
        setCustomername(DebitCustomer.accountname);
        const updatedRows = response.items.map((item) => ({
          id: item.id,
          productId: item.DebitProduct.id,
          product: item.DebitProduct.productname,
          qty: item.qty,
          rate: item.rate,
          mrp: item.qty * item.rate,
          gstrate: item.DebitProduct.gstrate,
          gst: item.mrp * (item.DebitProduct.gstrate / 100)
        }));
        setRows(updatedRows);
        const totalGST = updatedRows.reduce((acc, row) => acc + row.gst, 0);
        setPlusgst(totalGST);
      }
    };
    const generateAutoDebitnoteNumber = async () => {
      if (!id) {
        try {
          const DebitnoteResponse = await dispatch(getallDebitnote());
          let nextDebitnoteNumber = 1;
          if (DebitnoteResponse.length === 0) {
            const DebitnoteNumber = nextDebitnoteNumber;
            setFormData((prevFormData) => ({
              ...prevFormData,
              debitnoteno: Number(DebitnoteNumber)
            }));
            return;
          }
          const existingDebitnoteNumbers = DebitnoteResponse.map((Debitnote) => {
            const DebitnoteNumber = Debitnote.debitnoteno;
            return parseInt(DebitnoteNumber);
          });
          const maxDebitnoteNumber = Math.max(...existingDebitnoteNumbers);
          if (!isNaN(maxDebitnoteNumber)) {
            nextDebitnoteNumber = maxDebitnoteNumber + 1;
          }

          const DebitnoteNumber = nextDebitnoteNumber;
          setFormData((prevFormData) => ({
            ...prevFormData,
            debitnoteno: Number(DebitnoteNumber)
          }));
        } catch (error) {
          console.error('Error generating auto Debit Note number:', error);
        }
      }
    };
    generateAutoDebitnoteNumber();
    data();
  }, [dispatch, id]);

  const handlecreateDebitnote = async () => {
    try {
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
      const gststate = companystate === customerState ? 'true' : 'false';
      if (gststate === 'true') {
        payload.totalSgst = plusgst;
        payload.totalIgst = 0;
      } else {
        payload.totalSgst = 0;
        payload.totalIgst = plusgst;
      }
      if (id) {
        await dispatch(updateDebitnote(id, payload, navigate));
      } else {
        await dispatch(createDebitnote(payload, navigate));
      }
    } catch (error) {
      console.error('Error creating debit note:', error);
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Debit Note
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Debit Note
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
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Debit Note No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="0001"
                id="debitnoteno"
                value={formData.debitnoteno}
                onChange={(e) => setFormData({ ...formData, debitnoteno: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Debit Note Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.debitdate}
                onChange={(date) => handleDebitDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Purchase Inv. No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={purchaseinvoicedata}
                value={{ value: formData.pinvoiceno, label: purchasedata }}
                onChange={handlepurchaseinvoiceSelectChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Purchase Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.pdate}
                onChange={(date) => handlePurchaseDateChange(date)}
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
                          value={{ value: row.productId, label: row.product }}
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
                      <TableCell disabled={!canDeleteDebitnote()}>
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
                <Link to="/debitnotelist" style={{ textDecoration: 'none' }}>
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
                <Link to="/debitnotelist" style={{ textDecoration: 'none' }}>
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

export default DebitNote;
