// import React from 'react';
// // import { Navigate } from 'react-router-dom';
// import useCan from 'views/permission managenment/checkpermissionvalue';
// import ProformainvoiceList from 'views/sale managenment/Proformainvoice/proformainvoicelist';

// const ProtectedRoute = ({ element: Component, resource, permissionName }) => {
//   const { checkPermission } = useCan();
//   const hasPermission = checkPermission(resource, permissionName);

//   console.log('Resource:', resource);
//   console.log('Permission Name:', permissionName);
//   console.log('Has Permission:', hasPermission);
//   console.log('Has Component:', <Component />);

//   if (hasPermission) {
//     if (permissionName === 'view_all_ProFormaInvoice') {
//       return <ProformainvoiceList />;
//     }
//   } else {
//     return <h1>Permission</h1>;
//   }
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import useCan from 'views/permission managenment/checkpermissionvalue';

const ProtectedRoute = ({ element: Component, resource, permissionName }) => {
  const { checkPermission } = useCan();
  const hasPermission = checkPermission(resource, permissionName);
  if (hasPermission) {
    return <Component />;
  } else {
    return <Navigate to="/404" replace />;
  }
};

export default ProtectedRoute;

// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ element: Component }) => {
//   const token = sessionStorage.getItem('type');
//   if (token === 'C') {
//     return <Component />;
//   }

//   return <Navigate to="*" replace />;
// };
// export default ProtectedRoute;
