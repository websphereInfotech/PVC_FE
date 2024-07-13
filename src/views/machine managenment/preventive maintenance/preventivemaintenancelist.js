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
import { deletePreventive, fetchAllpreventiveMaintenance, Preventiveview } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Edit, Delete } from '@mui/icons-material';

const columns = [
  { id: 'name', label: 'Machine Name', align: 'center' },
  { id: 'nextDate', label: 'Next Date', align: 'center' },
  { id: 'lastDate', label: 'Last Date', align: 'center' },
  { id: 'cost', label: 'Cost', align: 'center' },
  { id: 'performed', label: 'Performed By ', align: 'center' },
  { id: 'description', label: 'Description', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const PreventivemaintenanceList = () => {
  const navigate = useNavigate();
  const [preventiveData, setPreventiveData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { canDeletePreventive, canUpdatePreventive, canCreatePreventive } = useCan();

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await dispatch(fetchAllpreventiveMaintenance());
        setPreventiveData(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching Preventive data:', error);
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
    navigate('/preventivemaintenanceadd');
  };
  const handleUpdate = (id) => {
    dispatch(Preventiveview(id));
    navigate(`/preventivemaintenanceupdate/${id}`);
  };
  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };
  const handleDelete = async () => {
    try {
      await dispatch(deletePreventive(selectedId));
      setOpenConfirmation(false);
      const response = await dispatch(fetchAllpreventiveMaintenance());
      setPreventiveData(response);
    } catch (error) {
      console.error('Error deleting preventive:', error);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Preventive Maintenance
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleaddmachine} disabled={!canCreatePreventive()}>
        Add Preventive Maintenance
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
            {preventiveData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'description' ? (
                      row.description || '-'
                    ) : column.id === 'name' ? (
                      row.machinePreventiveMaintenance.name
                    ) : column.id === 'lastDate' ? (
                      new Date(row.lastDate).toLocaleDateString('en-GB')
                    ) : column.id === 'nextDate' ? (
                      new Date(row.nextDate).toLocaleDateString('en-GB')
                    ) : column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdatePreventive() ? 'green' : 'gray',
                            color: canUpdatePreventive() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdatePreventive() && { opacity: 1 }),
                            ...(!canUpdatePreventive() && { opacity: 0.5 }),
                            ...(!canUpdatePreventive() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdate(row.id)}
                          disabled={!canUpdatePreventive()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeletePreventive() ? 'Red' : 'gray',
                            color: canDeletePreventive() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeletePreventive() && { opacity: 1 }),
                            ...(!canDeletePreventive() && { opacity: 0.5 }),
                            ...(!canDeletePreventive() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeletePreventive()}
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
        count={preventiveData.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this preventive?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDelete} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PreventivemaintenanceList;
