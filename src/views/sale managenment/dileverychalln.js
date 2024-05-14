import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import AnchorTemporaryDrawer from '../../component/customeradd';
import AnchorProductDrawer from '../../component/productadd';
import 'react-toastify/dist/ReactToastify.css';
import {
  createDeliveryChallan,
  // createDeliveryChallanItem,
  deleteDileveryChallan,
  updateDileveryChallan
  // updateDileveryChallanItem
} from 'store/thunk';
import { fetchAllProducts, fetchAllCustomers } from 'store/thunk';
import { Link } from 'react-router-dom';
// Custom styled input component
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
import { Deliverychallanview } from 'store/thunk';
import { useNavigate, useParams } from 'react-router';

const Deliverychallan = () => {
  const { id } = useParams();
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { srNo: '1', product: '', qty: '', mrp: '', description: '', expirydate: '', batchno: '', quotationno: '' }
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [customer, setcustomer] = useState([]);
  // const [selectcustomer, setSelectcustomer] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectproduct, setSelectproduct] = useState([]);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  // const [idMapping, setIdMapping] = useState({});
  const [formData, setFormData] = useState({
    customer: '',
    mobileno: '',
    date: '',
    challanno: '',
    email: ''
  });

  // to add multiple row for product item
  const handleAddRow = () => {
    const newRow = {
      srNo: (rows.length + 1).toString(),
      product: '',
      qty: '',
      mrp: '',
      description: '',
      expirydate: '',
      batchno: '',
      quotationno: ''
    };
    setRows([...rows, newRow]);
  };

  // set form data value
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  //set input's target value
  const handleInputChange = (srNo, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.srNo === srNo) {
        return { ...row, [field]: value };
      }
      return row;
    });

    updatedRows.forEach((row) => {
      const amount = row.qty * row.mrp;
      row.amount = Number.isNaN(amount) ? 0 : amount;
    });

    const newSubtotal = updatedRows.reduce((acc, row) => acc + row.amount, 0);
    setSubtotal(Number.isNaN(newSubtotal) ? 0 : newSubtotal);
    setRows(updatedRows);
  };

  // use for delete row
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
    dispatch(deleteDileveryChallan(id));
  };

  //use for select customer name from dropdown
  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.value === 'new') {
      setIsDrawerOpen(true);
    } else {
      setFormData({ ...formData, customer: selectedOption.label });
      setIsDrawerOpen(false);
    }
  };

  //use for select product name from dropdown
  const handleSelectproductChange = (selectedOption, srNo) => {
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

  // call all customer and all product api's
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customers = await dispatch(fetchAllCustomers());
        if (Array.isArray(customers)) {
          const options = customers.map((customer) => ({ value: customer.id, label: customer.shortname }));
          setcustomer([{ value: 'new', label: 'Create New Customer' }, ...options]);
        }
        const productResponse = await dispatch(fetchAllProducts());
        if (Array.isArray(productResponse)) {
          setProduct(productResponse);
        }
        if (id) {
          const response = await dispatch(Deliverychallanview(id));
          const { email, mobileno, date, challanno, customer } = response;
          setFormData({ email, mobileno, date, challanno, customer });
          const deliverychallanItems = response.items;

          const updatedRows = deliverychallanItems.map((item) => {
            return {
              srNo: item.id,
              product: item.product,
              description: item.description,
              quotationno: item.quotationno,
              batchno: item.batchno,
              expirydate: item.expirydate,
              qty: item.qty,
              mrp: item.mrp
            };
          });
          setRows(updatedRows);
        }
      } catch (error) {
        console.error('Error fetching :', error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  //call craete and update deliverychallan and deliverychallan items
  const handlecreatedeliverychallan = async () => {
    try {
      if (id) {
        const payload = {
          ...formData,
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
        dispatch(updateDileveryChallan(id, payload, navigate));
      } else {
        const payload = {
          ...formData,
          items: rows?.map((row) => ({
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
        const Deliverychallan = await dispatch(createDeliveryChallan(payload, navigate));
        console.log(Deliverychallan, 'Deliverychallan');
      }
    } catch (error) {
      console.error('Error creating Deliverychallan:', error);
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Delivery Challan
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Delivery Challan
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Customer : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select color="secondary" options={customer} value={{ label: formData.customer }} onChange={handleSelectChange} />
            </Grid>
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Mobile No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Mobile No."
                id="mobileno"
                value={formData.mobileno}
                onChange={(e) => handleChange('mobileno', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Email : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Email Address"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Challan No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="0001"
                id="challanno"
                value={formData.challanno}
                onChange={(e) => handleChange('challanno', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Challan Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                type="date"
                id="date"
                value={formData.date ? formData.date.split('T')[0] : ''}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div style={{ maxWidth: '100%' }}>
              <Table>
                <TableHead>
                  <TableCell sx={{ fontSize: '12px' }}>Sr.No.</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    QUOTATION NO. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    PRODUCT : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    BATCH NO. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    EXP.DATE : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    MRP:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    QTY:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <React.Fragment key={row.srNo}>
                      <TableRow>
                        <TableCell id="newcs">
                          <input
                            // style={{width:'20px'}}
                            placeholder="Sr.No."
                            value={row.srNo}
                            readOnly
                            onChange={(e) => handleInputChange(row.srNo, 'serialno', e.target.value)}
                          />
                        </TableCell>
                        <TableCell id="newcs">
                          <input
                            placeholder="Quotation no."
                            value={row.quotationno}
                            onChange={(e) => handleInputChange(row.srNo, 'quotationno', e.target.value)}
                          />
                        </TableCell>
                        <TableCell id="newcs">
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
                            value={{ label: row.product }}
                            onChange={(selectedOption) => handleSelectproductChange(selectedOption, row.srNo)}
                          />
                        </TableCell>
                        <AnchorProductDrawer open={isproductDrawerOpen} onClose={() => setIsproductDrawerOpen(false)} />
                        <TableCell id="newcs">
                          <input
                            placeholder="date"
                            value={row.batchno}
                            onChange={(e) => handleInputChange(row.srNo, 'batchno', e.target.value)}
                          />
                        </TableCell>
                        <TableCell id="newcs">
                          <input
                            placeholder="date"
                            value={row.expirydate ? row.expirydate.split('T')[0] : ''}
                            onChange={(e) => handleInputChange(row.srNo, 'expirydate', e.target.value)}
                          />
                        </TableCell>
                        <TableCell id="newcs">
                          <input placeholder="0.00" value={row.mrp} onChange={(e) => handleInputChange(row.srNo, 'mrp', e.target.value)} />
                        </TableCell>
                        <TableCell id="newcs">
                          <input placeholder="qty" value={row.qty} onChange={(e) => handleInputChange(row.srNo, 'qty', e.target.value)} />
                        </TableCell>
                        <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                          <DeleteIcon onClick={() => handleDeleteRow(row.srNo)} />
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ border: 'none' }}>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell id="newcs">
                          <input
                            placeholder="Enter product description"
                            value={row.description}
                            onChange={(e) => handleInputChange(row.srNo, 'description', e.target.value)}
                          />
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </React.Fragment>
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
                  <p>Sub Total</p>
                  <p>₹{subtotal}</p>
                </div>
              </>
            ) : (
              // For larger screens, show all totals on one line
              <div style={{ float: 'right', width: '30%' }}>
                <div id="subtotalcs">
                  <p>Sub Total</p>
                  <p>₹{subtotal}</p>
                </div>
              </div>
            )}
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/deliverychallanlist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
                <button id="savebtncs" style={{ marginLeft: '5px' }} onClick={handlecreatedeliverychallan}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/deliverychallanlist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                {/* <button id="savebtncs" style={{ marginRight: '5px' }} onClick={handlecreatedeliverychallan}>
                  Save & Next
                </button> */}
                <button id="savebtncs" onClick={handlecreatedeliverychallan}>
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
