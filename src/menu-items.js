import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import StoreIcon from '@mui/icons-material/Store';
import PaymentsIcon from '@mui/icons-material/Payments';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import HomeIcon from '@mui/icons-material/Home';
import ScannerIcon from '@mui/icons-material/Scanner';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getallPermissions } from 'store/thunk';

const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon,
  AccountBalanceIcon: AccountBalanceIcon,
  LoyaltyIcon: LoyaltyIcon,
  ShoppingBasketIcon: ShoppingBasketIcon,
  ProductionQuantityLimitsIcon: ProductionQuantityLimitsIcon,
  ContactMailIcon: ContactMailIcon,
  StoreIcon: StoreIcon,
  PaymentsIcon: PaymentsIcon,
  PropaneTankIcon: PropaneTankIcon,
  HomeIcon: HomeIcon,
  ScannerIcon: ScannerIcon,
  BusinessCenterIcon: BusinessCenterIcon
};

const MenuItem = () => {
  const [permissions, setPermissions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(getallPermissions());
        setPermissions(data);
      } catch (error) {
        console.error('permission', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const getTypeFromSessionStorage = () => {
    return sessionStorage.getItem('type');
  };

  const getRoleFromSessionStorage = () => {
    return sessionStorage.getItem('role');
  };

  const createConfig = () => {
    const type = getTypeFromSessionStorage();
    return type;
  };

  const createConfig1 = () => {
    const role = getRoleFromSessionStorage();
    return role;
  };

  const checkAllPermissions = (resource, permissionNames) => {
    const rolePermissions = permissions?.find((role) => role.role === createConfig1());

    if (rolePermissions) {
      const permission = rolePermissions?.permissions?.find((res) => res.resource === resource);

      if (permission) {
        return permission.permissions.some((perm) => permissionNames.includes(perm.permission) && perm.permissionValue === true);
      }
    }

    return false;
  };

  const hasAllPermissions = checkAllPermissions('ProFormaInvoice', [
    'get_all_ProFormaInvoice',
    'view_single_ProFormaInvoice',
    'delete_ProFormaInvoice',
    'delete_ProFormaInvoiceItem',
    'update_ProFormaInvoice',
    'create_ProFormaInvoice'
  ]);

  const hasAllpermissionsalesinvoice = checkAllPermissions('Sales Invoice', [
    'create_salesinvoice',
    'update_salesInvoice',
    'delete_salesInvoice',
    'view_single_salesInvoice',
    'view_all_salesInvoice'
  ]);
  return {
    items: [
      {
        id: 'navigation',
        type: 'group',
        icon: icons['HomeIcon'],
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            icon: icons['HomeIcon'],
            url: '/dashboard'
          }
        ]
      },
      createConfig() === 'C' && createConfig1() === 'Super Admin'
        ? {
            type: 'group',
            icon: icons['NavigationOutlinedIcon'],
            children: [
              {
                id: 'auth',
                title: 'Authentication',
                type: 'collapse',
                icon: icons['SecurityOutlinedIcon'],
                children: [
                  {
                    id: 'permission',
                    title: 'Permission',
                    type: 'item',
                    url: '/permission'
                  },
                  {
                    id: 'adduser',
                    title: 'User Management',
                    type: 'item',
                    url: '/userlist'
                  }
                ]
              }
            ]
          }
        : {},
      {
        type: 'group',
        icon: icons[''],
        children: [
          {
            id: 'Financial Management',
            title: 'Financial Management',
            type: 'collapse',
            icon: icons['AccountBalanceIcon'],
            children: [
              {
                id: 'Payment',
                title: 'Payment',
                type: 'collapse',
                icon: icons['PaymentsIcon'],
                children: [
                  {
                    id: 'payment-list',
                    title: 'Payments',
                    type: 'item',
                    url: '/paymentlist'
                  }
                  // {
                  //   id: 'payment-recieve',
                  //   title: 'Payment Recieve',
                  //   type: 'item',
                  //   url: '/paymentrecieve'
                  // }
                ]
              },
              {
                id: 'sale-management',
                title: 'Sale Management',
                type: 'collapse',
                icon: icons['LoyaltyIcon'],
                children: [
                  hasAllPermissions && {
                    id: 'proformainvoice',
                    title: 'Pro Forma Invoice',
                    type: 'item',
                    url: '/proformainvoiceList'
                  },
                  {
                    id: 'Delivery Challan',
                    title: 'Delivery Challan',
                    type: 'item',
                    url: '/deliverychallanlist'
                  },
                  hasAllpermissionsalesinvoice && {
                    id: 'sales invoice',
                    title: 'Sales Invoice',
                    type: 'item',
                    url: '/salesinvoicelist'
                  },
                  {
                    id: 'sales return',
                    title: 'Sales Return',
                    type: 'item',
                    url: '/salesreturnlist'
                  },
                  {
                    id: 'reciept',
                    title: 'Reciept',
                    type: 'item'
                    // url: '/salesreturnmain'
                  }
                ]
              },
              {
                id: 'Purchase Management',
                title: 'Purchase Management',
                type: 'collapse',
                icon: icons['ShoppingBasketIcon'],
                children: [
                  {
                    id: 'Purchase Orders',
                    title: 'Purchase Orders',
                    type: 'item',
                    url: '/purchaselist'
                  },
                  {
                    id: 'Purchase Bill',
                    title: 'Purchase Bill',
                    type: 'item',
                    url: '/purchasebilllist'
                  },
                  {
                    id: 'Purchase Return',
                    title: 'Purchase Return',
                    type: 'item',
                    url: '/purchasereturnList'
                  }
                ]
              },
              {
                id: 'expense',
                title: 'Expense',
                type: 'item',
                url: '/expenselist'
              }
              // {
              //   id: 'general',
              //   title: 'general',
              //   type: 'item',
              //   url: '/productionreport'
              // }
            ]
          }
        ]
      },
      {
        type: 'group',
        icon: icons['ProductionQuantityLimitsIcon'],
        children: [
          {
            id: 'auth',
            title: 'Production Management',
            type: 'collapse',
            icon: icons['ProductionQuantityLimitsIcon'],
            children: [
              {
                id: 'production',
                title: 'Production',
                type: 'item',
                url: '/productionlist'
              },
              {
                id: 'product',
                title: 'Product',
                type: 'item',
                url: '/products'
              },
              {
                id: 'Report',
                title: 'Report',
                type: 'item',
                url: '/productionreport'
              }
            ]
          }
        ]
      },
      {
        type: 'group',
        icon: icons['ContactMailIcon'],
        children: [
          {
            id: 'auth',
            title: 'Employee Management',
            type: 'collapse',
            icon: icons['ContactMailIcon'],
            children: [
              {
                id: 'Employee Directory',
                title: 'Employee Directory',
                type: 'item',
                url: '/employeedirectory'
              },
              {
                id: 'Performance Management',
                title: 'Performance Management',
                type: 'item',
                url: '/performanceemployee'
              },
              {
                id: 'Report',
                title: 'Report',
                type: 'item',
                url: '/productionreport'
              }
            ]
          }
        ]
      },
      {
        type: 'group',
        icon: icons['StoreIcon'],
        children: [
          {
            id: 'auth',
            title: 'Company Management',
            type: 'collapse',
            icon: icons['StoreIcon'],
            children: [
              {
                id: 'Company Profile',
                title: 'Company Profile',
                type: 'item',
                url: '/profile'
              },
              {
                id: 'Company',
                title: 'Company',
                type: 'item',
                url: '/companylist'
              }
            ]
          }
        ]
      },
      {
        type: 'group',
        icon: icons['PropaneTankIcon'],
        children: [
          {
            id: 'auth',
            title: 'Stoke Management',
            type: 'collapse',
            icon: icons['PropaneTankIcon'],
            children: [
              {
                id: 'Stoke',
                title: 'Total Stoke',
                type: 'item',
                url: '/stockmain'
              },
              {
                id: 'Report',
                title: 'Report',
                type: 'item',
                url: '/productionreport'
              }
            ]
          }
        ]
      },
      {
        type: 'group',
        icon: icons['ScannerIcon'],
        children: [
          {
            id: 'Machine Management',
            title: 'Machine Management',
            type: 'collapse',
            icon: icons['ScannerIcon'],
            children: [
              {
                id: 'Machine Inventory',
                title: 'Machine Inventory',
                type: 'item',
                url: '/machineinventory'
              },
              {
                id: 'Report',
                title: 'Report',
                type: 'item',
                url: '/productionreport'
              }
            ]
          }
        ]
      },
      {
        type: 'group',
        icon: icons['BusinessCenterIcon'],
        children: [
          {
            id: 'general Management',
            title: 'general Management',
            type: 'collapse',
            icon: icons['BusinessCenterIcon'],
            children: [
              {
                id: 'Ganeral Voucher',
                title: 'Ganeral Voucher',
                type: 'item',
                url: '/generalmain'
              },
              {
                id: 'Stoke general',
                title: 'Stoke general',
                type: 'item',
                url: '/stokegeneral'
              }
            ]
          }
        ]
      },
      {
        id: 'support',
        title: 'Support',
        type: 'group',
        icon: icons['ContactSupportOutlinedIcon'],
        children: [
          // {
          //   id: 'disabled-menu',
          //   title: 'Disabled Menu',
          //   type: 'item',
          //   url: '#',
          //   icon: icons['BlockOutlinedIcon'],
          //   disabled: true
          // },
          {
            id: 'Report',
            title: 'Report',
            type: 'item',
            url: '/reports',
            icon: icons['HelpOutlineOutlinedIcon']
          }
        ]
      }
    ]
  };
};

export default MenuItem;
