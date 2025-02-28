import { Delete, Edit } from '@mui/icons-material';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { deleteEmployee, fetchAllEmployee } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
  { id: 'firstName', label: 'Employee Name', align: 'center' },
  { id: 'role', label: 'Role', align: 'center' },
  { id: 'phoneNumber', label: 'Phone No.', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const EmployeeList = () => {
  const navigate = useNavigate();
  const { canCreateEmployee, canUpdateEmployee, canDeleteEmployee, canViewEmployee } = useCan();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleaddemployee = () => {
    navigate('/employeeadd');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteEmployee = async () => {
    try {
      await dispatch(deleteEmployee(selectedEmployeeId, navigate));
      console.log('selectedEmployeeId: ', selectedEmployeeId);
      setOpenConfirmation(false);
      const response = await dispatch(fetchAllEmployee());
      setEmployeeData(response);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedEmployeeId(id);
  };

  const handleUpdateEmployee = (id) => {
    navigate(`/employeeupdate/${id}`);
  };

  const handleEmployeeview = (id) => {
    navigate(`/employeeview/${id}`);
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await dispatch(fetchAllEmployee());
        setEmployeeData(response ?? []);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
        setEmployeeData([]);
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [dispatch, navigate, id]);

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Employee
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleaddemployee} disabled={!canCreateEmployee()}>
        Add Employee
      </Button>
      <TableContainer sx={{ maxHeight: 575 }}>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'description' ? (
                      row.description || '-'
                    ) : column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {/* TODO add view icon */}
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewEmployee() ? 'Blue' : 'gray',
                            color: canViewEmployee() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewEmployee() && { opacity: 1 }),
                            ...(!canViewEmployee() && { opacity: 0.5 }),
                            ...(!canViewEmployee() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleEmployeeview(row.id)}
                          disabled={!canViewEmployee()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateEmployee() ? 'green' : 'gray',
                            color: canUpdateEmployee() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateEmployee() && { opacity: 1 }),
                            ...(!canUpdateEmployee() && { opacity: 0.5 }),
                            ...(!canUpdateEmployee() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateEmployee(row.id)}
                          disabled={!canUpdateEmployee()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteEmployee() ? 'Red' : 'gray',
                            color: canDeleteEmployee() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteEmployee() && { opacity: 1 }),
                            ...(!canDeleteEmployee() && { opacity: 0.5 }),
                            ...(!canDeleteEmployee() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteEmployee()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : (
                      row[column.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={employeeData?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this employee?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDeleteEmployee} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default EmployeeList;
