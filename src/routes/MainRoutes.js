import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import Dileverychallanmain from 'views/sale managenment/dileverychallanmain';
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
const Quotationviewpage = Loadable(lazy(() => import('../views/sale managenment/quotationview')));

const Deliverychallan = Loadable(lazy(() => import('../views/sale managenment/dileverychalln')));
const DileveryChallanList = Loadable(lazy(() => import('../views/sale managenment/dileverychallanlist')));
const DileveryChallanView = Loadable(lazy(() => import('../views/sale managenment/dileverychallanview')));

const Salesreturn = Loadable(lazy(() => import('../views/sale managenment/salesreturn')));
const Salesreturnmain = Loadable(lazy(() => import('../views/sale managenment/salesreturnmain')));
const Salesinvoice = Loadable(lazy(() => import('../views/sale managenment/salesinvoice')));
const Salesinvoicemain = Loadable(lazy(() => import('../views/sale managenment/salesinvoicemain')));
const Salesinvoicelist = Loadable(lazy(() => import('../views/sale managenment/salesinvoicelist')));
const Salesinvoiceview = Loadable(lazy(() => import('../views/sale managenment/salesinvoiceview')));

const PurchaseOrderList = Loadable(lazy(() => import('../views/purches managenment/purchaselist')));
const AddPurchasePage = Loadable(lazy(() => import('../views/purches managenment/purchaseadd')));
const Purchasebill = Loadable(lazy(() => import('../views/purches managenment/purchasebill')));
const PurchaseBillList = Loadable(lazy(() => import('../views/purches managenment/purchasebilllist')));
const Purchasebillview = Loadable(lazy(() => import('../views/purches managenment/purchasebillview')));
const Purchasereturn = Loadable(lazy(() => import('../views/purches managenment/purchasereturn')));
const PurchaseReturnList = Loadable(lazy(() => import('../views/purches managenment/purchasereturnlist')));
const Purchasereturnview = Loadable(lazy(() => import('../views/purches managenment/purchasereturnview')));

const CompanyList = Loadable(lazy(() => import('../views/company managenment/companylist')));
const AddCompanyForm = Loadable(lazy(() => import('../views/company managenment/addcompany')));

const ProductionListPage = Loadable(lazy(() => import('../views/production managenment/productionlist')));
const AddProductionPage = Loadable(lazy(() => import('../views/production managenment/addproduction')));
const Product = Loadable(lazy(() => import('../views/production managenment/product')));

const ReportPage = Loadable(lazy(() => import('../views/production managenment/productionreport')));

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
      path: '/dashboard',
      element: <DashboardDefault />
    },
    // { path: '/utils/util-typography', element: <UtilsTypography /> },
    // { path: '/sample-page', element: <SamplePage /> }
    { path: '/profile', element: <SamplePage /> },
    // { path: '/dashboard/salesdasboard', element: <Salesdashboard /> },
    { path: '/payment', element: <PaymentPage /> },
    { path: '/payment/:id', element: <PaymentPage /> },
    { path: '/paymentview/:id', element: <PaymentViewPage /> },
    { path: '/paymentlist', element: <PaymentListPage /> },
    { path: '/paymentrecieve', element: <Paymentrecieve /> },

    { path: '/expenselist', element: <ExpensePage /> },
    { path: '/addexpense', element: <AddExpense /> },
    { path: '/addexpense/:id', element: <AddExpense /> },
    { path: '/viewexpense/:id', element: <ExpenseDetailsPage /> },

    { path: '/qutation', element: <Qutation /> },
    { path: '/qutation/:id', element: <Qutation /> },
    { path: '/qutationlist', element: <Qutationlist /> },
    { path: '/qutationmain', element: <Quotationmain /> },
    { path: '/qutationview/:id', element: <Quotationviewpage /> },

    { path: '/salesinvoice', element: <Salesinvoice /> },
    { path: '/salesinvoicemain', element: <Salesinvoicemain /> },
    { path: '/salesinvoicelist', element: <Salesinvoicelist /> },
    { path: '/salesinvoiceview/:id', element: <Salesinvoiceview /> },

    { path: '/deliverychallan', element: <Deliverychallan /> },
    { path: '/deliverychallan/:id', element: <Deliverychallan /> },
    { path: '/deliverychallanlist', element: <DileveryChallanList /> },
    { path: '/deliverychallanview/:id', element: <DileveryChallanView /> },
    { path: '/deliverychallanmain', element: <Dileverychallanmain /> },

    { path: '/salesreturn', element: <Salesreturn /> },
    { path: '/salesreturnmain', element: <Salesreturnmain /> },

    { path: '/addpurchase', element: <AddPurchasePage /> },
    { path: '/purchaselist', element: <PurchaseOrderList /> },
    { path: '/addpurchase/:id', element: <AddPurchasePage /> },
    // { path: '/purchasebill', element: <Purchasebill /> },
    // { path: '/purchasereturn', element: <Purchasereturn /> },
    { path: '/purchaseview/:id', element: <Purchaseview /> },
    { path: '/purchasebill', element: <Purchasebill /> },
    { path: '/purchasebillList', element: <PurchaseBillList /> },
    { path: '/purchasebillview/:id', element: <Purchasebillview /> },
    { path: '/purchasereturn', element: <Purchasereturn /> },
    { path: '/purchasereturn/:id', element: <Purchasereturn /> },
    { path: '/purchasereturnList', element: <PurchaseReturnList /> },
    { path: '/purchasereturnview/:id', element: <Purchasereturnview /> },

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
