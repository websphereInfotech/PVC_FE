import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel, Paper } from '@mui/material';
import { createProduct } from 'store/thunk';

const AnchorProductDrawer = ({ open, onClose }) => {
  AnchorProductDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  const dispatch = useDispatch();
  const [itemtype, setItemType] = React.useState('Product');
  const [bankdetail, setBankDetail] = React.useState('Batch wise');
  const [openingstock, setOpeningStock] = React.useState(true);
  const [nagativeqty, setNagativeQty] = React.useState(false);
  const [lowstock, setLowStock] = React.useState(false);
  const [itemselected, setItemSelected] = React.useState('Show Item In Purchase');
  const [cess, setCess] = React.useState(true);

  const [formData, setFormData] = React.useState({
    productname: '',
    description: '',
    itemgroup: '',
    itemcategory: '',
    unit: '',
    salesprice: '',
    purchaseprice: '',
    gstrate: ''
  });
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleItem = (e) => {
    setItemType(e.target.value);
  };
  const handleBankDetail = (e) => {
    setBankDetail(e.target.value);
  };
  const handleOpeningStock = (e) => {
    setOpeningStock(e.target.value === 'true' ? true : false);
  };
  const handleNegativeQty = (e) => {
    setNagativeQty(e.target.value === 'true' ? true : false);
  };
  const handleLowStock = (e) => {
    setLowStock(e.target.value === 'true' ? true : false);
  };
  const handleItemSetected = (e) => {
    setItemSelected(e.target.value);
  };
  const handleCess = (e) => {
    setCess(e.target.value === 'true' ? true : false);
  };
  const handleSave = async () => {
    try {
      const data = {
        ...formData,
        itemtype,
        bankdetail,
        openingstock,
        nagativeqty,
        lowstock,
        itemselected,
        cess
      };
      await dispatch(createProduct(data));
    } catch (error) {
      console.error('Error creating Product', error);
    }
  };
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
            <Typography variant="subtitle1">Item Type</Typography>
            <RadioGroup row defaultValue="Product" value={formData.itemtype} onChange={handleItem}>
              <FormControlLabel value="Product" control={<Radio />} label="Product" />
              <FormControlLabel value="Service" control={<Radio />} label="Service" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item>
            <Typography variant="subtitle1">Product</Typography>
            <input placeholder="Enter Product" id="productname" value={formData.productname} onChange={handleInputChange} />
          </Grid>
          {/* </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}> */}
          <Grid item>
            <Typography variant="subtitle1">Product Description</Typography>
            <input placeholder="Enter Product" id="description" value={formData.description} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item>
            <Typography variant="subtitle1">Item Group</Typography>
            <input placeholder="Enter Group" id="itemgroup" value={formData.itemgroup} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Item Category</Typography>
            <input placeholder="Enter Category" id="itemcategory" value={formData.itemcategory} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item>
            <Typography variant="subtitle1">Unit</Typography>
            <input placeholder="YR-OTHERS" id="unit" value={formData.unit} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sx={{ margin: '0px 0px' }}>
            <Typography variant="subtitle1">Provide bank details?</Typography>
            <RadioGroup row defaultValue="Batch wise" value={formData.bankdetail} onChange={handleBankDetail}>
              <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
              <FormControlLabel value="Batch wise" control={<Radio />} label="Batch wise" />
              <FormControlLabel value="Lot wise" control={<Radio />} label="Lot wise" />
            </RadioGroup>
          </Grid>
          <Grid item sx={{ margin: '0px 0px' }}>
            <Typography variant="subtitle1">
              Do you want to add batch wise<br></br>
              opening stock?
            </Typography>
            <RadioGroup row defaultValue="No" value={formData.openingstock} onChange={handleOpeningStock}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sx={{ margin: '0px 0px' }}>
            <Typography variant="subtitle1">Negative Qty Allowed</Typography>
            <RadioGroup row defaultValue="No" value={formData.nagativeqty} onChange={handleNegativeQty}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item sx={{ margin: '0px 0px' }}>
            <Typography variant="subtitle1">Low Stock Warning</Typography>
            <RadioGroup row defaultValue="No" value={formData.lowstock} onChange={handleLowStock}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sx={{ margin: '0px 0px' }} md={6} lg={12}>
            <RadioGroup row defaultValue="Show Item In Purchase" value={formData.itemselected} onChange={handleItemSetected}>
              <FormControlLabel value="Show Item In Purchase" control={<Radio />} label="Show Item In Purchase" />
              <FormControlLabel value="Show Item In Sales" control={<Radio />} label="Show Item In Sales" />
            </RadioGroup>
          </Grid>
          {/* <Grid item sx={{ margin: '0px 0px' }}>
            <RadioGroup row defaultValue="Show Item In Sales">
            </RadioGroup>
          </Grid> */}
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sm={6}>
            <Typography variant="subtitle1">Purchase Price</Typography>
            <input placeholder="0.000" id="purchaseprice" value={formData.purchaseprice} onChange={handleInputChange} />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="subtitle1">Sales Price</Typography>
            <input placeholder="0.000" id="salesprice" value={formData.salesprice} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sm={6}>
            <Typography variant="subtitle1">GST Rate(%)</Typography>
            <input placeholder="0%" id="gstrate" value={formData.gstrate} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sx={{ margin: '0px 0px' }} sm={6}>
            <Typography variant="subtitle1">Cess Enable</Typography>
            <RadioGroup row defaultValue="No" value={formData.cess} onChange={handleCess}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 10px' }}>
          <div>
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
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
          <div style={{ display: 'flex' }}>
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
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default AnchorProductDrawer;
