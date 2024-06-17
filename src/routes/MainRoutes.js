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
const Billofmateriallist = Loadable(lazy(() => import('../views/production managenment/Bill Of Material/billofmateriallist')));
const Addbillofmaterial = Loadable(lazy(() => import('../views/production managenment/Bill Of Material/addbillofmaterial')));
const Bomview = Loadable(lazy(() => import('../views/production managenment/Bill Of Material/billofmaterialview')));
const Product = Loadable(lazy(() => import('../views/production managenment/product')));

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of stock +++++++++++++++++++++++++++++++++++++++++++++++++++
const StockManagement = Loadable(lazy(() => import('../views/stock managenment/stock')));
const Stockmain = Loadable(lazy(() => import('../views/stock managenment/stockmain')));

// ++++++++++++++++++++++++++++++++++++++++++++++ Route permission +++++++++++++++++++++++++++++++++++
const Permission = Loadable(lazy(() => import('../views/permission managenment/permission')));
const User = Loadable(lazy(() => import('../views/permission managenment/adduser')));
const UserList = Loadable(lazy(() => import('../views/permission managenment/userlist')));
const Userviewpage = Loadable(lazy(() => import('../views/permission managenment/userview')));

// ++++++++++++++++++++++++++++++++++++++++++++++++++ Product ++++++++++++++++++++++++++++++++++++++++
const ProductList = Loadable(lazy(() => import('../views/general managenment/Product/productList')));
const Productview = Loadable(lazy(() => import('../views/general managenment/Product/productview')));

// +++++++++++++++++++++++++++++++++++++++++++++++++++++ Customer ++++++++++++++++++++++++++++++++++++++++++++++++
const CustomerList = Loadable(lazy(() => import('../views/general managenment/Customer/customerlist')));
const Customerview = Loadable(lazy(() => import('../views/general managenment/Customer/customerview')));

// +++++++++++++++++++++++++++++++++++++++++++++++ Vendor +++++++++++++++++++++++++++++++++++++
const VendorList = Loadable(lazy(() => import('../views/general managenment/Vendor/vendorlist')));
const Vendorview = Loadable(lazy(() => import('../views/general managenment/Vendor/vendorview')));

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
    { path: '/claimcash', element: <ProtectedRoute element={Cliamcashpage} resource="Claim Cash" permissionName="create_claim" /> },
    { path: '/claimcash/:id', element: <ProtectedRoute element={Cliamcashpage} resource="Claim Cash" permissionName="update_claim" /> },
    { path: '/claimcashlist', element: <ProtectedRoute element={Claimcashlist} resource="Claim Cash" permissionName="view_myclaim" /> },
    {
      path: '/claimcashledger',
      element: <ProtectedRoute element={Claimledgerlist} resource="Claim Cash" permissionName="view_claimBalance_ledger" />
    },
    {
      path: '/recieveclaimcashlist',
      element: <ProtectedRoute element={Recieveclaimcashlist} resource="Claim Cash" permissionName="view_reciveclaim" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of sales cash +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/salescash', element: <ProtectedRoute element={Salescash} resource="Sales Cash" permissionName="create_sales_cash" /> },
    { path: '/salescash/:id', element: <ProtectedRoute element={Salescash} resource="Sales Cash" permissionName="update_sales_cash" /> },
    {
      path: '/salescashlist',
      element: <ProtectedRoute element={Salescashlist} resource="Sales Cash" permissionName="view_all_sales_cash" />
    },
    {
      path: '/salescashview/:id',
      element: <ProtectedRoute element={Salescashview} resource="Sales Cash" permissionName="view_sales_cash" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of payments cash +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/paymentcash',
      element: <ProtectedRoute element={PaymentPage} resource="Payment Cash" permissionName="create_payment_Cash" />
    },
    {
      path: '/paymentcash/:id',
      element: <ProtectedRoute element={PaymentPage} resource="Payment Cash" permissionName="update_payment_Cash" />
    },
    {
      path: '/paymentcashlist',
      element: <ProtectedRoute element={PaymentListPage} resource="Payment Cash" permissionName="view_all_payment_Cash" />
    },
    {
      path: '/paymentrecieve',
      element: <ProtectedRoute element={Paymentrecieve} resource="Receive Cash" permissionName="create_receive_Cash" />
    },
    {
      path: '/paymentrecieve/:id',
      element: <ProtectedRoute element={Paymentrecieve} resource="Receive Cash" permissionName="update_receive_Cash" />
    },
    {
      path: '/paymentrecieveList',
      element: <ProtectedRoute element={PaymentrecieveList} resource="Receive Cash" permissionName="view_all_receive_Cash" />
    },
    {
      path: '/ledgerlist',
      element: <ProtectedRoute element={Ledgerlist} resource="Vendor Ledger Cash" permissionName="View_Cash_vendor_Ledger" />
    },
    {
      path: '/customerledgerlist',
      element: <ProtectedRoute element={Customerledgerlist} resource="Customer Ledger Cash" permissionName="View_Cash_customer_Ledger" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of payments bank +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/paymentbank',
      element: <ProtectedRoute element={Paymentbank} resource="Payment Bank" permissionName="create_payment_bank" />
    },
    {
      path: '/paymentbank/:id',
      element: <ProtectedRoute element={Paymentbank} resource="Payment Bank" permissionName="update_payment_bank" />
    },
    {
      path: '/paymentbanklist',
      element: <ProtectedRoute element={Paymentbanklist} resource="Payment Bank" permissionName="view_all_payment_bank" />
    },
    {
      path: '/paymentbankledgerlist',
      element: <ProtectedRoute element={Paymentbankledgerlist} resource="Vendor Ledger" permissionName="View_vendor_Ledger" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of payments recieve bank +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/paymentrecievebank',
      element: <ProtectedRoute element={Paymentrecievebank} resource="Receive Bank" permissionName="create_receive_bank" />
    },
    {
      path: '/paymentrecievebank/:id',
      element: <ProtectedRoute element={Paymentrecievebank} resource="Receive Bank" permissionName="update_receive_bank" />
    },
    {
      path: '/paymentrecievebanklist',
      element: <ProtectedRoute element={Paymentrecievebanklist} resource="Receive Bank" permissionName="get_all_receive_bank" />
    },
    {
      path: '/paymentrecievebankledgerlist',
      element: <ProtectedRoute element={Paymentbankrecieveledgerlist} resource="Customer Ledger" permissionName="View_customer_Ledger" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of expenses +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/expenselist', element: <ExpensePage /> },
    { path: '/addexpense', element: <AddExpense /> },
    { path: '/addexpense/:id', element: <AddExpense /> },
    { path: '/viewexpense/:id', element: <ExpenseDetailsPage /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of quotations +++++++++++++++++++++++++++++++++++++++++++++++++++
    // { path: '/proformainvoice', element: <Proformainvoice /> },
    // { path: '/proformainvoice/:id', element: <Proformainvoice /> },
    // { path: '/proformainvoiceList', element: <ProformainvoiceList /> },
    {
      path: '/proformainvoice',
      element: <ProtectedRoute element={Proformainvoice} resource="ProFormaInvoice" permissionName="create_ProFormaInvoice" />
    },
    {
      path: '/proformainvoice/:id',
      element: <ProtectedRoute element={Proformainvoice} resource="ProFormaInvoice" permissionName="update_ProFormaInvoice" />
    },

    {
      path: '/proformainvoiceList',
      element: <ProtectedRoute element={ProformainvoiceList} resource="ProFormaInvoice" permissionName="view_all_ProFormaInvoice" />
    },
    {
      path: '/proformainvoiceviewpage/:id',
      element: <ProtectedRoute element={Proformainvoiceviewpage} resource="ProFormaInvoice" permissionName="view_single_ProFormaInvoice" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of salesinvoice +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/salesinvoice',
      element: <ProtectedRoute element={Salesinvoice} resource="Sales Invoice" permissionName="create_salesinvoice" />
    },
    {
      path: '/salesinvoice/:id',
      element: <ProtectedRoute element={Salesinvoice} resource="Sales Invoice" permissionName="update_salesInvoice" />
    },
    {
      path: '/salesinvoicelist',
      element: <ProtectedRoute element={Salesinvoicelist} resource="Sales Invoice" permissionName="view_all_salesInvoice" />
    },
    {
      path: '/salesinvoiceview/:id',
      element: <ProtectedRoute element={Salesinvoiceview} resource="Sales Invoice" permissionName="view_single_salesInvoice" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of deliverychallan +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/deliverychallan',
      element: <ProtectedRoute element={Deliverychallan} resource="Delivery Challan" permissionName="create_deliverychallan" />
    },
    {
      path: '/deliverychallan/:id',
      element: <ProtectedRoute element={Deliverychallan} resource="Delivery Challan" permissionName="update_deliverychallan" />
    },
    {
      path: '/deliverychallanlist',
      element: <ProtectedRoute element={DileveryChallanList} resource="Delivery Challan" permissionName="view_all_deliverychallan" />
    },
    {
      path: '/deliverychallanview/:id',
      element: <ProtectedRoute element={DileveryChallanView} resource="Delivery Challan" permissionName="view_single_deliverychallan" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of sales return +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/debitnote', element: <ProtectedRoute element={DebitNote} resource="Debit Note" permissionName="create_debitNote" /> },
    { path: '/debitnote/:id', element: <ProtectedRoute element={DebitNote} resource="Debit Note" permissionName="update_debitNote" /> },
    {
      path: '/debitnotelist',
      element: <ProtectedRoute element={Debitnotelist} resource="Debit Note" permissionName="view_all_debitNote" />
    },
    {
      path: '/debitnoteview/:id',
      element: <ProtectedRoute element={Debitnoteview} resource="Debit Note" permissionName="view_single_debitNote" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of sales return +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/creditnote', element: <ProtectedRoute element={Creditnote} resource="Credit Note" permissionName="create_creditNote" /> },
    { path: '/creditnote/:id', element: <ProtectedRoute element={Creditnote} resource="Credit Note" permissionName="update_creditNote" /> },
    {
      path: '/creditnotelist',
      element: <ProtectedRoute element={Creditnotelist} resource="Credit Note" permissionName="view_all_creditNote" />
    },
    {
      path: '/creditnoteview/:id',
      element: <ProtectedRoute element={CreditnoteView} resource="Credit Note" permissionName="view_single_creditNote" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchase invoice +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/purchaseinvoice',
      element: <ProtectedRoute element={Purchaseinvoice} resource="Purchase Invoice" permissionName="create_purchase_Invoice" />
    },
    {
      path: '/purchaseinvoice/:id',
      element: <ProtectedRoute element={Purchaseinvoice} resource="Purchase Invoice" permissionName="update_purchase_Invoice" />
    },
    {
      path: '/purchaseinvoiceList',
      element: <ProtectedRoute element={PurchaseinvoiceList} resource="Purchase Invoice" permissionName="view_all_purchase_Invoice" />
    },
    {
      path: '/purchaseinvoiceview/:id',
      element: <ProtectedRoute element={Purchaseinvoiceview} resource="Purchase Invoice" permissionName="view_single_purchase_Invoice" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchase invoice Cash  +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/purchaseinvoicecash',
      element: <ProtectedRoute element={Purchaseinvoicecash} resource="Purchase Cash" permissionName="create_purchase_cash" />
    },
    {
      path: '/purchaseinvoicecash/:id',
      element: <ProtectedRoute element={Purchaseinvoicecash} resource="Purchase Cash" permissionName="update_purchase_cash" />
    },
    {
      path: '/purchaseinvoicecashList',
      element: <ProtectedRoute element={Purchaseinvoicecashlist} resource="Purchase Cash" permissionName="view_all_purchase_cash" />
    },
    {
      path: '/purchaseinvoicecashview/:id',
      element: <ProtectedRoute element={Purchaseinvoicecashview} resource="Purchase Cash" permissionName="view_purchase_cash" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of company +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/companylist', element: <ProtectedRoute element={CompanyList} resource="Company" permissionName="view_all_company" /> },
    {
      path: '/companyview/:id',
      element: <ProtectedRoute element={CompanyviewPage} resource="Company" permissionName="view_single_company" />
    },
    { path: '/addcompany', element: <ProtectedRoute element={AddCompanyForm} resource="Company" permissionName="create_company" /> },
    { path: '/addcompany/:id', element: <ProtectedRoute element={AddCompanyForm} resource="Company" permissionName="update_company" /> },
    {
      path: '/singlebankledger',
      element: <ProtectedRoute element={Singlebankledgerlist} resource="Company Bank Details" permissionName="view_single_bankLedger" />
    },

    // +++++++++++++++++++++++++++++++++++++++++++++++++++ Product edit view ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/productlist', element: <ProtectedRoute element={ProductList} resource="Product" permissionName="view_all_product" /> },
    { path: '/productview/:id', element: <ProtectedRoute element={Productview} resource="Product" permissionName="view_single_product" /> },

    // +++++++++++++++++++++++++++++++++++++++++++++++++++ Customer edit view ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/customerlist', element: <ProtectedRoute element={CustomerList} resource="Customer" permissionName="view_all_customer" /> },
    {
      path: '/customerview/:id',
      element: <ProtectedRoute element={Customerview} resource="Customer" permissionName="view_single_customer" />
    },

    // +++++++++++++++++++++++++++++++++++++++++++++++++++ Vendor edit view ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/vendorlist', element: <ProtectedRoute element={VendorList} resource="Vendor" permissionName="view_all_vandor" /> },
    { path: '/vendorview/:id', element: <ProtectedRoute element={Vendorview} resource="Vendor" permissionName="view_vendor" /> },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of production +++++++++++++++++++++++++++++++++++++++++++++++++++

    { path: '/billofmateriallist', element: <ProtectedRoute element={Billofmateriallist} resource="Bom" permissionName="view_all_bom" /> },
    { path: '/addbillofmaterial', element: <ProtectedRoute element={Addbillofmaterial} resource="Bom" permissionName="create_bom" /> },
    {
      path: '/addbillofmaterial/:bomId',
      element: <ProtectedRoute element={Addbillofmaterial} resource="Bom" permissionName="update_bom" />
    },
    {
      path: '/billofmaterialview/:bomId',
      element: <ProtectedRoute element={Bomview} resource="Bom" permissionName="view_bom" />
    },
    { path: '/products', element: <Product /> },

    // ++++++++++++++++++++++++++++++++++++++++++++Routes of stock +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/stock', element: <StockManagement /> },
    { path: '/stockmain', element: <Stockmain /> },

    // ++++++++++++++++++++++++++++++++++++++++++++++++++ Routes of Permission +++++++++++++++++++++++++++++++++++
    { path: '/permission', element: <Permission /> },
    { path: '/adduser', element: <ProtectedRoute element={User} resource="Login" permissionName="create_user" /> },
    { path: '/updateuser/:id', element: <ProtectedRoute element={User} resource="Login" permissionName="update_user" /> },
    { path: '/userlist', element: <ProtectedRoute element={UserList} resource="Login" permissionName="view_all_user" /> },
    { path: '/userview/:id', element: <ProtectedRoute element={Userviewpage} resource="Login" permissionName="view_user" /> },

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
