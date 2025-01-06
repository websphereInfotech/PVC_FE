import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel, Paper } from '@mui/material';
import Select from 'react-select';
import { createProduct, fetchAllItemcategory, fetchAllItemGroup, updateProduct, viewProduct } from 'store/thunk';
import { useNavigate } from 'react-router';
import ItemGroup from './itemgruop';
import Itemcategory from './itemcategory';
import useCan from 'views/permission managenment/checkpermissionvalue';

const AnchorProductDrawer = ({ open, onClose, id, onNewProductAdded, onProductUpdated }) => {
  AnchorProductDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string,
    onNewProductAdded: PropTypes.func.isRequired,
    onProductUpdated: PropTypes.func.isRequired
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canCreateItemgroup, canseeitemcategory } = useCan();
  const [loading, setLoading] = React.useState(false);
  const [itemtype, setItemType] = React.useState('Product');
  const [openingstock, setOpeningStock] = React.useState(true);
  const [nagativeqty, setNagativeQty] = React.useState(false);
  const [lowstock, setLowStock] = React.useState(false);
  const [cess, setCess] = React.useState(true);
  const [isWastage, setIsWastage] = React.useState(false);
  const [selectedGST, setSelectedGST] = React.useState('');
  const [selectedItemGroup, setSelectedItemGroup] = React.useState('');
  const [itemGroupDrawerOpen, setItemGroupDrawerOpen] = React.useState(false);
  const [itemCategoryDrawerOpen, setItemCategoryDrawerOpen] = React.useState(false);
  const [itemgroupOptions, setItemgroupOptions] = React.useState([]);
  const [itemgroupname, setItemgroupname] = React.useState('');
  const [itemcategoryOptions, setItemcategoryOptions] = React.useState([]);
  const [itemcategoryname, setItemcategoryname] = React.useState('');
  const [canCreategroupvalue, setCanCreategroupvalue] = React.useState(null);
  const [canCreatecategoryvalue, setCanCreatecategoryvalue] = React.useState(null);
  const [formData, setFormData] = React.useState({
    productname: '',
    description: '',
    itemGroupId: '',
    itemCategoryId: '',
    unit: '',
    salesprice: 0,
    purchaseprice: 0,
    HSNcode: 0,
    gstrate: 0,
    lowStockQty: null,
    weight: ''
  });

  React.useEffect(() => {
    setCanCreategroupvalue(canCreateItemgroup());
    setCanCreatecategoryvalue(canseeitemcategory());
  }, [canCreateItemgroup, canseeitemcategory]);

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

  const handleWastage = (e) => {
    setIsWastage(e.target.value === 'true');
  };

  React.useEffect(() => {
    const itemgroup = async () => {
      try {
        const itemgroup = await dispatch(fetchAllItemGroup());
        if (Array.isArray(itemgroup)) {
          const options = itemgroup.map((product) => ({
            value: product.id,
            label: product.name
          }));
          setItemgroupOptions([{ value: 'new_group', label: 'Create New Group' }, ...options]);
          if (!canCreategroupvalue) {
            setItemgroupOptions(options);
          }
        }
      } catch (error) {
        console.log(error, 'fetch item Group');
      }
    };
    const itemcategory = async () => {
      try {
        const itemcategory = await dispatch(fetchAllItemcategory(selectedItemGroup));
        if (Array.isArray(itemcategory)) {
          const options = itemcategory.map((category) => ({
            value: category.id,
            label: category.name
          }));
          setItemcategoryOptions([{ value: 'new_category', label: 'Create New Category' }, ...options]);
          if (!canCreatecategoryvalue) {
            setItemcategoryOptions(options);
          }
        }
      } catch (error) {
        console.log(error, 'fetch item Category');
      }
    };

    if (canCreatecategoryvalue !== null) {
      itemcategory();
    }
    if (canCreategroupvalue !== null) {
      itemgroup();
    }
  }, [dispatch, selectedItemGroup, canCreategroupvalue, canCreatecategoryvalue]);

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
          setIsWastage(productData.isWastage);
          setItemType(productData.itemtype);
          setSelectedItemGroup(productData.itemgroup);
          setItemgroupname(productData.itemGroup?.name);
          setItemcategoryname(productData.itemCategory?.name);
        } else {
          setFormData({
            productname: '',
            description: '',
            itemGroupId: '',
            itemcategory: '',
            unit: '',
            salesprice: 0,
            purchaseprice: 0,
            HSNcode: 0,
            gstrate: 0,
            lowStockQty: null,
            weight: ''
          });
          setSelectedGST(0);
          setOpeningStock(true);
          setNagativeQty(false);
          setLowStock(false);
          setCess(true);
          setItemType('Product');
          setSelectedItemGroup('');
          setItemgroupname('');
          setItemcategoryname('');
        }
      } catch (error) {
        console.error('Error fetching Product', error);
      }
    };
    fetchData();
  }, [id, dispatch]);

  const handleGSTChange = (selectedOption) => {
    setSelectedGST(selectedOption.value);
    setFormData({ ...formData, gstrate: selectedOption.value });
  };

  const handleSave = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const data = {
        ...formData,
        itemtype,
        openingstock,
        nagativeqty,
        lowstock,
        cess,
        isWastage
      };
      if (id) {
        const newdata = await dispatch(updateProduct(id, data, navigate));
        onProductUpdated(newdata.data.data);
      } else {
        const newdata = await dispatch(createProduct(data, navigate));
        onNewProductAdded(newdata.data.data);
      }
      setFormData({
        productname: '',
        description: '',
        itemgroup: '',
        itemcategory: '',
        unit: '',
        salesprice: 0,
        purchaseprice: 0,
        HSNcode: 0,
        gstrate: 0,
        lowStockQty: null,
        weight: ''
      });
      setSelectedGST('');
      setOpeningStock(true);
      setNagativeQty(false);
      setLowStock(false);
      setCess(true);
      setIsWastage(false);
      setItemType('Product');
      setSelectedItemGroup('');
    } catch (error) {
      console.error('Error creating Product', error);
    } finally {
      setLoading(false);
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
  const handleitemgroupChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Group') {
      setItemGroupDrawerOpen(true);
    } else {
      setSelectedItemGroup(selectedOption.value);
      setItemgroupname(selectedOption.label);
      setFormData({ ...formData, itemGroupId: selectedOption.value });
    }
  };

  const handleitemcategoryChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Category') {
      setItemCategoryDrawerOpen(true);
    } else {
      setItemcategoryname(selectedOption.label);
      setFormData({ ...formData, itemCategoryId: selectedOption.value });
    }
  };
  const handleNewgroupadded = (newGroup) => {
    const updatedgrouplist = [
      ...itemgroupOptions,
      {
        value: newGroup.id,
        label: newGroup.name
      }
    ];
    setItemgroupOptions(updatedgrouplist);
    setItemGroupDrawerOpen(false);
  };
  const handleNewCategoryadded = (newCategory) => {
    const updatedcategorylist = [
      ...itemcategoryOptions,
      {
        value: newCategory.id,
        label: newCategory.name
      }
    ];
    setItemcategoryOptions(updatedcategorylist);
    setItemCategoryDrawerOpen(false);
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
            <Typography variant="subtitle1">
              Item Group:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              id="itemgroup"
              options={itemgroupOptions}
              value={{ value: formData.itemGroupId, label: itemgroupname }}
              onChange={(selectedOption) => handleitemgroupChange(selectedOption)}
              styles={{
                container: (base) => ({
                  ...base,
                  width: '80%'
                })
              }}
            />
            <ItemGroup
              anchor="Right"
              onnewgroupadded={handleNewgroupadded}
              open={itemGroupDrawerOpen}
              onClose={() => setItemGroupDrawerOpen(false)}
            />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="subtitle1">
              Item Category:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              id="itemgroup"
              options={itemcategoryOptions}
              value={{ value: formData.itemCategoryId, label: itemcategoryname }}
              onChange={(selectedOption) => handleitemcategoryChange(selectedOption)}
              styles={{
                container: (base) => ({
                  ...base,
                  width: '80%'
                })
              }}
            />
            <Itemcategory
              onnewCategoryadded={handleNewCategoryadded}
              ItemGroupOptions={itemgroupOptions}
              anchor="Right"
              open={itemCategoryDrawerOpen}
              onClose={() => setItemCategoryDrawerOpen(false)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sm={6}>
            <Typography variant="subtitle1">
              Unit : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              options={unitOptions}
              value={formData.unit ? { label: formData.unit, value: formData.unit } : null}
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
            <Typography variant="subtitle1">Weight :</Typography>
            <input type="number" placeholder="Enter weight" id="weight" value={formData.weight} onChange={handleInputChange} />
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
        <Grid container spacing={2} sx={{ margin: '1px' }}>
          <Grid item sx={{ margin: '0px 0px' }} sm={6}>
            <Typography variant="subtitle1">Is Wastage?</Typography>
            <RadioGroup row defaultValue="No" value={isWastage } onChange={handleWastage}>
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
            <button id="savebtncs" onClick={handleSave} disabled={loading}>
              {loading ? 'Save' : 'Save'}
            </button>
          </div>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default AnchorProductDrawer;
