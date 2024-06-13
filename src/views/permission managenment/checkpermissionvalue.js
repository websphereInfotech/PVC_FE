import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getallPermissions } from 'store/thunk';

const useCan = () => {
  const dispatch = useDispatch();
  const [permissions, setPermissions] = useState([]);

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

  const checkPermission = (resource, permissionName) => {
    const token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    const rolePermissions = permissions?.find((role) => role.role === userRole);
    if (rolePermissions) {
      const permission = rolePermissions?.permissions?.find((res) => res.resource === resource);
      if (permission?.permissions?.length) {
        const is = permission.permissions.find((perm) => perm.permission === permissionName);
        if (is) {
          return is?.permissionValue;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++ QOUTATION
  const canCreateProformainvoiceQuotation = () => {
    return checkPermission('ProFormaInvoice', 'create_ProFormaInvoice');
  };
  const canUpdateProformainvoiceQuotation = () => {
    return checkPermission('ProFormaInvoice', 'update_ProFormaInvoice');
  };
  const canDeleteProformainvoiceQuotation = () => {
    return checkPermission('ProFormaInvoice', 'delete_ProFormaInvoiceItem');
  };
  const canDeProformainvoiceQuotation = () => {
    return checkPermission('ProFormaInvoice', 'delete_ProFormaInvoice');
  };
  const canViewProformainvoiceQuotation = () => {
    return checkPermission('ProFormaInvoice', 'view_single_ProFormaInvoice');
  };
  const canViewAllProformainvoiceQuotation = () => {
    return checkPermission('ProFormaInvoice', 'view_all_ProFormaInvoice');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIN
  const canUserUpdate = () => {
    return checkPermission('Login', 'update_user');
  };
  const canUserView = () => {
    return checkPermission('Login', 'view_user');
  };
  const canUserLogout = () => {
    return checkPermission('Login', 'user_logout');
  };
  const canUserResetpassword = () => {
    return checkPermission('Login', 'reset_password');
  };
  const canUserCreate = () => {
    return checkPermission('Login', 'create_user');
  };
  const canUserDelete = () => {
    return checkPermission('Login', 'delete_user');
  };
  const canUserViewAll = () => {
    return checkPermission('Login', 'view_all_user');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++ DELIVERY CHALLAN
  const canCreateDeliverychallan = () => {
    return checkPermission('Delivery Challan', 'create_deliverychallan');
  };
  const canUpdateDeliverychallan = () => {
    return checkPermission('Delivery Challan', 'update_deliverychallan');
  };
  const canDeleteDeliverychallan = () => {
    return checkPermission('Delivery Challan', 'delete_deliverychallan');
  };
  const canDeleteDeliverychallanItem = () => {
    return checkPermission('Delivery Challan', 'delete_deliverychallanitem');
  };
  const canViewDeliverychallan = () => {
    return checkPermission('Delivery Challan', 'view_single_deliverychallan');
  };
  const canViewAllDeliverychallan = () => {
    return checkPermission('Delivery Challan', 'view_all_deliverychallan');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++ SALES INVOICE
  const canCreateSalesinvoice = () => {
    return checkPermission('Sales Invoice', 'create_salesinvoice');
  };
  const canUpdateSalesinvoice = () => {
    return checkPermission('Sales Invoice', 'update_salesInvoice');
  };
  const canDeleteSalesinvoice = () => {
    return checkPermission('Sales Invoice', 'delete_salesInvoice');
  };
  const canDeleteSalesinvoiceItem = () => {
    return checkPermission('Sales Invoice', 'delete_salesInvoiceItem');
  };
  const canViewalesinvoice = () => {
    return checkPermission('Sales Invoice', 'view_single_salesInvoice');
  };
  const canViewAllSalesinvoice = () => {
    return checkPermission('Sales Invoice', 'view_all_salesInvoice');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SALES RETURN
  const canCreateSalesinvoiceReturn = () => {
    return checkPermission('Sales Return', 'create_salesReturn');
  };
  const canViewAllSalesinvoiceReturn = () => {
    return checkPermission('Sales Return', 'view_all_salesReturn');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ EXPENSE
  const canCreateExpense = () => {
    return checkPermission('Expense', 'create_expense');
  };
  const canUpdateExpense = () => {
    return checkPermission('Expense', 'update_expense');
  };
  const canDeleteExpense = () => {
    return checkPermission('Expense', 'delete_expense');
  };
  const canDeleteExpenseItem = () => {
    return checkPermission('Expense', 'delete_expenseItem');
  };
  const canViewExpense = () => {
    return checkPermission('Expense', 'view_single_expense');
  };
  const canViewAllExpense = () => {
    return checkPermission('Expense', 'view_all_expense');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE ORDER
  const canCreatePurchaseorder = () => {
    return checkPermission('Purchase Order', 'create_purchase');
  };
  const canUpdatePurchaseorder = () => {
    return checkPermission('Purchase Order', 'update_purchase');
  };
  const canDeletePurchaseorder = () => {
    return checkPermission('Purchase Order', 'delete_purchase');
  };
  const canDeletePurchaseorderItem = () => {
    return checkPermission('Purchase Order', 'delete_purchaseitem');
  };
  const canViewPurchaseorder = () => {
    return checkPermission('Purchase Order', 'view_single_purchase');
  };
  const canViewAllPurchaseorder = () => {
    return checkPermission('Purchase Order', 'view_all_purchase');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT
  const canCreatePayment = () => {
    return checkPermission('Payment', 'create_payment');
  };
  const canUpdatePayment = () => {
    return checkPermission('Payment', 'update_payment');
  };
  const canDeletePayment = () => {
    return checkPermission('Payment', 'delete_payment');
  };
  const canViewPayment = () => {
    return checkPermission('Payment', 'view_single_payment');
  };
  const canViewAllPayment = () => {
    return checkPermission('Payment', 'view_all_payment');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ STOCK
  const canCreateStock = () => {
    return checkPermission('Stock', 'create_stockitem');
  };
  const canViewAllStock = () => {
    return checkPermission('Stock', 'view_all_stock');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CUSTOMER
  const canCreateCustomer = () => {
    return checkPermission('Customer', 'create_customer');
  };
  const canUpdateCustomer = () => {
    return checkPermission('Customer', 'update_customer');
  };
  const canDeleteCustomer = () => {
    return checkPermission('Customer', 'delete_customer');
  };
  const canDeleteCustomeFeild = () => {
    return checkPermission('Customer', 'delete_customfeild');
  };
  const canViewCustomer = () => {
    return checkPermission('Customer', 'view_single_customer');
  };
  const canViewAllCustomer = () => {
    return checkPermission('Customer', 'view_all_customer');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ VENDOR
  const canCreateVendor = () => {
    return checkPermission('Vendor', 'create_vendor');
  };
  const canUpdateVendor = () => {
    return checkPermission('Vendor', 'update_vendor');
  };
  const canDeleteVendor = () => {
    return checkPermission('Vendor', 'delete_vandor');
  };
  const canViewVendor = () => {
    return checkPermission('Vendor', 'view_vendor');
  };
  const canViewAllVendor = () => {
    return checkPermission('Vendor', 'view_all_vandor');
  };
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PRODUCT
  const canCreateProduct = () => {
    return checkPermission('Product', 'create_product');
  };
  const canUpdateProduct = () => {
    return checkPermission('Product', 'update_product');
  };
  const canDeleteProduct = () => {
    return checkPermission('Product', 'delete_product');
  };
  const canViewProduct = () => {
    return checkPermission('Product', 'view_single_product');
  };
  const canViewAllProduct = () => {
    return checkPermission('Product', 'view_all_product');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ITEM GROUP
  const canCreateItemgroup = () => {
    return checkPermission('Item Group', 'create_itemgroup');
  };
  const canUpdateItemgroup = () => {
    return checkPermission('Item Group', 'update_itemgroup');
  };
  const canViewItemgroup = () => {
    return checkPermission('Item Group', 'view_single_itemgroup');
  };
  const canViewAllItemgroup = () => {
    return checkPermission('Item Group', 'view_all_itemgroup');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ITEM CATEGORY
  const canCreateItemcategory = () => {
    return checkPermission('Item Category', 'create_itemcategory');
  };
  const canUpdateItemcategory = () => {
    return checkPermission('Item Category', 'update_itemcategory');
  };
  const canViewItemcategory = () => {
    return checkPermission('Item Category', 'view_single_itemcategory');
  };
  const canViewAllItemcategory = () => {
    return checkPermission('Item Category', 'view_all_itemcategory');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ UNIT
  const canCreateUnit = () => {
    return checkPermission('Unit', 'create_unit');
  };
  const canUpdateUnit = () => {
    return checkPermission('Unit', 'update_unit');
  };
  const canViewUnit = () => {
    return checkPermission('Unit', 'view_single_unit');
  };
  const canViewAllUnit = () => {
    return checkPermission('Unit', 'view_all_unit');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE BILL
  const canCreatePurchaseinvoice = () => {
    return checkPermission('Purchase Invoice', 'create_purchase_Invoice');
  };
  const canUpdatePurchaseinvoice = () => {
    return checkPermission('Purchase Invoice', 'update_purchase_Invoice');
  };
  const canDeletePurchaseinvoice = () => {
    return checkPermission('Purchase Invoice', 'delete_purchase_Invoice');
  };
  const canViewPurchaseinvoice = () => {
    return checkPermission('Purchase Invoice', 'view_single_purchase_Invoice');
  };
  const canViewAllPurchaseinvoice = () => {
    return checkPermission('Purchase Invoice', 'view_all_purchase_Invoice');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHSE RETURN
  const canCreatePurchasereturn = () => {
    return checkPermission('Purchase Return', 'create_purchaseReturn');
  };
  const canUpdatePurchasereturn = () => {
    return checkPermission('Purchase Return', 'update_purchaseReturn');
  };
  const canDeletePurchasereturn = () => {
    return checkPermission('Purchase Return', 'delete_purchasereturn');
  };
  const canDeletePurchasereturnItem = () => {
    return checkPermission('Purchase Return', 'delete_purchaseReturn_item');
  };
  const canViewPurchasereturn = () => {
    return checkPermission('Purchase Return', 'view_single_purchaseReturn');
  };
  const canViewAllPurchasereturn = () => {
    return checkPermission('Purchase Return', 'view_all_purchaseReturn');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ RECEIPT
  const canCreateReceipt = () => {
    return checkPermission('Receipt', 'create_receipt');
  };
  const canUpdateReceipt = () => {
    return checkPermission('Receipt', 'update_receipt');
  };
  const canDeleteReceipt = () => {
    return checkPermission('Receipt', 'delete_receipt');
  };
  const canViewReceipt = () => {
    return checkPermission('Receipt', 'view_single_receipt');
  };
  const canViewAllReceipt = () => {
    return checkPermission('Receipt', 'view_all_receipt');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ BANK ACCOUNT
  const canCreateBankaccount = () => {
    return checkPermission('Bank Account', 'create_bankaccount');
  };
  const canUpdateBankaccount = () => {
    return checkPermission('Bank Account', 'update_bankaccount');
  };
  const canDeleteBankaccount = () => {
    return checkPermission('Bank Account', 'delete_bankaccount');
  };
  const canViewBankaccount = () => {
    return checkPermission('Bank Account', 'view_single_bankaccount');
  };
  const canViwAllBankaccount = () => {
    return checkPermission('Bank Account', 'view_all_bankaccount');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DEBIT NOTE

  const canCreateDebitnote = () => {
    return checkPermission('Debit Note', 'create_debitNote');
  };
  const canUpdateDebitnote = () => {
    return checkPermission('Debit Note', 'update_debitNote');
  };
  const canDeleteDebitnote = () => {
    return checkPermission('Debit Note', 'delete_debitNote');
  };
  const canViewDebitnote = () => {
    return checkPermission('Debit Note', 'view_single_debitNote');
  };
  const canViwAllDebitnote = () => {
    return checkPermission('Debit Note', 'view_all_debitNote');
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CREDIT NOTE

  const canCreateCreditnote = () => {
    return checkPermission('Credit Note', 'create_creditNote');
  };
  const canUpdateCreditnote = () => {
    return checkPermission('Credit Note', 'update_creditNote');
  };
  const canDeleteCreditnote = () => {
    return checkPermission('Credit Note', 'delete_creditNote');
  };
  const canViewCreditnote = () => {
    return checkPermission('Credit Note', 'view_single_creditNote');
  };
  const canViwAllCreditnote = () => {
    return checkPermission('Credit Note', 'view_all_creditNote');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SALES CASH

  const canCreateSalescash = () => {
    return checkPermission('Sales Cash', 'create_sales_cash');
  };
  const canUpdateSalescash = () => {
    return checkPermission('Sales Cash', 'update_sales_cash');
  };
  const canDeleteSalescash = () => {
    return checkPermission('Sales Cash', 'delete_sales_cash');
  };
  const canViewSalescash = () => {
    return checkPermission('Sales Cash', 'view_sales_cash');
  };
  const canViwAllSalescash = () => {
    return checkPermission('Sales Cash', 'view_all_sales_cash');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE BILL CASH

  const canCreatePurchasebillcash = () => {
    return checkPermission('Purchase Cash', 'create_purchase_cash');
  };
  const canUpdatePurchasebillcash = () => {
    return checkPermission('Purchase Cash', 'update_purchase_cash');
  };
  const canDeletePurchasebillcash = () => {
    return checkPermission('Purchase Cash', 'delete_purchase_cash');
  };
  const canViewPurchasebillcash = () => {
    return checkPermission('Purchase Cash', 'view_purchase_cash');
  };
  const canViwAllPurchasebillcash = () => {
    return checkPermission('Purchase Cash', 'view_all_purchase_cash');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT CASH

  const canCreatePaymentcash = () => {
    return checkPermission('Payment Cash', 'create_payment_Cash');
  };
  const canUpdatePaymentcash = () => {
    return checkPermission('Payment Cash', 'update_payment_Cash');
  };
  const canDeletePaymentcash = () => {
    return checkPermission('Payment Cash', 'delete_payment_Cash');
  };
  const canViewPaymentcash = () => {
    return checkPermission('Payment Cash', 'view_payment_Cash');
  };
  const canViwAllPaymentcash = () => {
    return checkPermission('Payment Cash', 'view_all_payment_Cash');
  };
  const canViwAllPaymentcashLedger = () => {
    return checkPermission('Vendor Ledger Cash', 'View_Cash_vendor_Ledger');
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT RECIEVE CASH

  const canCreatePaymentrecievecash = () => {
    return checkPermission('Receive Cash', 'create_receive_Cash');
  };
  const canUpdatePaymentrecievecash = () => {
    return checkPermission('Receive Cash', 'update_receive_Cash');
  };
  const canDeletePaymentrecievecash = () => {
    return checkPermission('Receive Cash', 'delete_receive_Cash');
  };
  const canViewPaymentrecievecash = () => {
    return checkPermission('Receive Cash', 'view_receive_Cash');
  };
  const canViwAllPaymentrecievecash = () => {
    return checkPermission('Receive Cash', 'view_all_receive_Cash');
  };
  const canViwAllPaymentrecievecashLedger = () => {
    return checkPermission('Customer Ledger Cash', 'View_Cash_customer_Ledger');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT BANK

  const canCreatePaymentBank = () => {
    return checkPermission('Payment Bank', 'create_payment_bank');
  };
  const canUpdatePaymentBank = () => {
    return checkPermission('Payment Bank', 'update_payment_bank');
  };
  const canDeletePaymentBank = () => {
    return checkPermission('Payment Bank', 'delete_payment_bank');
  };
  const canViewPaymentBank = () => {
    return checkPermission('Payment Bank', 'view_payment_bank');
  };
  const canViwAllPaymentBank = () => {
    return checkPermission('Payment Bank', 'view_all_payment_bank');
  };
  const canViewAllVendorLedger = () => {
    return checkPermission('Vendor Ledger', 'View_vendor_Ledger');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT Recieve BANK

  const canCreatePaymentRecieveBank = () => {
    return checkPermission('Receive Bank', 'create_receive_bank');
  };
  const canUpdatePaymentRecieveBank = () => {
    return checkPermission('Receive Bank', 'update_receive_bank');
  };
  const canDeletePaymentRecieveBank = () => {
    return checkPermission('Receive Bank', 'delete_receive_bank');
  };
  const canViewPaymentRecieveBank = () => {
    return checkPermission('Receive Bank', 'view_receive_bank');
  };
  const canViwAllPaymentRecieveBank = () => {
    return checkPermission('Receive Bank', 'get_all_receive_bank');
  };
  const canViewAllCustomerLedger = () => {
    return checkPermission('Customer Ledger', 'View_customer_Ledger');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMPANY

  const canCreateCompany = () => {
    return checkPermission('Company', 'create_company');
  };
  const canUpdateCompany = () => {
    return checkPermission('Company', 'update_company');
  };
  const canDeleteCompany = () => {
    return checkPermission('Company', 'delete_company');
  };
  const canViewCompany = () => {
    return checkPermission('Company', 'view_single_company');
  };
  const canViwAllCompany = () => {
    return checkPermission('Company', 'view_all_company');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMPANY BANK

  const canCreateCompanyBank = () => {
    return checkPermission('Company Bank Details', 'create_company_bankDetails');
  };
  const canUpdateCompanyBank = () => {
    return checkPermission('Company Bank Details', 'update_company_bankDetails');
  };
  const canDeleteCompanyBank = () => {
    return checkPermission('Company Bank Details', 'delete_company_bankDetails');
  };
  const canViewCompanyBank = () => {
    return checkPermission('Company Bank Details', 'view_company_bankDetails');
  };
  const canViwAllCompanyBank = () => {
    return checkPermission('Company Bank Details', 'view_all_company_bankDetails');
  };
  const canViewCompanyBankLedger = () => {
    return checkPermission('Company Bank Details', 'view_single_bankLedger');
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT RECIEVE CASH

  const canCreateClaimcash = () => {
    return checkPermission('Claim Cash', 'create_claim');
  };
  const canUpdateClaimcash = () => {
    return checkPermission('Claim Cash', 'update_claim');
  };
  const canDeleteClaimcash = () => {
    return checkPermission('Claim Cash', 'delete_claim');
  };
  const canViewClaimcash = () => {
    return checkPermission('Claim Cash', 'view_single_claim');
  };
  const canViwAllClaimcash = () => {
    return checkPermission('Claim Cash', 'view_myclaim');
  };
  const canViwAllRecieveClaimcash = () => {
    return checkPermission('Claim Cash', 'view_reciveclaim');
  };
  const canIsapproveClaimcash = () => {
    return checkPermission('Claim Cash', 'isapproved_claim');
  };
  const canViwAllClaimcashLedger = () => {
    return checkPermission('Claim Cash', 'view_claimBalance_ledger');
  };

  return {
    // PROFORMAINVOICE +++++++++++++++++++++++
    checkPermission,
    canCreateProformainvoiceQuotation,
    canUpdateProformainvoiceQuotation,
    canDeleteProformainvoiceQuotation,
    canViewProformainvoiceQuotation,
    canViewAllProformainvoiceQuotation,
    canDeProformainvoiceQuotation,
    // USERS +++++++++++++++++++++++++++
    canUserUpdate,
    canUserView,
    canUserLogout,
    canUserResetpassword,
    canUserCreate,
    canUserDelete,
    canUserViewAll,
    // DELIVERY CHALLAN +++++++++++++++
    canCreateDeliverychallan,
    canUpdateDeliverychallan,
    canDeleteDeliverychallan,
    canDeleteDeliverychallanItem,
    canViewDeliverychallan,
    canViewAllDeliverychallan,
    // SALES INVOICE ++++++++++++++++++
    canCreateSalesinvoice,
    canUpdateSalesinvoice,
    canDeleteSalesinvoice,
    canDeleteSalesinvoiceItem,
    canViewalesinvoice,
    canViewAllSalesinvoice,
    // SALES INVOICE RETURN +++++++++++
    canCreateSalesinvoiceReturn,
    canViewAllSalesinvoiceReturn,
    // EXPENSE ++++++++++++++++++++++++
    canCreateExpense,
    canUpdateExpense,
    canDeleteExpense,
    canDeleteExpenseItem,
    canViewExpense,
    canViewAllExpense,
    // PURCHASE ORDER +++++++++++++++++
    canCreatePurchaseorder,
    canUpdatePurchaseorder,
    canDeletePurchaseorder,
    canDeletePurchaseorderItem,
    canViewPurchaseorder,
    canViewAllPurchaseorder,
    // PAYMENT ++++++++++++++++++++++++
    canCreatePayment,
    canUpdatePayment,
    canDeletePayment,
    canViewPayment,
    canViewAllPayment,
    // STOCK ++++++++++++++++++++++++++
    canCreateStock,
    canViewAllStock,
    // CUSTOMER +++++++++++++++++++++++
    canCreateCustomer,
    canUpdateCustomer,
    canDeleteCustomer,
    canDeleteCustomeFeild,
    canViewCustomer,
    canViewAllCustomer,
    //  VENDOR ++++++++++++++++++++++++
    canCreateVendor,
    canUpdateVendor,
    canDeleteVendor,
    canViewVendor,
    canViewAllVendor,
    // PRODUCT ++++++++++++++++++++++++
    canCreateProduct,
    canUpdateProduct,
    canDeleteProduct,
    canViewProduct,
    canViewAllProduct,
    // ITEM GROUP +++++++++++++++++++++
    canCreateItemgroup,
    canUpdateItemgroup,
    canViewItemgroup,
    canViewAllItemgroup,
    // ITEM CATEGORY ++++++++++++++++++
    canCreateItemcategory,
    canUpdateItemcategory,
    canViewItemcategory,
    canViewAllItemcategory,
    // UNIT +++++++++++++++++++++++++++
    canCreateUnit,
    canUpdateUnit,
    canViewUnit,
    canViewAllUnit,
    // PURCHSE BILL +++++++++++++++++++
    canCreatePurchaseinvoice,
    canUpdatePurchaseinvoice,
    canDeletePurchaseinvoice,
    canViewPurchaseinvoice,
    canViewAllPurchaseinvoice,
    // PURCHSE RETURN +++++++++++++++++
    canCreatePurchasereturn,
    canUpdatePurchasereturn,
    canDeletePurchasereturn,
    canDeletePurchasereturnItem,
    canViewPurchasereturn,
    canViewAllPurchasereturn,
    // RECEIPT ++++++++++++++++++++++++
    canCreateReceipt,
    canUpdateReceipt,
    canDeleteReceipt,
    canViewReceipt,
    canViewAllReceipt,
    //  BANK ACCOUNT ++++++++++++++++++
    canCreateBankaccount,
    canUpdateBankaccount,
    canDeleteBankaccount,
    canViewBankaccount,
    canViwAllBankaccount,
    //  DEBIT NOTE ++++++++++++++++++
    canCreateDebitnote,
    canUpdateDebitnote,
    canDeleteDebitnote,
    canViewDebitnote,
    canViwAllDebitnote,
    //  CREDIT NOTE ++++++++++++++++++
    canCreateCreditnote,
    canUpdateCreditnote,
    canDeleteCreditnote,
    canViewCreditnote,
    canViwAllCreditnote,
    // SALES CASH ++++++++++++++++++++
    canCreateSalescash,
    canUpdateSalescash,
    canDeleteSalescash,
    canViewSalescash,
    canViwAllSalescash,
    // PURCHASE BILL CASH ++++++++++++
    canCreatePurchasebillcash,
    canUpdatePurchasebillcash,
    canDeletePurchasebillcash,
    canViewPurchasebillcash,
    canViwAllPurchasebillcash,
    //  PAYMENT CASH +++++++++++++++++
    canCreatePaymentcash,
    canUpdatePaymentcash,
    canDeletePaymentcash,
    canViewPaymentcash,
    canViwAllPaymentcash,
    canViwAllPaymentcashLedger,
    // PAYMENT REICEVE CASH +++++++++++
    canCreatePaymentrecievecash,
    canUpdatePaymentrecievecash,
    canDeletePaymentrecievecash,
    canViewPaymentrecievecash,
    canViwAllPaymentrecievecash,
    canViwAllPaymentrecievecashLedger,
    // CLAIM CASH +++++++++++
    canCreateClaimcash,
    canUpdateClaimcash,
    canDeleteClaimcash,
    canViewClaimcash,
    canViwAllClaimcash,
    canViwAllRecieveClaimcash,
    canIsapproveClaimcash,
    canViwAllClaimcashLedger,
    // PAYMENT BANK ++++++++++++
    canCreatePaymentBank,
    canUpdatePaymentBank,
    canDeletePaymentBank,
    canViewPaymentBank,
    canViwAllPaymentBank,
    canViewAllVendorLedger,
    // PAYMENT RECIEVE BANK +++++
    canCreatePaymentRecieveBank,
    canUpdatePaymentRecieveBank,
    canDeletePaymentRecieveBank,
    canViewPaymentRecieveBank,
    canViwAllPaymentRecieveBank,
    canViewAllCustomerLedger,
    // COMPANY ++++++++++++++++++
    canCreateCompany,
    canUpdateCompany,
    canDeleteCompany,
    canViewCompany,
    canViwAllCompany,
    // COMPANY BANK DETAILS +++++++
    canCreateCompanyBank,
    canUpdateCompanyBank,
    canDeleteCompanyBank,
    canViewCompanyBank,
    canViwAllCompanyBank,
    canViewCompanyBankLedger
  };
};

export default useCan;
