import React, { useEffect, useState } from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

// assets
// import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
// import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { useDispatch } from 'react-redux';
import { getallusers } from 'store/thunk';

// ==============================|| SEARCH SECTION ||============================== //

const SearchSection = () => {
  // const theme = useTheme();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = sessionStorage.getItem('role');
        const response = await dispatch(getallusers());
        const User = response?.find((user) => user.role === role);
        if (User) {
          setData(User.username);
        }
      } catch (error) {
        console.error('Error fetching User:', error);
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <Box>
      <Box>
        <Typography>Hey, {data}</Typography>
      </Box>
    </Box>
  );
};

export default SearchSection;
