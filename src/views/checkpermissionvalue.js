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
      if (permission) {
        return permission.permissions.some((perm) => perm.permission === permissionName && perm.permissionValue === true);
      }
    }
    return false;
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
    return checkPermission('ProFormaInvoice', 'get_all_ProFormaInvoice');
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
  const canCreatePurchasebill = () => {
    return checkPermission('Purchase Bill', 'create_purchasebill');
  };
  const canUpdatePurchasebill = () => {
    return checkPermission('Purchase Bill', 'update_purchasebill');
  };
  const canDeletePurchasebill = () => {
    return checkPermission('Purchase Bill', 'delete_purchasebill');
  };
  const canDeletePurchasebillItem = () => {
    return checkPermission('Purchase Bill', 'delete_purchasebill_item');
  };
  const canViewPurchasebill = () => {
    return checkPermission('Purchase Bill', 'view_single_purchasebill');
  };
  const canViewAllPurchasebill = () => {
    return checkPermission('Purchase Bill', 'view_all_purchasebill');
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

  return {
    // PROFORMAINVOICE +++++++++++++++++++++++
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
    canCreatePurchasebill,
    canUpdatePurchasebill,
    canDeletePurchasebill,
    canDeletePurchasebillItem,
    canViewPurchasebill,
    canViewAllPurchasebill,
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
    canViwAllBankaccount
  };
};

export default useCan;
