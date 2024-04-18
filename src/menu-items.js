// assets
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
// import { FaBeer } from 'react-icons/fa';
// import { FaSalesforce } from 'react-icons/fa';

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

// eslint-disable-next-line
export default {
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
    {
      // id: 'pages',
      // title: 'Pages',
      // caption: 'Prebuild Pages',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        // {
        //   id: 'sample-page',
        //   title: 'Sample Page',
        //   type: 'item',
        //   url: '/sample-page',
        //   icon: icons['ChromeReaderModeOutlinedIcon']
        // },
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: icons['SecurityOutlinedIcon'],
          children: [
            {
              id: 'permission',
              title: 'permission',
              type: 'item',
              url: '/permission'
              // target: true
            }
          ]
        }
      ]
    },
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
                  title: 'Payment List',
                  type: 'item',
                  url: '/paymentlist'
                },
                {
                  id: 'payment-recieve',
                  title: 'Payment Recieve',
                  type: 'item',
                  url: '/paymentrecieve'
                }
              ]
            },
            {
              id: 'sale-management',
              title: 'Sale Management',
              type: 'collapse',
              icon: icons['LoyaltyIcon'],
              children: [
                {
                  id: 'qutation',
                  title: 'Qutation',
                  type: 'item',
                  url: '/qutationmain'
                },
                {
                  id: 'Delivery Challan',
                  title: 'Delivery Challan',
                  type: 'item',
                  url: '/deliverychallanmain'
                },
                {
                  id: 'sales invoice',
                  title: 'Sales Invoice',
                  type: 'item',
                  url: '/salesinvoicemain'
                },
                {
                  id: 'sales return',
                  title: 'Sales Return',
                  type: 'item',
                  url: '/salesreturnmain'
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
                  url: '/purchasebill'
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
