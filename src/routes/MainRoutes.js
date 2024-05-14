import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
// import Dileverychallanmain from 'views/sale managenment/dileverychallanmain';
import Purchaseview from 'views/purches managenment/purchaseview';
import Salesummary from 'component/reports/general reports/salesummary';
import Saleregister from 'component/reports/general reports/saleregister';
import Purchasesummary from 'component/reports/general reports/purchasesummary';
import Purchaseregister from 'component/reports/general reports/purchaseregister';
import Expensesummary from 'component/reports/general reports/expensesummary';
import Itemratecard from 'component/reports/general reports/itemratecard';
import Payablebillwise from 'component/reports/payable reports/payablebillwise';
import Vendorwise from 'component/reports/payable reports/vendorwise';
import Protected from 'service/Protected';

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));
const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));
const Reports = Loadable(lazy(() => import('../views/reports')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of payment +++++++++++++++++++++++++++++++++++++++++++++++++++
const PaymentPage = Loadable(lazy(() => import('../views/finacial managenment/payment')));
const PaymentViewPage = Loadable(lazy(() => import('../views/finacial managenment/paymentview')));
const PaymentListPage = Loadable(lazy(() => import('../views/finacial managenment/paymentlist')));
const Paymentrecieve = Loadable(lazy(() => import('../views/finacial managenment/paymentrecieve')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of expense +++++++++++++++++++++++++++++++++++++++++++++++++++
const ExpensePage = Loadable(lazy(() => import('../views/finacial managenment/expencelist')));
const AddExpense = Loadable(lazy(() => import('../views/finacial managenment/expenceadd')));
const ExpenseDetailsPage = Loadable(lazy(() => import('../views/finacial managenment/expenceview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of quotation +++++++++++++++++++++++++++++++++++++++++++++++++++
const Proformainvoice = Loadable(lazy(() => import('../views/sale managenment/proformainvoice')));
// const Proformainvoicemain = Loadable(lazy(() => import('../views/sale managenment/proformainvoicemain')));
const ProformainvoiceList = Loadable(lazy(() => import('../views/sale managenment/proformainvoicelist')));
const Proformainvoiceviewpage = Loadable(lazy(() => import('../views/sale managenment/proformainvoiceview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of delivery challan +++++++++++++++++++++++++++++++++++++++++++++++++++
const Deliverychallan = Loadable(lazy(() => import('../views/sale managenment/dileverychalln')));
const DileveryChallanList = Loadable(lazy(() => import('../views/sale managenment/dileverychallanlist')));
const DileveryChallanView = Loadable(lazy(() => import('../views/sale managenment/dileverychallanview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of sales return +++++++++++++++++++++++++++++++++++++++++++++++++++
const Salesreturn = Loadable(lazy(() => import('../views/sale managenment/salesreturn')));
const Salesreturnlist = Loadable(lazy(() => import('../views/sale managenment/salesreturnlist')));
const SalesinvoiceReturnview = Loadable(lazy(() => import('../views/sale managenment/salesreturnview')));
// ++++++++++++++++++++++++++++++++++++++++++++ Routes of sales invoice +++++++++++++++++++++++++++++++++++++++++++++++++++
const Salesinvoice = Loadable(lazy(() => import('../views/sale managenment/salesinvoice')));
// const Salesinvoicemain = Loadable(lazy(() => import('../views/sale managenment/salesinvoicemain')));
const Salesinvoicelist = Loadable(lazy(() => import('../views/sale managenment/salesinvoicelist')));
const Salesinvoiceview = Loadable(lazy(() => import('../views/sale managenment/salesinvoiceview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchase +++++++++++++++++++++++++++++++++++++++++++++++++++
const PurchaseOrderList = Loadable(lazy(() => import('../views/purches managenment/purchaselist')));
const AddPurchasePage = Loadable(lazy(() => import('../views/purches managenment/purchaseadd')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchase bill +++++++++++++++++++++++++++++++++++++++++++++++++++
const Purchasebill = Loadable(lazy(() => import('../views/purches managenment/purchasebill')));
const PurchaseBillList = Loadable(lazy(() => import('../views/purches managenment/purchasebilllist')));
const Purchasebillview = Loadable(lazy(() => import('../views/purches managenment/purchasebillview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchase return +++++++++++++++++++++++++++++++++++++++++++++++++++
const Purchasereturn = Loadable(lazy(() => import('../views/purches managenment/purchasereturn')));
const PurchaseReturnList = Loadable(lazy(() => import('../views/purches managenment/purchasereturnlist')));
const Purchasereturnview = Loadable(lazy(() => import('../views/purches managenment/purchasereturnview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of company +++++++++++++++++++++++++++++++++++++++++++++++++++
const CompanyList = Loadable(lazy(() => import('../views/company managenment/companylist')));
const AddCompanyForm = Loadable(lazy(() => import('../views/company managenment/addcompany')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of production +++++++++++++++++++++++++++++++++++++++++++++++++++
const ProductionListPage = Loadable(lazy(() => import('../views/production managenment/productionlist')));
const AddProductionPage = Loadable(lazy(() => import('../views/production managenment/addproduction')));
const Product = Loadable(lazy(() => import('../views/production managenment/product')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of stock +++++++++++++++++++++++++++++++++++++++++++++++++++
const StockManagement = Loadable(lazy(() => import('../views/stock managenment/stock')));
const Stockmain = Loadable(lazy(() => import('../views/stock managenment/stockmain')));

// ++++++++++++++++++++++++++++++++++++++++++++++ Route permission +++++++++++++++++++++++++++++++++++
const Permission = Loadable(lazy(() => import('../views/permission managenment/permission')));
const User = Loadable(lazy(() => import('../views/permission managenment/adduser')));
const UserList = Loadable(lazy(() => import('../views/permission managenment/userlist')));
const Userviewpage = Loadable(lazy(() => import('../views/permission managenment/userview')));

const MachineInventoryPage = Loadable(lazy(() => import('../views/machine managenment/machineinventory')));
const EmployeeDirectoryPage = Loadable(lazy(() => import('../views/employee management/employeedirectory')));
const PerformanceManagementPage = Loadable(lazy(() => import('../views/employee management/perfomanceemployee')));
const GeneralPage = Loadable(lazy(() => import('../views/general managenment/generalvoucher')));
const Generalmain = Loadable(lazy(() => import('../views/general managenment/generalvouchermain')));
const Stokegeneral = Loadable(lazy(() => import('../views/general managenment/stokegeneral')));
const ReportPage = Loadable(lazy(() => import('../views/production managenment/productionreport')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <Protected>
      <MainLayout />
    </Protected>
  ),
  children: [
    {
      path: '/dashboard',
      element: (
        <Protected>
          <DashboardDefault />
        </Protected>
      )
    },
    { path: '/profile', element: <SamplePage /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of paymentss +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/payment', element: <PaymentPage /> },
    { path: '/payment/:id', element: <PaymentPage /> },
    { path: '/paymentview/:id', element: <PaymentViewPage /> },
    { path: '/paymentlist', element: <PaymentListPage /> },
    { path: '/paymentrecieve', element: <Paymentrecieve /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of expenses +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/expenselist', element: <ExpensePage /> },
    { path: '/addexpense', element: <AddExpense /> },
    { path: '/addexpense/:id', element: <AddExpense /> },
    { path: '/viewexpense/:id', element: <ExpenseDetailsPage /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of quotations +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/proformainvoice', element: <Proformainvoice /> },
    { path: '/proformainvoice/:id', element: <Proformainvoice /> },
    { path: '/proformainvoiceList', element: <ProformainvoiceList /> },
    // { path: '/proformainvoicemain', element: <Proformainvoicemain /> },
    { path: '/proformainvoiceviewpage/:id', element: <Proformainvoiceviewpage /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of salesinvoice +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/salesinvoice', element: <Salesinvoice /> },
    { path: '/salesinvoice/:id', element: <Salesinvoice /> },
    // { path: '/salesinvoicemain', element: <Salesinvoicemain /> },
    { path: '/salesinvoicelist', element: <Salesinvoicelist /> },
    { path: '/salesinvoiceview/:id', element: <Salesinvoiceview /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of deliverychallan +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/deliverychallan', element: <Deliverychallan /> },
    { path: '/deliverychallan/:id', element: <Deliverychallan /> },
    { path: '/deliverychallanlist', element: <DileveryChallanList /> },
    { path: '/deliverychallanview/:id', element: <DileveryChallanView /> },
    // { path: '/deliverychallanmain', element: <Dileverychallanmain /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of sales return +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/salesreturn', element: <Salesreturn /> },
    { path: '/salesreturnlist', element: <Salesreturnlist /> },
    { path: '/salesreturnview', element: <SalesinvoiceReturnview /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchase +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/addpurchase', element: <AddPurchasePage /> },
    { path: '/purchaselist', element: <PurchaseOrderList /> },
    { path: '/addpurchase/:id', element: <AddPurchasePage /> },
    { path: '/purchaseview/:id', element: <Purchaseview /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchasebill +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/purchasebill', element: <Purchasebill /> },
    { path: '/purchasebillList', element: <PurchaseBillList /> },
    { path: '/purchasebillview/:id', element: <Purchasebillview /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchasereturn +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/purchasereturn', element: <Purchasereturn /> },
    { path: '/purchasereturn/:id', element: <Purchasereturn /> },
    { path: '/purchasereturnList', element: <PurchaseReturnList /> },
    { path: '/purchasereturnview/:id', element: <Purchasereturnview /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of company +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/companylist', element: <CompanyList /> },
    { path: '/addcompany', element: <AddCompanyForm /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of production +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/productionlist', element: <ProductionListPage /> },
    { path: '/addproduction', element: <AddProductionPage /> },
    { path: '/products', element: <Product /> },

    // ++++++++++++++++++++++++++++++++++++++++++++Routes of stock +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/stock', element: <StockManagement /> },
    { path: '/stockmain', element: <Stockmain /> },

    // ++++++++++++++++++++++++++++++++++++++++++++++++++ Routes of Permission +++++++++++++++++++++++++++++++++++
    { path: '/permission', element: <Permission /> },
    { path: '/adduser', element: <User /> },
    { path: '/updateuser/:id', element: <User /> },
    { path: '/userlist', element: <UserList /> },
    { path: '/userview/:id', element: <Userviewpage /> },

    { path: '/machineinventory', element: <MachineInventoryPage /> },
    { path: '/employeedirectory', element: <EmployeeDirectoryPage /> },
    { path: '/performanceemployee', element: <PerformanceManagementPage /> },
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
