import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TableContainer,
  TableHead,
  TablePagination,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteRegular, fetchAllregularMaintenance, Machineview } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Edit, Delete } from '@mui/icons-material';

const columns = [
  { id: 'name', label: 'Machine Name', align: 'center' },
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'cost', label: 'Cost', align: 'center' },
  { id: 'performed', label: 'Performed By', align: 'center' },
  { id: 'description', label: 'Description', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const RegularmaintenanceList = () => {
  const navigate = useNavigate();
  const [machineData, setMachineData] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { canCreateRegular, canUpdateRegular, canDeleteRegular } = useCan();

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await dispatch(fetchAllregularMaintenance());
        console.log(response.data, 'response');
        setMachineData(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching machine data:', error);
      }
    };

    fetchSalaryData();
  }, [dispatch, navigate, id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleaddmachine = () => {
    navigate('/regularmaintenanceadd');
  };
  const handleUpdate = (id) => {
    dispatch(Machineview(id));
    navigate(`/regularmaintenanceupdate/${id}`);
  };
  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteRegularmaintenance = async () => {
    try {
      await dispatch(deleteRegular(selectedId));
      setOpenConfirmation(false);
      const response = await dispatch(fetchAllregularMaintenance());
      setMachineData(response);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Regular Maintenance List
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleaddmachine} disabled={!canCreateRegular()}>
        Add Regular Maintenance
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
            {machineData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'description' ? (
                      row.description || '-'
                    ) : column.id === 'name' ? (
                      row.machineRegularMaintenance.name
                    ) : column.id === 'date' ? (
                      new Date(row.date).toLocaleDateString('en-GB')
                    ) : column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateRegular() ? 'green' : 'gray',
                            color: canUpdateRegular() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateRegular() && { opacity: 1 }),
                            ...(!canUpdateRegular() && { opacity: 0.5 }),
                            ...(!canUpdateRegular() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdate(row.id)}
                          disabled={!canUpdateRegular()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteRegular() ? 'Red' : 'gray',
                            color: canDeleteRegular() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteRegular() && { opacity: 1 }),
                            ...(!canDeleteRegular() && { opacity: 0.5 }),
                            ...(!canDeleteRegular() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteRegular()}
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
        count={machineData?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteRegularmaintenance} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default RegularmaintenanceList;
