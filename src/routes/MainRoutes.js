import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));

const UtilsTypography = Loadable(lazy(() => import('../views/Utils/Typography')));

const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));

const PaymentPage = Loadable(lazy(() => import('../views/finacial managenment/payment')));

const PaymentViewPage = Loadable(lazy(() => import('../views/finacial managenment/paymentview')));

const PaymentListPage = Loadable(lazy(() => import('../views/finacial managenment/paymentlist')));

const Paymentrecieve = Loadable(lazy(() => import('../views/finacial managenment/paymentrecieve')));

const ExpensePage = Loadable(lazy(() => import('../views/finacial managenment/expencelist')));

const AddExpense = Loadable(lazy(() => import('../views/finacial managenment/expenceadd')));

const ExpenseDetailsPage = Loadable(lazy(() => import('../views/finacial managenment/expenceview')));

const OrderProcessingPage = Loadable(lazy(() => import('../views/sale managenment/order')));

const AddOrderForm = Loadable(lazy(() => import('../views/sale managenment/addorder')));

const PurchaseOrderList = Loadable(lazy(() => import('../views/purches managenment/purchaselist')));

const AddPurchasePage = Loadable(lazy(() => import('../views/purches managenment/purchaseadd')));

const CompanyList = Loadable(lazy(() => import('../views/company managenment/companylist')));

const AddCompanyForm = Loadable(lazy(() => import('../views/company managenment/addcompany')));

const ProductionListPage = Loadable(lazy(() => import('../views/production managenment/productionlist')));

const AddProductionPage = Loadable(lazy(() => import('../views/production managenment/addproduction')));

const Product = Loadable(lazy(() => import('../views/production managenment/product')));

const StockManagement = Loadable(lazy(() => import('../views/stoke managenment/stoke')));

const MachineInventoryPage = Loadable(lazy(() => import('../views/machine managenment/machineinventory')));

const EmployeeDirectoryPage = Loadable(lazy(() => import('../views/employee management/employeedirectory')));

const PerformanceManagementPage = Loadable(lazy(() => import('../views/employee management/perfomanceemployee')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    },
    { path: '/utils/util-typography', element: <UtilsTypography /> },
    // { path: '/sample-page', element: <SamplePage /> }
    { path: '/profile', element: <SamplePage /> },
    // { path: '/dashboard/salesdasboard', element: <Salesdashboard /> },
    { path: '/payment', element: <PaymentPage /> },
    { path: '/paymentview', element: <PaymentViewPage /> },
    { path: '/paymentlist', element: <PaymentListPage /> },
    { path: '/paymentrecieve', element: <Paymentrecieve /> },
    { path: '/expenselist', element: <ExpensePage /> },
    { path: '/addexpense', element: <AddExpense /> },
    { path: '/viewexpense', element: <ExpenseDetailsPage /> },
    { path: '/orders', element: <OrderProcessingPage /> },
    { path: '/addorder', element: <AddOrderForm /> },
    { path: '/purchaselist', element: <PurchaseOrderList /> },
    { path: '/addpurchase', element: <AddPurchasePage /> },
    { path: '/companylist', element: <CompanyList /> },
    { path: '/addcompany', element: <AddCompanyForm /> },
    { path: '/productionlist', element: <ProductionListPage /> },
    { path: '/addproduction', element: <AddProductionPage /> },
    { path: '/products', element: <Product /> },
    { path: '/stock', element: <StockManagement /> },
    { path: '/machineinventory', element: <MachineInventoryPage /> },
    { path: '/employeedirectory', element: <EmployeeDirectoryPage /> },
    { path: '/performanceemployee', element: <PerformanceManagementPage /> }
  ]
};

export default MainRoutes;
