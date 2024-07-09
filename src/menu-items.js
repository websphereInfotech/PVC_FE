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
import ExtensionIcon from '@mui/icons-material/Extension';
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
  BusinessCenterIcon: BusinessCenterIcon,
  ExtensionIcon: ExtensionIcon
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

  const hasAllPermissionsClaimcash = checkAllPermissions('Claim Cash', [
    'create_claim',
    'update_claim',
    'delete_claim',
    'view_single_claim',
    'view_myclaim'
  ]);

  const hasAllPermissionsRecieveClaimcash = checkAllPermissions('Claim Cash', ['view_reciveclaim', 'isapproved_claim']);

  const hasAllPermissionsPaymentBank = checkAllPermissions('Payment Bank', [
    'create_payment_bank',
    'update_payment_bank',
    'view_payment_bank',
    'view_all_payment_bank',
    'delete_payment_bank'
  ]);

  const hasAllPermissionsCompany = checkAllPermissions('Company', [
    'create_company',
    'update_company',
    'delete_company',
    'view_all_company',
    'view_single_company'
  ]);

  const hasAllPermissionPaymentRecieveBank = checkAllPermissions('Receive Bank', [
    'create_receive_bank',
    'update_receive_bank',
    'delete_receive_bank',
    'view_receive_bank',
    'get_all_receive_bank'
  ]);

  const hasAllPermissionsItem = checkAllPermissions('Items', [
    'create_item',
    'update_item',
    'delete_item',
    'view_single_item',
    'view_all_item'
  ]);

  const hasAllPermissionsCustomer = checkAllPermissions('Customer', [
    'create_customer',
    'update_customer',
    'delete_customer',
    'view_single_customer',
    'view_all_customer'
  ]);

  const hasAllPermissionsVendor = checkAllPermissions('Vendor', [
    'create_vendor',
    'update_vendor',
    'delete_vandor',
    'view_vendor',
    'view_all_vandor'
  ]);

  const hasAllPermissionsBom = checkAllPermissions('Production', [
    'create_production',
    'update_production',
    'delete_production',
    'view_production',
    'view_all_production'
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
                      hasAllPermissionPaymentCash && {
                        id: 'payment Cash',
                        title: 'Payment',
                        type: 'item',
                        url: '/paymentCashlist'
                      },
                      hasAllPermissionPaymentRecieveCash && {
                        id: 'recieve cash',
                        title: 'Receipt',
                        type: 'item',
                        url: '/paymentrecieveList'
                      },
                      hasAllPermissionsClaimcash && {
                        id: 'claim cash',
                        title: 'Demand Cash',
                        type: 'item',
                        url: '/claimcashlist'
                      },
                      hasAllPermissionsRecieveClaimcash && {
                        id: 'recieve claim',
                        title: 'Approve Claim',
                        type: 'item',
                        url: '/recieveclaimcashlist'
                      }
                    ]
                  }
                : {},
              {
                id: 'Vouchers',
                title: 'Vouchers',
                type: 'collapse',
                icon: icons['PaymentsIcon'],
                children: [
                  hasAllPermissionsPaymentBank && {
                    id: 'payment',
                    title: 'Payment',
                    type: 'item',
                    url: '/paymentbanklist'
                  },
                  hasAllPermissionPaymentRecieveBank && {
                    id: 'recieve',
                    title: 'Receipt',
                    type: 'item',
                    url: '/paymentrecievebanklist'
                  }
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
              }
            ]
          }
        ]
      },
      {
        type: 'group',
        icon: icons['ProductionQuantityLimitsIcon'],
        children: [
          {
            id: 'Production Management',
            title: 'Production Management',
            type: 'collapse',
            icon: icons['ProductionQuantityLimitsIcon'],
            children: [
              {
                id: 'Items',
                title: 'Items',
                type: 'collapse',
                icon: icons['ExtensionIcon'],
                children: [
                  hasAllPermissionsItem && {
                    id: 'Product List',
                    title: 'Product',
                    type: 'item',
                    url: '/productlist'
                  },
                  hasAllPermissionsItem && {
                    id: 'Raw Material List',
                    title: 'Raw Material',
                    type: 'item',
                    url: '/rawmateriallist'
                  },
                  {
                    id: 'Spare',
                    title: 'Spare',
                    type: 'item',
                    url: '/sparelist'
                  }
                ]
              },
              hasAllPermissionsBom && {
                id: 'production',
                title: 'Production',
                type: 'item',
                url: '/billofmateriallist'
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
            title: 'employee management',
            type: 'collapse',
            icon: icons['ContactMailIcon'],
            children: [
              {
                id: 'employee directory',
                title: 'Employee Directory',
                type: 'item',
                url: '/employeedirectory'
              }
              // {
              //   id: 'Employee Status',
              //   title: 'Employee Status',
              //   type: 'item',
              //   url: '/employeestatus'
              // },
              // {
              //   id: 'employee salary',
              //   title: 'Employee Salary',
              //   type: 'item',
              //   url: '/employeesalary'
              // }
              // {
              //   id: 'Report',
              //   title: 'Report',
              //   type: 'item',
              //   url: '/productionreport'
              // }
            ]
          }
        ]
      },
      hasAllPermissionsCompany && {
        type: 'group',
        icon: icons['StoreIcon'],
        children: [
          {
            id: 'auth',
            title: 'Company Management',
            type: 'collapse',
            icon: icons['StoreIcon'],
            children: [
              // {
              //   id: 'Company Profile',
              //   title: 'Company Profile',
              //   type: 'item',
              //   url: '/profile'
              // },
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
            title: 'Stock Management',
            type: 'collapse',
            icon: icons['PropaneTankIcon'],
            children: [
              {
                id: 'Stoke',
                title: 'Total Stock',
                type: 'item',
                url: '/totalstock'
              },
              {
                id: 'Stoke',
                title: 'Stock List',
                type: 'item',
                url: '/stocklist'
              },
              createConfig() === 'C' && {
                id: 'Stoke',
                title: 'Stock Cash List',
                type: 'item',
                url: '/stockcashlist'
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
              }
              // {
              //   id: 'Report',
              //   title: 'Report',
              //   type: 'item',
              //   url: '/productionreport'
              // }
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
              },
              hasAllPermissionsCustomer && {
                id: 'Customer',
                title: "Customer's",
                type: 'item',
                url: '/customerlist'
              },
              hasAllPermissionsVendor && {
                id: 'Vendor',
                title: "Vendor's",
                type: 'item',
                url: '/vendorlist'
              },
              {
                id: 'Report',
                title: 'Report',
                type: 'item',
                url: '/reports'
              }
            ]
          }
        ]
      }
      // {
      //   id: 'support',
      //   title: 'Support',
      //   type: 'group',
      //   icon: icons['ContactSupportOutlinedIcon'],
      //   children: [
      //     // {
      //     //   id: 'disabled-menu',
      //     //   title: 'Disabled Menu',
      //     //   type: 'item',
      //     //   url: '#',
      //     //   icon: icons['BlockOutlinedIcon'],
      //     //   disabled: true
      //     // },

      //   ]
      // }
    ]
  };
};

export default MenuItem;
