import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import Dileverychallanmain from 'views/sale managenment/dileverychallanmain';
import Purchasereturn from 'views/purches managenment/purchasereturn';
import Purchaseview from 'views/purches managenment/purchaseview';
import Salesummary from 'component/reports/general reports/salesummary';
import Saleregister from 'component/reports/general reports/saleregister';
import Purchasesummary from 'component/reports/general reports/purchasesummary';
import Purchaseregister from 'component/reports/general reports/purchaseregister';
import Expensesummary from 'component/reports/general reports/expensesummary';
import Itemratecard from 'component/reports/general reports/itemratecard';
import Payablebillwise from 'component/reports/payable reports/payablebillwise';
import Vendorwise from 'component/reports/payable reports/vendorwise';
// const UtilsTypography = Loadable(lazy(() => import('../views/Utils/Typography')));

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));

const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));

const Reports = Loadable(lazy(() => import('../views/reports')));

const PaymentPage = Loadable(lazy(() => import('../views/finacial managenment/payment')));

const PaymentViewPage = Loadable(lazy(() => import('../views/finacial managenment/paymentview')));

const PaymentListPage = Loadable(lazy(() => import('../views/finacial managenment/paymentlist')));

const Paymentrecieve = Loadable(lazy(() => import('../views/finacial managenment/paymentrecieve')));

const ExpensePage = Loadable(lazy(() => import('../views/finacial managenment/expencelist')));

const AddExpense = Loadable(lazy(() => import('../views/finacial managenment/expenceadd')));

const ExpenseDetailsPage = Loadable(lazy(() => import('../views/finacial managenment/expenceview')));

const Qutation = Loadable(lazy(() => import('../views/sale managenment/qutation')));

const Quotationmain = Loadable(lazy(() => import('../views/sale managenment/qutationmain')));

const Qutationlist = Loadable(lazy(() => import('../views/sale managenment/quotationlist')));

const Deliverychallan = Loadable(lazy(() => import('../views/sale managenment/dileverychalln')));

const Salesreturn = Loadable(lazy(() => import('../views/sale managenment/salesreturn')));

const Salesreturnmain = Loadable(lazy(() => import('../views/sale managenment/salesreturnmain')));

const Salesinvoice = Loadable(lazy(() => import('../views/sale managenment/salesinvoice')));

const Salesinvoicemain = Loadable(lazy(() => import('../views/sale managenment/salesinvoicemain')));

const PurchaseOrderList = Loadable(lazy(() => import('../views/purches managenment/purchaselist')));

const AddPurchasePage = Loadable(lazy(() => import('../views/purches managenment/purchaseadd')));

const Purchasebill = Loadable(lazy(() => import('../views/purches managenment/purchasebill')));

const CompanyList = Loadable(lazy(() => import('../views/company managenment/companylist')));

const AddCompanyForm = Loadable(lazy(() => import('../views/company managenment/addcompany')));

const ProductionListPage = Loadable(lazy(() => import('../views/production managenment/productionlist')));

const AddProductionPage = Loadable(lazy(() => import('../views/production managenment/addproduction')));

const ReportPage = Loadable(lazy(() => import('../views/production managenment/productionreport')));

const Product = Loadable(lazy(() => import('../views/production managenment/product')));

const StockManagement = Loadable(lazy(() => import('../views/stoke managenment/stoke')));

const Stockmain = Loadable(lazy(() => import('../views/stoke managenment/stokemain')));

const MachineInventoryPage = Loadable(lazy(() => import('../views/machine managenment/machineinventory')));

const EmployeeDirectoryPage = Loadable(lazy(() => import('../views/employee management/employeedirectory')));

const PerformanceManagementPage = Loadable(lazy(() => import('../views/employee management/perfomanceemployee')));

const AddUserForm = Loadable(lazy(() => import('../views/usermanagenment')));

const GeneralPage = Loadable(lazy(() => import('../views/general managenment/generalvoucher')));

const Generalmain = Loadable(lazy(() => import('../views/general managenment/generalvouchermain')));

const Stokegeneral = Loadable(lazy(() => import('../views/general managenment/stokegeneral')));

// const AuthLogin = Loadable(lazy(() => import('../views/Login')));
// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // {
    //   path: '/',
    //   element: <AuthLogin />
    // },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    },
    // { path: '/utils/util-typography', element: <UtilsTypography /> },
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
    { path: '/qutation', element: <Qutation /> },
    { path: '/qutationlist', element: <Qutationlist /> },
    { path: '/qutationmain', element: <Quotationmain /> },
    { path: '/salesinvoice', element: <Salesinvoice /> },
    { path: '/salesinvoicemain', element: <Salesinvoicemain /> },
    { path: '/deliverychallan', element: <Deliverychallan /> },
    { path: '/deliverychallanmain', element: <Dileverychallanmain /> },
    { path: '/salesreturn', element: <Salesreturn /> },
    { path: '/salesreturnmain', element: <Salesreturnmain /> },
    { path: '/purchaselist', element: <PurchaseOrderList /> },
    { path: '/addpurchase', element: <AddPurchasePage /> },
    { path: '/purchasebill', element: <Purchasebill /> },
    { path: '/purchasereturn', element: <Purchasereturn /> },
    { path: '/purchaseview', element: <Purchaseview /> },
    { path: '/companylist', element: <CompanyList /> },
    { path: '/addcompany', element: <AddCompanyForm /> },
    { path: '/productionlist', element: <ProductionListPage /> },
    { path: '/addproduction', element: <AddProductionPage /> },
    { path: '/products', element: <Product /> },
    { path: '/stock', element: <StockManagement /> },
    { path: '/stockmain', element: <Stockmain /> },
    { path: '/machineinventory', element: <MachineInventoryPage /> },
    { path: '/employeedirectory', element: <EmployeeDirectoryPage /> },
    { path: '/performanceemployee', element: <PerformanceManagementPage /> },
    { path: '/adduser', element: <AddUserForm /> },
    { path: '/productionreport', element: <ReportPage /> },
    { path: '/generalpage', element: <GeneralPage /> },
    { path: '/generalmain', element: <Generalmain /> },
    { path: '/stokegeneral', element: <Stokegeneral /> },
    { path: '/reports', element: <Reports /> },
    // ++++++++++++++++++++++++++++++++++++++++++++Routes of reports +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/salesummary', element: <Salesummary /> },
    { path: '/saleregister', element: <Saleregister /> },
    { path: '/purchasesummary', element: <Purchasesummary /> },
    { path: '/purchaseregister', element: <Purchaseregister /> },
    { path: '/expensesummary', element: <Expensesummary /> },
    { path: '/itemratecard', element: <Itemratecard /> },
    { path: '/billwise', element: <Payablebillwise /> },
    { path: '/vendorwise', element: <Vendorwise /> }
  ]
};

export default MainRoutes;
