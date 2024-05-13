// import {
//   // DELIVERYCHALLAN +++++++++++++++++++++++++++++++++
//   // createDeliveryChallanItem,
//   // deleteDileveryChallan,
//   // updateDileveryChallanItem,
//   // updateDileveryChallan,
//   // Deliverychallanview,
//   // createDeliveryChallan,
//   // getallDeliverychallan
//   // // SALES INVOICE +++++++++++++++++++++++++++++++++++
//   // createSalesInvoice,
//   // createSalesinvoiceItem,
//   // SalesInvoiceview,
//   // getallSalesInvoice,
//   // QUOTATION +++++++++++++++++++++++++++++++++++
//   fetchproformainvoiceList,
//   createQuotation,
//   createQuotationItem,
//   deleteQuotationItem,
//   Quotationview,
//   updateQutation,
//   updateQuotationItem
//   // // CUSTOMER +++++++++++++++++++++++++++++++++++
//   // fetchAllCustomers,
//   // createCustomer,
//   // createCustomfeild,
//   // deleteCustomFeild,
//   // // PRODUCT +++++++++++++++++++++++++++++++++++
//   // fetchAllProducts,
//   // createProduct
// } from 'store/thunk';

// export default function createData(name, role) {
//   let permissions = {};

//   // Define permissions based on role
//   switch (role) {
//     case 'Super Admin':
//       permissions = {
//         // 'Delivery Challan': deliveryChallanPermissions,
//         // 'Sales Invoice': salesInvoicePermissions,
//         // Customer: customerPermissions,
//         Quotation: quotationPermissions
//         // Product: productPermissions
//       };
//       break;
//     case 'Admin':
//       permissions = {
//         // 'Delivery Challan': deliveryChallanPermissions,
//         // Product: productPermissions,
//         Quotation: quotationPermissions
//       };
//       break;
//     case 'Finance':
//       permissions = {
//         // 'Delivery Challan': deliveryChallanPermissions,
//         // 'Sales Invoice': salesInvoicePermissions,
//         // Customer: customerPermissions
//       };
//       break;
//     case 'Employee':
//       permissions = {
//         // 'Delivery Challan': deliveryChallanPermissions,
//         // Product: productPermissions
//       };
//       break;
//     case 'Worker':
//       permissions = {
//         // 'Delivery Challan': deliveryChallanPermissions,
//         Quotation: quotationPermissions
//       };
//       break;
//     case 'Others':
//       permissions = {
//         // Product: productPermissions
//       };
//       break;
//     default:
//       permissions = {};
//       break;
//   }

//   return {
//     name,
//     permissions
//   };
// }

// // const deliveryChallanPermissions = {
// //   'Create Delivery Challan Item': createDeliveryChallanItem,
// //   'Delete Delivery Challan': deleteDileveryChallan,
// //   'Update Delivery Challan Item': updateDileveryChallanItem,
// //   'Update Delivery Challan': updateDileveryChallan,
// //   'View Delivery Challan': Deliverychallanview,
// //   'Create Delivery Challan': createDeliveryChallan,
// //   'Get All Delivery Challan': getallDeliverychallan
// // };

// // const salesInvoicePermissions = {
// //   'Create Sales Invoice': createSalesInvoice,
// //   'Create Sales Invoice Item': createSalesinvoiceItem,
// //   'View Sales Invoice': SalesInvoiceview,
// //   'Get All Sales Invoices': getallSalesInvoice
// // };

// // const customerPermissions = {
// //   'Get All Customers': fetchAllCustomers,
// //   'Create Customer': createCustomer,
// //   'Create Custom Feild': createCustomfeild,
// //   'Delete Custom Feild': deleteCustomFeild
// // };

// const quotationPermissions = {
//   'Get All Quotations': fetchproformainvoiceList,
//   'Create Quotation': createQuotation,
//   'Create Quotation Item': createQuotationItem,
//   'Delete Quotation Item': deleteQuotationItem,
//   'View Quotation': Quotationview,
//   'Upadte Quotation': updateQutation,
//   'Update Quotation Item': updateQuotationItem
// };

// // const productPermissions = {
// //   'Get All Product': fetchAllProducts,
// //   'Create Product': createProduct
// // };
