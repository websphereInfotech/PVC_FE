import React from 'react';

// material-ui
import { Typography } from '@mui/material';
import { FaSalesforce } from 'react-icons/fa';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| MENULIST ||============================== //

const MenuList = () => {
  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography style={{ marginTop: '0px', padding: '0px' }} key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
            <FaSalesforce />
          </Typography>
        );
    }
  });

  return navItems;
};

export default MenuList;
