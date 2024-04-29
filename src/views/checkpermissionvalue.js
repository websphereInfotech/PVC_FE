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

  const checkPermission = (permissionName) => {
    const token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    const rolePermissions = permissions?.find((role) => role.role === userRole);
    if (rolePermissions) {
      const permission = rolePermissions?.permissions?.find((resource) => resource.resource === 'Quotation');
      if (permission) {
        return permission.permissions.some((perm) => perm.permission === permissionName && perm.permissionValue === true);
      }
    }
    return false;
  };

  const canCreateQuotation = () => {
    return checkPermission('create_quotation');
  };

  const canUpdateQuotation = () => {
    return checkPermission('update_quotation');
  };

  const canDeleteQuotation = () => {
    return checkPermission('delete_quotationitem');
  };

  const canViewQuotation = () => {
    return checkPermission('view_single_quotation');
  };

  const canViewAllQuotation = () => {
    return checkPermission('view_all_quotation');
  };

  return { canCreateQuotation, canUpdateQuotation, canDeleteQuotation, canViewQuotation, canViewAllQuotation };
};

export default useCan;
