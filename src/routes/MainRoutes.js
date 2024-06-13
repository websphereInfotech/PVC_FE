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
import ProtectedRoute from 'service/protectedcash';
import Customerledgerlist from 'views/finacial managenment/Claim cash/customerledgerlist';
import Proformainvoice from 'views/sale managenment/Proformainvoice/proformainvoice';
// import useCan from 'views/permission managenment/checkpermissionvalue';

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));
const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));
const Reports = Loadable(lazy(() => import('../views/reports')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of claim cash +++++++++++++++++++++++++++++++++++++++++++++++++++
const Claimcashlist = Loadable(lazy(() => import('../views/finacial managenment/Claim cash/cliamcashlist')));
const Cliamcashpage = Loadable(lazy(() => import('../views/finacial managenment/Claim cash/cliamcash')));
const Claimledgerlist = Loadable(lazy(() => import('../views/finacial managenment/Claim cash/claimcashledgerlist')));
const Recieveclaimcashlist = Loadable(lazy(() => import('../views/finacial managenment/Claim cash/recieveclaimcashlist')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of salescash +++++++++++++++++++++++++++++++++++++++++++++++++++
const Salescash = Loadable(lazy(() => import('../views/sale managenment/Sales cash/salescash')));
const Salescashlist = Loadable(lazy(() => import('../views/sale managenment/Sales cash/salescashlist')));
const Salescashview = Loadable(lazy(() => import('../views/sale managenment/Sales cash/salescashview')));
//
// ++++++++++++++++++++++++++++++++++++++++++++ Routes of payment cash +++++++++++++++++++++++++++++++++++++++++++++++++++
const PaymentPage = Loadable(lazy(() => import('../views/finacial managenment/Payment cash/paymentcash')));
const PaymentListPage = Loadable(lazy(() => import('../views/finacial managenment/Payment cash/paymencashtlist')));
const Paymentrecieve = Loadable(lazy(() => import('../views/finacial managenment/Recieve cash/paymentrecievecash')));
const PaymentrecieveList = Loadable(lazy(() => import('../views/finacial managenment/Recieve cash/paymentrecievecashlist')));
const Ledgerlist = Loadable(lazy(() => import('../views/finacial managenment/Claim cash/ledger')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routs of payment bank ++++++++++++++++++++++++++++++++++++++++++++++++
const Paymentbank = Loadable(lazy(() => import('../views/finacial managenment/Payment Bank/paymentbank')));
const Paymentbanklist = Loadable(lazy(() => import('../views/finacial managenment/Payment Bank/paymentbanklist')));
const Paymentbankledgerlist = Loadable(lazy(() => import('../views/finacial managenment/Payment Bank/paymentbankledgerlist')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routs of payment recieve bank ++++++++++++++++++++++++++++++++++++++++++++++++
const Paymentrecievebank = Loadable(lazy(() => import('../views/finacial managenment/Payment recieve bank/paymentrecievebank')));
const Paymentrecievebanklist = Loadable(lazy(() => import('../views/finacial managenment/Payment recieve bank/paymentrecievebanklist')));
const Paymentbankrecieveledgerlist = Loadable(
  lazy(() => import('../views/finacial managenment/Payment recieve bank/paymentbankrecieveledgerlist'))
);
// ++++++++++++++++++++++++++++++++++++++++++++ Routes of expense +++++++++++++++++++++++++++++++++++++++++++++++++++
const ExpensePage = Loadable(lazy(() => import('../views/finacial managenment/expencelist')));
const AddExpense = Loadable(lazy(() => import('../views/finacial managenment/expenceadd')));
const ExpenseDetailsPage = Loadable(lazy(() => import('../views/finacial managenment/expenceview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of quotation +++++++++++++++++++++++++++++++++++++++++++++++++++
// const Proformainvoice = Loadable(lazy(() => import('../views/sale managenment/Proformainvoice/proformainvoice')));
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
const Purchaseinvoice = Loadable(lazy(() => import('../views/purches managenment/Purchase invoice/purchaseinvoice')));
const PurchaseinvoiceList = Loadable(lazy(() => import('../views/purches managenment/Purchase invoice/purchaseinvoicelist')));
const Purchaseinvoiceview = Loadable(lazy(() => import('../views/purches managenment/Purchase invoice/purchaseinvoiceview')));

// +++++++++++++++++++++++++++++++++++++++++ Routes of purchasse bill cash ++++++++++++++++++++++++++++++++++++++++++++
const Purchaseinvoicecash = Loadable(lazy(() => import('../views/purches managenment/Purchase invoice cash/purchaseinvoicecash')));
const Purchaseinvoicecashlist = Loadable(lazy(() => import('../views/purches managenment/Purchase invoice cash/purchaseinvoicecashlist')));
const Purchaseinvoicecashview = Loadable(lazy(() => import('../views/purches managenment/Purchase invoice cash/purchaseinvoicecashview')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of company +++++++++++++++++++++++++++++++++++++++++++++++++++
const CompanyList = Loadable(lazy(() => import('../views/company managenment/companylist')));
const AddCompanyForm = Loadable(lazy(() => import('../views/company managenment/addcompany')));
const CompanyviewPage = Loadable(lazy(() => import('../views/company managenment/companyview')));
const Singlebankledgerlist = Loadable(lazy(() => import('../views/company managenment/singlebankledger')));

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

// const { canViewAllProformainvoiceQuotation } = useCan();
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
    { path: '/claimcash', element: <ProtectedRoute element={Cliamcashpage} /> },
    { path: '/claimcash/:id', element: <ProtectedRoute element={Cliamcashpage} /> },
    { path: '/claimcashlist', element: <ProtectedRoute element={Claimcashlist} /> },
    { path: '/claimcashledger', element: <ProtectedRoute element={Claimledgerlist} /> },
    { path: '/recieveclaimcashlist', element: <ProtectedRoute element={Recieveclaimcashlist} /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of sales cash +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/salescash', element: <ProtectedRoute element={Salescash} /> },
    { path: '/salescash/:id', element: <ProtectedRoute element={Salescash} /> },
    { path: '/salescashlist', element: <ProtectedRoute element={Salescashlist} /> },
    { path: '/salescashview/:id', element: <ProtectedRoute element={Salescashview} /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of payments cash +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/paymentcash', element: <ProtectedRoute element={PaymentPage} /> },
    { path: '/paymentcash/:id', element: <ProtectedRoute element={PaymentPage} /> },
    { path: '/paymentcashlist', element: <ProtectedRoute element={PaymentListPage} /> },
    { path: '/paymentrecieve', element: <ProtectedRoute element={Paymentrecieve} /> },
    { path: '/paymentrecieve/:id', element: <ProtectedRoute element={Paymentrecieve} /> },
    { path: '/paymentrecieveList', element: <ProtectedRoute element={PaymentrecieveList} /> },
    { path: '/ledgerlist', element: <ProtectedRoute element={Ledgerlist} /> },
    { path: '/customerledgerlist', element: <ProtectedRoute element={Customerledgerlist} /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of payments bank +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/paymentbank', element: <Paymentbank /> },
    { path: '/paymentbank/:id', element: <Paymentbank /> },
    { path: '/paymentbanklist', element: <Paymentbanklist /> },
    { path: '/paymentbankledgerlist', element: <Paymentbankledgerlist /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of payments recieve bank +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/paymentrecievebank', element: <Paymentrecievebank /> },
    { path: '/paymentrecievebank/:id', element: <Paymentrecievebank /> },
    { path: '/paymentrecievebanklist', element: <Paymentrecievebanklist /> },
    { path: '/paymentrecievebankledgerlist', element: <Paymentbankrecieveledgerlist /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of expenses +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/expenselist', element: <ExpensePage /> },
    { path: '/addexpense', element: <AddExpense /> },
    { path: '/addexpense/:id', element: <AddExpense /> },
    { path: '/viewexpense/:id', element: <ExpenseDetailsPage /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of quotations +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/proformainvoice', element: <Proformainvoice /> },
    { path: '/proformainvoice/:id', element: <Proformainvoice /> },
    { path: '/proformainvoiceList', element: <ProformainvoiceList /> },
    // {
    //   path: '/proformainvoice',
    //   element: <ProtectedRoute element={Proformainvoice} resource="ProFormaInvoice" permissionName="create_ProFormaInvoice" />
    // },
    // {
    //   path: '/proformainvoice/:id',
    //   element: <ProtectedRoute element={Proformainvoice} resource="ProFormaInvoice" permissionName="update_ProFormaInvoice" />
    // },

    // {
    //   path: '/proformainvoiceList',
    //   element: <ProtectedRoute element={ProformainvoiceList} resource="ProFormaInvoice" permissionName="get_all_ProFormaInvoice" />
    // },
    { path: '/proformainvoiceviewpage/:id', element: <Proformainvoiceviewpage /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of salesinvoice +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/salesinvoice', element: <Salesinvoice /> },
    { path: '/salesinvoice/:id', element: <Salesinvoice /> },
    { path: '/salesinvoicelist', element: <Salesinvoicelist /> },
    { path: '/salesinvoiceview/:id', element: <Salesinvoiceview /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of deliverychallan +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/deliverychallan', element: <Deliverychallan /> },
    { path: '/deliverychallan/:id', element: <Deliverychallan /> },
    { path: '/deliverychallanlist', element: <DileveryChallanList /> },
    { path: '/deliverychallanview/:id', element: <DileveryChallanView /> },

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
    { path: '/purchaseinvoicecash', element: <ProtectedRoute element={Purchaseinvoicecash} /> },
    { path: '/purchaseinvoicecash/:id', element: <ProtectedRoute element={Purchaseinvoicecash} /> },
    { path: '/purchaseinvoicecashList', element: <ProtectedRoute element={Purchaseinvoicecashlist} /> },
    { path: '/purchaseinvoicecashview/:id', element: <ProtectedRoute element={Purchaseinvoicecashview} /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of company +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/companylist', element: <CompanyList /> },
    { path: '/companyview/:id', element: <CompanyviewPage /> },
    { path: '/addcompany', element: <AddCompanyForm /> },
    { path: '/addcompany/:id', element: <AddCompanyForm /> },
    { path: '/singlebankledger', element: <Singlebankledgerlist /> },

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
