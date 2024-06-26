import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel, Paper } from '@mui/material';
import Select from 'react-select';
import { createProduct, updateProduct, viewProduct } from 'store/thunk';
import { useNavigate } from 'react-router';

const AnchorProductDrawer = ({ open, onClose, id }) => {
  AnchorProductDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemtype, setItemType] = React.useState('Product');
  const [openingstock, setOpeningStock] = React.useState(true);
  const [nagativeqty, setNagativeQty] = React.useState(false);
  const [lowstock, setLowStock] = React.useState(false);
  const [cess, setCess] = React.useState(true);
  const [selectedGST, setSelectedGST] = React.useState('');

  const [formData, setFormData] = React.useState({
    productname: '',
    description: '',
    itemgroup: '',
    itemcategory: '',
    unit: '',
    salesprice: 0,
    purchaseprice: 0,
    HSNcode: 0,
    gstrate: '',
    lowStockQty: null,
    weight: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === 'HSNcode' || id === 'salesprice' || id === 'purchaseprice' || id === 'weight' ? Number(value) : value
    }));
  };

  const handleItem = (e) => {
    setItemType(e.target.value);
  };

  const handleOpeningStock = (e) => {
    setOpeningStock(e.target.value === 'true');
  };

  const handleNegativeQty = (e) => {
    setNagativeQty(e.target.value === 'true');
  };

  const handleLowStock = (e) => {
    const isLowStock = e.target.value === 'true';
    setLowStock(isLowStock);
    setFormData((prevData) => ({
      ...prevData,
      lowStockQty: isLowStock ? prevData.lowStockQty : null
    }));
  };

  const handleCess = (e) => {
    setCess(e.target.value === 'true');
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await dispatch(viewProduct(id));
          const productData = response;
          setFormData({ ...productData, weight: productData.weight });
          setOpeningStock(productData.openingstock);
          setNagativeQty(productData.nagativeqty);
          setLowStock(productData.lowstock);
          setCess(productData.cess);
          setItemType(productData.itemtype);
        }
      } catch (error) {
        console.error('Error fetching Product', error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id, dispatch]);

  const handleGSTChange = (selectedOption) => {
    setSelectedGST(selectedOption.value);
    setFormData({ ...formData, gstrate: selectedOption.value });
  };

  const handleSave = async () => {
    try {
      const data = {
        ...formData,
        itemtype,
        openingstock,
        nagativeqty,
        lowstock,
        cess
      };
      if (id) {
        await dispatch(updateProduct(id, data, navigate));
      } else {
        await dispatch(createProduct(data, navigate));
      }
    } catch (error) {
      console.error('Error creating Product', error);
    }
  };

  const handleUnitChange = (selectedOption) => {
    setFormData({ ...formData, unit: selectedOption.value });
  };

  const unitOptions = [
    { value: 'box', label: 'box' },
    { value: 'fts.', label: 'fts.' },
    { value: 'kg', label: 'kg' },
    { value: 'LTR', label: 'LTR.' },
    { value: 'MTS', label: 'MTS' },
    { value: 'pcs.', label: 'pcs.' },
    { value: 'ton', label: 'ton' }
  ];

  const GST = [
    { value: '5', label: 'GST 5%' },
    { value: '12', label: 'GST 12%' },
    { value: '18', label: 'GST 18%' },
    { value: '28', label: 'GST 28%' }
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 15px',
          position: 'fixed',
          zIndex: '999',
          width: { xs: '100%', sm: '660px' }
        }}
      >
        <Grid item>
          <Typography variant="h4">New Item</Typography>
        </Grid>
        <Grid item>
          <CancelIcon onClick={onClose} />
        </Grid>
      </Paper>
      <Box sx={{ width: { xs: 320, sm: 660 }, overflowX: 'hidden', '&::-webkit-scrollbar': { width: '0' } }} role="presentation">
        <Grid container spacing={2} sx={{ margin: '1px', paddingTop: '50px' }}>
          <Grid item>
            <Typography variant="subtitle1">
              Item Type : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <RadioGroup row defaultValue="Product" value={itemtype} onChange={handleItem}>
              <FormControlLabel value="Product" control={<Radio />} label="Product" />
              <FormControlLabel value="Service" control={<Radio />} label="Service" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sm={6}>
            <Typography variant="subtitle1">
              Product : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter Product" id="productname" value={formData.productname} onChange={handleInputChange} />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="subtitle1">Product Description</Typography>
            <input placeholder="Enter Product" id="description" value={formData.description} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sm={6}>
            <Typography variant="subtitle1">Item Group</Typography>
            <input placeholder="Enter Group" id="itemgroup" value={formData.itemgroup} onChange={handleInputChange} />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="subtitle1">Item Category</Typography>
            <input placeholder="Enter Category" id="itemcategory" value={formData.itemcategory} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sm={6}>
            <Typography variant="subtitle1">
              Unit : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              options={unitOptions}
              value={formData.unit ? { label: formData.unit.toUpperCase(), value: formData.unit } : null}
              onChange={handleUnitChange}
            />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="subtitle1">
              GST Rate(%):<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              options={GST}
              value={formData.gstrate ? { label: `GST ${formData.gstrate}%`, value: formData.gstrate } : { label: selectedGST }}
              onChange={handleGSTChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sm={6}>
            <Typography variant="subtitle1">
              HSN Code:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter HSN Code" id="HSNcode" value={formData.HSNcode} onChange={handleInputChange} />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="subtitle1">
              Weight:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter weight" id="weight" type="number" step="0.01" value={formData.weight} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sm={6}>
            <Typography variant="subtitle1">
              Would you like to add batch wise<br></br>
              opening stock?
            </Typography>
            <RadioGroup row defaultValue="No" value={openingstock} onChange={handleOpeningStock}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid item sx={{ margin: '10px 12px' }}>
          <Typography variant="subtitle1">
            Negative Qty Allowed :<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
          </Typography>
          <RadioGroup row defaultValue="No" value={nagativeqty} onChange={handleNegativeQty}>
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>
        <Grid item sx={{ margin: '10px 12px' }}>
          <Typography variant="subtitle1">
            Low Stock Warning : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
          </Typography>
          <RadioGroup row defaultValue="No" value={lowstock} onChange={handleLowStock}>
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
          {lowstock === true ? (
            <Grid container sx={{ margin: '0px' }}>
              <Grid item sm={6}>
                <Typography variant="subtitle1">Low Stock Quantity:</Typography>
                <input
                  placeholder="Enter Low Stock Quantity"
                  id="lowStockQty"
                  value={formData.lowStockQty || ''}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          ) : (
            ''
          )}
        </Grid>

        <Grid container spacing={2} sx={{ margin: '0px' }}>
          <Grid item sm={6}>
            <Typography variant="subtitle1">Purchase Price :</Typography>
            <input placeholder="0.000" id="purchaseprice" value={formData.purchaseprice} onChange={handleInputChange} />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="subtitle1">
              Sales Price: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="0.000" id="salesprice" value={formData.salesprice} onChange={handleInputChange} />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sx={{ margin: '0px 0px' }} sm={6}>
            <Typography variant="subtitle1">Cess Enable</Typography>
            <RadioGroup row defaultValue="No" value={cess} onChange={handleCess}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 10px' }}>
          <div>
            <button id="savebtncs" onClick={onClose}>
              Cancel
            </button>
          </div>
          <div style={{ display: 'flex' }}>
            <button id="savebtncs" onClick={handleSave}>
              Save
            </button>
          </div>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default AnchorProductDrawer;
