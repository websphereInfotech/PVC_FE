import { Paper, Grid, TableContainer, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Product from './product';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { fetchAllItemGroup } from 'store/thunk';

const LowStock = () => {
  const [product, setProduct] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [groupname, setGroupname] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = async () => {
      const productResponse = await dispatch(fetchAllItemGroup());
      if (Array.isArray(productResponse)) {
        const options = productResponse.map((product) => ({
          value: product.id,
          label: product.name
        }));
        setProduct([...options]);
      }
    };
    data();
  }, [dispatch]);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setGroupId(selectedOption.value);
      setGroupname(selectedOption.label);
    }
  };

  return (
    <Paper style={{ width: 'auto', padding: '20px' }}>
      <TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" id="mycss">
              Product
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ marginLeft: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'end', width: '98%' }}>
              <Select
                styles={{ container: (provided) => ({ ...provided, width: 200 }) }}
                options={product}
                onChange={handleSelectChange}
                value={{ value: groupId, label: groupname }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Product GroupId={groupId} />
          </Grid>
        </Grid>
      </TableContainer>
    </Paper>
  );
};

export default LowStock;
