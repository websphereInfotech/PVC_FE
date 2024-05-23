import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import Salesummary from 'component/reports/general reports/salesummary';
import Saleregister from 'component/reports/general reports/saleregister';
import Purchasesummary from 'component/reports/general reports/purchasesummary';
import Purchaseregister from 'component/reports/general reports/purchaseregister';
import Expensesummary from 'component/reports/general reports/expensesummary';
import Itemratecard from 'component/reports/general reports/itemratecard';
import Payablebillwise from 'component/reports/payable reports/payablebillwise';
import Vendorwise from 'component/reports/payable reports/vendorwise';
import Protected from 'service/Protected';
import Customerledgerlist from 'views/finacial managenment/customerledgerlist';

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));
const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));
const Reports = Loadable(lazy(() => import('../views/reports')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of claim cash +++++++++++++++++++++++++++++++++++++++++++++++++++
const Claimcashlist = Loadable(lazy(() => import('../views/finacial managenment/cliamcashlist')));
const Cliamcashpage = Loadable(lazy(() => import('../views/finacial managenment/cliamcash')));
const Recieveclaimcashlist = Loadable(lazy(() => import('../views/finacial managenment/recieveclaimcashlist')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of salescash +++++++++++++++++++++++++++++++++++++++++++++++++++
const Salescash = Loadable(lazy(() => import('../views/sale managenment/Sales cash/salescash')));
const Salescashlist = Loadable(lazy(() => import('../views/sale managenment/Sales cash/salescashlist')));
const Salescashview = Loadable(lazy(() => import('../views/sale managenment/Sales cash/salescashview')));
//
// ++++++++++++++++++++++++++++++++++++++++++++ Routes of payment +++++++++++++++++++++++++++++++++++++++++++++++++++
const PaymentPage = Loadable(lazy(() => import('../views/finacial managenment/paymentcash')));
const PaymentListPage = Loadable(lazy(() => import('../views/finacial managenment/paymencashtlist')));
const Paymentrecieve = Loadable(lazy(() => import('../views/finacial managenment/paymentrecievecash')));
const PaymentrecieveList = Loadable(lazy(() => import('../views/finacial managenment/paymentrecievecashlist')));
const Ledgerlist = Loadable(lazy(() => import('../views/finacial managenment/ledger')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of expense +++++++++++++++++++++++++++++++++++++++++++++++++++
const ExpensePage = Loadable(lazy(() => import('../views/finacial managenment/expencelist')));
const AddExpense = Loadable(lazy(() => import('../views/finacial managenment/expenceadd')));
const ExpenseDetailsPage = Loadable(lazy(() => import('../views/finacial managenment/expenceview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of quotation +++++++++++++++++++++++++++++++++++++++++++++++++++
const Proformainvoice = Loadable(lazy(() => import('../views/sale managenment/Proformainvoice/proformainvoice')));
const ProformainvoiceList = Loadable(lazy(() => import('../views/sale managenment/Proformainvoice/proformainvoicelist')));
const Proformainvoiceviewpage = Loadable(lazy(() => import('../views/sale managenment/Proformainvoice/proformainvoiceview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of delivery challan +++++++++++++++++++++++++++++++++++++++++++++++++++
const Deliverychallan = Loadable(lazy(() => import('../views/sale managenment/Dileverychallan/dileverychalln')));
const DileveryChallanList = Loadable(lazy(() => import('../views/sale managenment/Dileverychallan/dileverychallanlist')));
const DileveryChallanView = Loadable(lazy(() => import('../views/sale managenment/Dileverychallan/dileverychallanview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of Debit note +++++++++++++++++++++++++++++++++++++++++++++++++++
const DebitNote = Loadable(lazy(() => import('../views/sale managenment/Debit note/debitnote')));
const Debitnotelist = Loadable(lazy(() => import('../views/sale managenment/Debit note/debitnotelist')));
const Debitnoteview = Loadable(lazy(() => import('../views/sale managenment/Debit note/debitnoteview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of credit note +++++++++++++++++++++++++++++++++++++++++++++++++++
const Creditnote = Loadable(lazy(() => import('../views/sale managenment/Credit note/creditnote')));
const Creditnotelist = Loadable(lazy(() => import('../views/sale managenment/Credit note/creditnotelist')));
const CreditnoteView = Loadable(lazy(() => import('../views/sale managenment/Credit note/creditnoteview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of sales invoice +++++++++++++++++++++++++++++++++++++++++++++++++++
const Salesinvoice = Loadable(lazy(() => import('../views/sale managenment/Sales invoice/salesinvoice')));
const Salesinvoicelist = Loadable(lazy(() => import('../views/sale managenment/Sales invoice/salesinvoicelist')));
const Salesinvoiceview = Loadable(lazy(() => import('../views/sale managenment/Sales invoice/salesinvoiceview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchase bill +++++++++++++++++++++++++++++++++++++++++++++++++++
const Purchaseinvoice = Loadable(lazy(() => import('../views/purches managenment/purchaseinvoice')));
const PurchaseinvoiceList = Loadable(lazy(() => import('../views/purches managenment/purchaseinvoicelist')));
const Purchaseinvoiceview = Loadable(lazy(() => import('../views/purches managenment/purchaseinvoiceview')));

// +++++++++++++++++++++++++++++++++++++++++ Routes of purchasse bill cash ++++++++++++++++++++++++++++++++++++++++++++
const Purchaseinvoicecash = Loadable(lazy(() => import('../views/purches managenment/purchaseinvoicecash')));
const Purchaseinvoicecashlist = Loadable(lazy(() => import('../views/purches managenment/purchaseinvoicecashlist')));
const Purchaseinvoicecashview = Loadable(lazy(() => import('../views/purches managenment/purchaseinvoicecashview')));

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
    // ++++++++++++++++++++++++++++++++++++++++++++++++++ Routes of Claim cash +++++++++++++++++++++++++++++++++++++++++++
    { path: '/claimcash', element: <Cliamcashpage /> },
    { path: '/claimcash/:id', element: <Cliamcashpage /> },
    { path: '/claimcashlist', element: <Claimcashlist /> },
    { path: '/recieveclaimcashlist', element: <Recieveclaimcashlist /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of sales cash +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/salescash', element: <Salescash /> },
    { path: '/salescash/:id', element: <Salescash /> },
    { path: '/salescashlist', element: <Salescashlist /> },
    { path: '/salescashview/:id', element: <Salescashview /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of paymentss +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/paymentcash', element: <PaymentPage /> },
    { path: '/paymentcash/:id', element: <PaymentPage /> },
    { path: '/paymentcashlist', element: <PaymentListPage /> },
    { path: '/paymentrecieve', element: <Paymentrecieve /> },
    { path: '/paymentrecieve/:id', element: <Paymentrecieve /> },
    { path: '/paymentrecieveList', element: <PaymentrecieveList /> },
    { path: '/ledgerlist', element: <Ledgerlist /> },
    { path: '/customerledgerlist', element: <Customerledgerlist /> },

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
    { path: '/debitnote', element: <DebitNote /> },
    { path: '/debitnote/:id', element: <DebitNote /> },
    { path: '/debitnotelist', element: <Debitnotelist /> },
    { path: '/debitnoteview/:id', element: <Debitnoteview /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of sales return +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/creditnote', element: <Creditnote /> },
    { path: '/creditnote/:id', element: <Creditnote /> },
    { path: '/creditnotelist', element: <Creditnotelist /> },
    { path: '/creditnoteview/:id', element: <CreditnoteView /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchase invoice +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/purchaseinvoice', element: <Purchaseinvoice /> },
    { path: '/purchaseinvoice/:id', element: <Purchaseinvoice /> },
    { path: '/purchaseinvoiceList', element: <PurchaseinvoiceList /> },
    { path: '/purchaseinvoiceview/:id', element: <Purchaseinvoiceview /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchase invoice Cash  +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/purchaseinvoicecash', element: <Purchaseinvoicecash /> },
    { path: '/purchaseinvoicecash/:id', element: <Purchaseinvoicecash /> },
    { path: '/purchaseinvoicecashList', element: <Purchaseinvoicecashlist /> },
    { path: '/purchaseinvoicecashview/:id', element: <Purchaseinvoicecashview /> },

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
