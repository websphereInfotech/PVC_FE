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

  const hasAllPermissiondeliverychallan = checkAllPermissions('Delivery Challan', [
    'get_all_deliverychallan',
    'create_deliverychallan',
    'view_deliverychallan',
    'update_deliverychallan',
    'delete_deliverychallan'
  ]);

  const hasAllPermissionDebitnote = checkAllPermissions('Debit Note', [
    'create_debitNote',
    'get_all_debitNote',
    'view_single_debitNote',
    'update_debitNote',
    'delete_debitNote'
  ]);

  const hasAllPermissionCreditnote = checkAllPermissions('Credit Note', [
    'create_creditNote',
    'get_all_creditNote',
    'view_single_creditNote',
    'update_creditNote',
    'delete_creditNote'
  ]);

  const hasAllPermissionPurchaseinvoice = checkAllPermissions('Purchase Invoice', [
    'create_purchase_Invoice',
    'update_purchase_Invoice',
    'delete_purchase_Invoice',
    'view_single_purchase_Invoice',
    'view_all_purchase_Invoice'
  ]);

  const hasAllPermissionSalesCash = checkAllPermissions('Sales Cash', [
    'create_sales_cash',
    'update_sales_cash',
    'delete_sales_cash',
    'view_sales_cash',
    'view_all_sales_cash'
  ]);

  const hasAllPermissionPurchaseinvoiceCash = checkAllPermissions('Purchase Cash', [
    'create_purchase_cash',
    'update_purchase_cash',
    'delete_purchase_cash',
    'view_purchase_cash',
    'view_all_purchase_cash'
  ]);

  const hasAllPermissionPaymentCash = checkAllPermissions('Payment Cash', [
    'create_payment_Cash',
    'update_payment_Cash',
    'delete_payment_Cash',
    'view_payment_Cash',
    'view_all_payment_Cash'
  ]);

  const hasAllPermissionPaymentRecieveCash = checkAllPermissions('Receive Cash', [
    'create_receive_Cash',
    'update_receive_Cash',
    'delete_receive_Cash',
    'view_receive_Cash',
    'view_all_receive_Cash'
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
              createConfig() === 'C'
                ? {
                    id: 'Cash',
                    title: 'Cash',
                    type: 'collapse',
                    icon: icons['PaymentsIcon'],
                    children: [
                      createConfig() === 'C'
                        ? hasAllPermissionPaymentCash && {
                            id: 'payment Cash',
                            title: 'Payment Cash',
                            type: 'item',
                            url: '/paymentCashlist'
                          }
                        : {},
                      createConfig() === 'C'
                        ? hasAllPermissionPaymentRecieveCash && {
                            id: 'recieve cash',
                            title: 'Recieve Cash',
                            type: 'item',
                            url: '/paymentrecieveList'
                          }
                        : {},
                      {
                        id: 'claim cash',
                        title: 'Claim Cash',
                        type: 'item',
                        url: '/claimcashlist'
                      },
                      {
                        id: 'recieve claim',
                        title: 'Recieve Claim',
                        type: 'item',
                        url: '/recieveclaimcashlist'
                      }
                    ]
                  }
                : {},
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
                  hasAllPermissiondeliverychallan && {
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
                  hasAllPermissionDebitnote && {
                    id: 'debit note',
                    title: 'Debit Note',
                    type: 'item',
                    url: '/debitnotelist'
                  },
                  hasAllPermissionCreditnote && {
                    id: 'credit note',
                    title: 'Credit Note',
                    type: 'item',
                    url: '/creditnotelist'
                  },
                  createConfig() === 'C'
                    ? hasAllPermissionSalesCash && {
                        id: 'sales cash',
                        title: 'Sales Cash',
                        type: 'item',
                        url: '/salescashlist'
                      }
                    : {}
                ]
              },
              {
                id: 'Purchase Management',
                title: 'Purchase Management',
                type: 'collapse',
                icon: icons['ShoppingBasketIcon'],
                children: [
                  hasAllPermissionPurchaseinvoice && {
                    id: 'Purchase Invoice',
                    title: 'Purchase Invoice',
                    type: 'item',
                    url: '/purchaseinvoiceList'
                  },
                  createConfig() === 'C'
                    ? hasAllPermissionPurchaseinvoiceCash && {
                        id: 'Purchase Cash',
                        title: 'Purchase Cash',
                        type: 'item',
                        url: '/purchaseinvoicecashList'
                      }
                    : {}
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
