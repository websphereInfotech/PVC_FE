import React from 'react';

import { Box, Typography } from '@mui/material';

// ==============================|| Name SECTION ||============================== //

const SearchSection = () => {
  const username = sessionStorage.getItem('username');
  return (
    <Box>
      <Box>
        <Typography>Hey, {username}</Typography>
      </Box>
    </Box>
  );
};

export default SearchSection;
