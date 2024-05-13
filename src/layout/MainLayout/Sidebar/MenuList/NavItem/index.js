import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
// import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// third party
import { useSelector } from 'react-redux';

// project import
// import * as actionTypes from 'store/actions';

// assets
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// ==============================|| NAV ITEM ||============================== //

const NavItem = ({ item, level }) => {
  // const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  // const menuOpen = useSelector((state) => state.open);
  // const dispatch = useDispatch();
  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon color="secondary" />
  ) : (
    <ArrowForwardIcon color="secondary" fontSize={level > 0 ? 'secondary' : 'secondary'} />
  );

  let itemTarget = '';
  if (item.target) {
    itemTarget = '_blank';
  }
  let listItemProps = { component: Link, to: item.url };
  if (item.external) {
    listItemProps = { component: 'a', href: item.url };
  }
  // const handleCloseDrawer = () => {
  //   // console.log('enter');
  //   // drawerToggle();
  //   // menuOpen.open;
  //   // console.log('customization.isOpen ', customization);
  //   console.log('customization.isOpen ', menuOpen.open);
  //   dispatch({ type: actionTypes.MENU_CLOSE });
  //   console.log('actionTypes.MENU_CLOSE', actionTypes.MENU_CLOSE);
  // };
  return (
    <ListItemButton
      disabled={item.disabled}
      sx={{
        ...(level > 1 && { backgroundColor: 'transparent !important', py: 1, borderRadius: '5px' }),
        borderRadius: '5px',
        marginBottom: '5px',
        pl: `${level * 16}px`
      }}
      selected={customization.isOpen === item.id}
      component={Link}
      // onClick={handleCloseDrawer}
      to={item.url}
      target={itemTarget}
      {...listItemProps}
    >
      <ListItemIcon sx={{ minWidth: 25 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography sx={{ pl: 1.4 }} variant={customization.isOpen === item.id ? 'subtitle2' : 'body1'} color="secondary">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption, pl: 200 }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  // drawerToggle: PropTypes.func,
  icon: PropTypes.object,
  target: PropTypes.object,
  url: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string,
  caption: PropTypes.string,
  chip: PropTypes.object,
  color: PropTypes.string,
  label: PropTypes.string,
  avatar: PropTypes.object
};

export default NavItem;
