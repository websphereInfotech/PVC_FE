import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorProductDrawer from '../../../component/productadd';
import { useMediaQuery } from '@mui/material';
import { createBom, fetchAllProducts, getAllBom, updateBom, viewSingleBom } from 'store/thunk';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';

const Addbillofmaterial = () => {
  const { canCreateProduct } = useCan();
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:600px)');
  const [rows, setRows] = useState([{ product: '', qty: 0, wastage: 0 }]);
  const [formData, setFormData] = useState({
    bomNo: 0,
    date: new Date(),
    description: '',
    productId: '',
    qty: 0
  });
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [canCreateProductvalue, setCanCreateProductvalue] = useState(null);

  useEffect(() => {
    setCanCreateProductvalue(canCreateProduct());
  }, [canCreateProduct]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bomId } = useParams();
  console.log(bomId, 'id');
  const handleDeleteRow = async (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow = { product: '', qty: 0, wastage: 0 };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handleSelectProductChange = (selectedOption, rowIndex) => {
    if (selectedOption && selectedOption.label === 'Create New Product') {
      setIsproductDrawerOpen(true);
    } else {
      const updatedRows = rows.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            productId: selectedOption.value,
            productname: selectedOption.label
          };
        }
        return row;
      });
      setRows(updatedRows);
      setIsproductDrawerOpen(false);
    }
  };

  const handleProductDrawerSelect = (selectedOption) => {
    const newRow = {
      productId: selectedOption.value,
      productname: selectedOption.label
    };

    setRows((prevRows) => [...prevRows, newRow]);
    setIsproductDrawerOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await dispatch(fetchAllProducts());
        if (Array.isArray(productResponse)) {
          const options = productResponse.map((product) => ({
            value: product.id,
            label: product.productname
          }));
          setProductOptions([{ value: 'new', label: 'Create New Product' }, ...options]);
          if (!canCreateProductvalue) {
            setProductOptions(options);
          }
        } else {
          console.error('fetchAllProductsCash returned an unexpected response:', productResponse);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    if (canCreateProductvalue !== null) {
      fetchData();
    }
  }, [dispatch, canCreateProductvalue]);

  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: date
    }));
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) => {
      if (rowIndex === index) {
        const numericValue = field === 'qty' || field === 'wastage' ? Number(value) : value;
        return { ...row, [field]: numericValue };
      }
      return row;
    });
    setRows(updatedRows);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (bomId) {
        const response = await dispatch(viewSingleBom(bomId));
        const { bomNo, description, date, bomProduct, qty } = response;
        setFormData({ date, bomNo, description, qty, productId: bomProduct.id });
        const updatedRows = response.bomItems.map((item) => ({
          id: item.id,
          productId: item.bomItemsProduct.id,
          productname: item.bomItemsProduct.productname,
          qty: item.qty,
          wastage: item.wastage
        }));
        setRows(updatedRows);
      }
    };

    const generateAutoDebitnoteNumber = async () => {
      if (!bomId) {
        try {
          const BomResponse = await dispatch(getAllBom());
          let nextBomNumber = 1;
          if (BomResponse.length === 0) {
            const BomNumber = nextBomNumber;
            setFormData((prevFormData) => ({
              ...prevFormData,
              bomNo: Number(BomNumber)
            }));
            return;
          }
          const existingBomNumbers = BomResponse.map((Bom) => {
            const BomNumber = Bom.bomNo;
            return parseInt(BomNumber);
          });
          const maxBomNumber = Math.max(...existingBomNumbers);
          if (!isNaN(maxBomNumber)) {
            nextBomNumber = maxBomNumber + 1;
          }

          const BomNumber = nextBomNumber;
          setFormData((prevFormData) => ({
            ...prevFormData,
            bomNo: Number(BomNumber)
          }));
        } catch (error) {
          console.error('Error generating auto Bom number:', error);
        }
      }
    };
    generateAutoDebitnoteNumber();
    fetchData();
  }, [dispatch, bomId]);

  const handleCreateOrUpdateInvoice = async () => {
    try {
      const payload = {
        ...formData,
        items: rows.map((row) => ({
          id: row.id || null,
          productId: row.productId,
          qty: row.qty,
          wastage: row.wastage
        }))
      };
      if (bomId) {
        await dispatch(updateBom(bomId, payload, navigate));
      } else {
        await dispatch(createBom(payload, navigate));
      }
    } catch (error) {
      console.error('Error creating or updating invoice:', error);
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {bomId ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Bill Of Material
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Bill Of Material
          </Typography>
        )}
        <Grid container spacing={2} style={{ marginBottom: '16px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="No." value={formData.bomNo} onChange={(e) => setFormData({ ...formData, bomNo: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              isClearable={false}
              showTimeSelect={false}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Description : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Product : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              color="secondary"
              onChange={(selectedOption) => setFormData({ ...formData, productId: selectedOption.value })}
              options={productOptions}
              value={productOptions.find((option) => option.value === formData.productId) || ''}
            />
            <AnchorProductDrawer
              open={isproductDrawerOpen}
              onClose={() => setIsproductDrawerOpen(false)}
              onSelectProduct={handleProductDrawerSelect}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              QTY : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="Description"
              value={formData.qty}
              onChange={(e) => setFormData({ ...formData, qty: Number(e.target.value) })}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} style={isMobileX ? { overflowX: 'auto' } : {}}>
          <div style={{ maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={500} sx={{ fontSize: '12px' }}>
                    PRODUCT : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    QTY : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>WASTAGE :</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Select
                        color="secondary"
                        onChange={(selectedOption) => handleSelectProductChange(selectedOption, index)}
                        options={productOptions}
                        value={{ value: row.productId, label: row.productname }}
                      />
                    </TableCell>
                    <AnchorProductDrawer
                      open={isproductDrawerOpen}
                      onClose={() => setIsproductDrawerOpen(false)}
                      onSelectProduct={(selectedOption) => handleSelectProductChange(selectedOption, index)}
                    />
                    <TableCell id="newcs">
                      <input placeholder="qty" value={row.qty} onChange={(e) => handleInputChange(index, 'qty', e.target.value)} />
                    </TableCell>
                    <TableCell id="newcs">
                      <input
                        placeholder="wastage"
                        value={row.wastage}
                        onChange={(e) => handleInputChange(index, 'wastage', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
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

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Link to="/billofmateriallist" style={{ textDecoration: 'none' }}>
                <button id="savebtncs" style={{ marginRight: '5px' }}>
                  Cancel
                </button>
              </Link>
              <button id="savebtncs" onClick={handleCreateOrUpdateInvoice}>
                Save
              </button>
            </div>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
            <div>
              <Link to="/billofmateriallist" style={{ textDecoration: 'none' }}>
                <button id="savebtncs">Cancel</button>
              </Link>
            </div>
            <div style={{ display: 'flex' }}>
              <button id="savebtncs" onClick={handleCreateOrUpdateInvoice}>
                Save
              </button>
            </div>
          </Grid>
        )}
      </div>
    </Paper>
  );
};

export default Addbillofmaterial;
