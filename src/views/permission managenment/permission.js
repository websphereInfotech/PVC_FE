// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import { Card, Checkbox, Grid } from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import createData from './permissionsection';
// import { useDispatch } from 'react-redux';
// import { getallPermissions } from 'store/thunk';

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);
//   const [permission,setPermission] = React.useState([]);
//   const dispatch = useDispatch();

//   React.useEffect(() => {
//     const permissiondata = async () => {
//       try {
//         const data = await dispatch(getallPermissions());
//         console.log(data, 'data');
//         data.forEach((data) => {
//           console.log(data,"demo data");
//           setPermission(data)
//         });
//       } catch (error) {
//         console.error('Error fetching Permissions:', error);
//       }
//     };
//     permissiondata();
//   }, [dispatch]);

//   return (
//     <React.Fragment>
//       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//         <TableCell width={'16px'}>
//           <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell>{row.name}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Grid container spacing={2}>
//                 {Object.entries(row.permissions).map(([sectionName, sectionPermissions]) => (
//                   <Grid xs={12} sm={6} key={permission.role}>
//                     <Box>
//                       <Typography variant="h5">#{sectionName}</Typography>
//                       <Table size="small" aria-label="permissions">
//                         <TableBody>
//                           {Object.entries(sectionPermissions).map(([permission]) => (
//                             <React.Fragment key={permission}>
//                               <TableRow style={{ display: 'flex' }}>
//                                 <Typography width={'230px'} sx={{ display: 'flex', alignItems: 'center' }}>
//                                   {permission}
//                                 </Typography>
//                                 <Typography>
//                                   <Checkbox />
//                                 </Typography>
//                               </TableRow>
//                             </React.Fragment>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </Box>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

// Row.propTypes = {
//   row: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     permissions: PropTypes.object.isRequired
//   }).isRequired
// };

// const rows = [
//   createData('Super Admin', 'Super Admin'),
//   createData('Admin', 'Admin'),
//   createData('Finance', 'Finance'),
//   createData('Employee', 'Employee'),
//   createData('Worker', 'Worker'),
//   createData('Others', 'Others')
// ];

// export default function CollapsibleTable() {
//   return (
//     <Card style={{ height: 'auto' }}>
//       <TableContainer style={{ padding: '20px' }}>
//         <Typography variant="h4" align="center" id="mycss">
//           Permissions
//         </Typography>
//         <Table>
//           <TableBody>
//             {rows.map((row) => (
//               <Row key={row.name} row={row} />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Card>
//   );
// }
import * as React from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Card, Grid, Checkbox } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch } from 'react-redux';
import { getallPermissions, updatePermission } from 'store/thunk';

export default function CollapsibleTable() {
  const [openRows, setOpenRows] = React.useState([]);
  const [permissions, setPermissions] = React.useState([]);
  const [selectedUserRole, setSelectedUserRole] = React.useState(null);
  const [checkbox, setCheckbox] = React.useState(true);

  const dispatch = useDispatch();

  // api call of get all permission
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(getallPermissions());
        setPermissions(data);
      } catch (error) {
        console.error('Error fetching Permissions:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  // open dropdown of row

  const toggleRow = (index, userRole) => {
    setOpenRows((prevOpenRows) => {
      const isOpen = prevOpenRows.includes(index);
      if (isOpen) {
        return prevOpenRows.filter((rowIndex) => rowIndex !== index);
      } else {
        return [...prevOpenRows, index];
      }
    });
    setSelectedUserRole(userRole);
  };
  // remove underscode and capital frist letter for show permission name
  const formatPermissionName = (permissionName) => {
    const words = permissionName.split('_');
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleCheckboxChange = async (permissionId) => {
    try {
      setCheckbox((prevCheckbox) => !prevCheckbox);
      console.log(permissionId, 'permissionId');
      console.log(checkbox, 'checkbox');
      const updatedPermissions = [
        {
          id: permissionId,
          permissionValue: checkbox
        }
      ];
      console.log(updatedPermissions, 'DATA>>>>>>>>>>>>>>>>>>>>>>>');
      const data = {
        userRole: selectedUserRole,
        permissions: updatedPermissions
      };
      setCheckbox(updatedPermissions[0].permissionValue);
      console.log(data, 'data');
      const updatedata = await dispatch(updatePermission(data));
      console.log(updatedata, 'update data');
    } catch (error) {
      console.error('Error updating permissions:', error);
    }
  };
  return (
    <Card style={{ height: 'auto' }}>
      <TableContainer style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Permissions
        </Typography>
        <Table>
          <TableBody>
            {permissions?.map((permission, index) => (
              <React.Fragment key={index}>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell width={'16px'}>
                    <IconButton aria-label="expand row" size="small" onClick={() => toggleRow(index, permission.role)}>
                      {openRows.includes(index) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{permission.role}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openRows.includes(index)} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Grid container spacing={2}>
                          {permission.permissions?.map((pre, index) => (
                            <Grid
                              item
                              xs={12}
                              sm={3}
                              key={index}
                              sx={{
                                borderRight: '1px solid lightgrey',
                                borderBottom: '1px solid lightgrey',
                                borderLeft: '1px solid lightgrey',
                                borderTop: '1px solid lightgrey'
                              }}
                            >
                              <Box>
                                {/* {index} */}
                                <Typography variant="h5">{pre.resource}</Typography>
                                <Table size="small" aria-label="permissions">
                                  <TableBody>
                                    {pre.permissions?.map((p, i) => (
                                      <TableRow key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                          {formatPermissionName(p.permission)}
                                        </Typography>
                                        <Typography>
                                          <Checkbox checked={p.permissionValue === true} onClick={() => handleCheckboxChange(p.id)} />
                                        </Typography>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
