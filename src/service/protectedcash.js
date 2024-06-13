// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import useCan from 'views/permission managenment/checkpermissionvalue';

// const ProtectedRoute = ({ element: Component, resource, permissionName }) => {
//   console.log("resource",resource);
//   console.log("permissionName",permissionName);
//   // const token = sessionStorage.getItem('type');
//   const { checkPermission } = useCan();
//   console.log("checkPermission",!checkPermission());
//   console.log(!checkPermission(resource, permissionName), Component, 'log of permissions');
//   if (!checkPermission(resource, permissionName)) {
//     return <Component />;
//   }

//   return <Navigate to="*" />;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const token = sessionStorage.getItem('type');
  if (token === 'C') {
    return <Component />;
  }

  return <Navigate to="*" replace />;
};
export default ProtectedRoute;
