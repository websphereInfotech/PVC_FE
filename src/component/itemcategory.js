import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { Grid, Typography, Card } from '@mui/material';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { createItemcategory, fetchAllItemGroup } from 'store/thunk';

const Itemcategory = ({ open, onClose, onnewCategoryadded, onnewgroupadded }) => {
  const [itemGroupOptions, setItemGroupOptions] = React.useState([]);
  const [selectedItemGroup, setSelectedItemGroup] = React.useState(null);
  const [categoryName, setCategoryName] = React.useState('');
  const dispatch = useDispatch();
  React.useEffect(() => {
    const itemgroupdata = async () => {
      try {
        const response = await dispatch(fetchAllItemGroup());
        console.log(response, 'RESPONSE');
        const options = response.map((group) => ({
          value: group.id,
          label: group.name
        }));
        setItemGroupOptions(options);
        if (onnewgroupadded) {
          onnewgroupadded(options);
        }
      } catch (error) {
        console.error('There was an error fetching the item groups!', error);
      }
    };
    itemgroupdata();
  }, [dispatch, onnewgroupadded]);

  const handleSave = async () => {
    const payload = {
      itemGroupId: selectedItemGroup.value,
      name: categoryName
    };
    const response = await dispatch(createItemcategory(payload));
    console.log(response.data.data, 'RESPONSE');
    onnewCategoryadded(response.data.data);
    onClose();
    setSelectedItemGroup('');
    setCategoryName('');
  };

  Itemcategory.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onnewCategoryadded: PropTypes.func.isRequired,
    onnewgroupadded: PropTypes.func.isRequired
  };

  const list = (
    <Box sx={{ width: { xs: 320, sm: 420 }, overflowX: 'hidden', height: '500px' }} role="presentation">
      <Grid container spacing={2} sx={{ margin: '1px', paddingTop: '50px' }}>
        <Grid item sm={12}>
          <Typography variant="subtitle1">Item Group</Typography>
          <Select color="secondary" onChange={setSelectedItemGroup} options={itemGroupOptions} value={selectedItemGroup} />
        </Grid>
        <Grid item sm={12}>
          <Typography variant="subtitle1">Item Category</Typography>
          <input placeholder="Enter category" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
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
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 15px',
          position: 'fixed',
          zIndex: '999',
          width: { xs: '100%', sm: '420px' }
        }}
      >
        <Grid item>
          <Typography variant="h4">New Category</Typography>
        </Grid>
        <Grid item>
          <CancelIcon onClick={onClose} />
        </Grid>
      </Card>
      {list}
    </Drawer>
  );
};

export default Itemcategory;
