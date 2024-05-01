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
  const canCreateQuotation = () => {
    return checkPermission('Quotation', 'create_quotation');
  };
  const canUpdateQuotation = () => {
    return checkPermission('Quotation', 'update_quotation');
  };
  const canDeleteQuotation = () => {
    return checkPermission('Quotation', 'delete_quotationitem');
  };
  const canDeQuotation = () => {
    return checkPermission('Quotation', 'delete_quotation');
  };
  const canViewQuotation = () => {
    return checkPermission('Quotation', 'view_single_quotation');
  };
  const canViewAllQuotation = () => {
    return checkPermission('Quotation', 'view_all_quotation');
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

  return {
    // QUOTATION +++++++++++++++++++++++
    canCreateQuotation,
    canUpdateQuotation,
    canDeleteQuotation,
    canViewQuotation,
    canViewAllQuotation,
    canDeQuotation,
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
    canViewAllDeliverychallan
  };
};

export default useCan;
