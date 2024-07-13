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
import { Breakdownview, deleteBreakdown, fetchAllbreackdownMaintenance } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Edit, Delete } from '@mui/icons-material';

const columns = [
  { id: 'name', label: 'Machine Name', align: 'center' },
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'performed', label: 'Performed By', align: 'center' },
  { id: 'reason', label: 'Reason Of Breack', align: 'center' },
  { id: 'description', label: 'Description', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const BreakdownmaintenanceList = () => {
  const navigate = useNavigate();
  const [breackdownData, setBreackdownData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { canCreateBreakdown, canUpdateBreakdown, canDeleteBreakdown } = useCan();

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await dispatch(fetchAllbreackdownMaintenance());
        setBreackdownData(response);
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
    navigate('/breakdownmaintenanceadd');
  };
  const handleUpdateUser = (id) => {
    dispatch(Breakdownview(id));
    navigate(`/breakdownmaintenanceupdate/${id}`);
  };
  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };
  const handleDeletebreackdownmaintenance = async () => {
    try {
      await dispatch(deleteBreakdown(selectedId));
      setOpenConfirmation(false);
      const response = await dispatch(fetchAllbreackdownMaintenance());
      setBreackdownData(response);
    } catch (error) {
      console.error('Error deleting breack:', error);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Breakdown Maintenance
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleaddmachine} disabled={!canCreateBreakdown()}>
        Add Breakdown Maintenance
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
            {breackdownData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'description' ? (
                      row.description || '-'
                    ) : column.id === 'name' ? (
                      row.machineBreakdownMaintenance.name
                    ) : column.id === 'date' ? (
                      new Date(row.date).toLocaleDateString('en-GB')
                    ) : column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateBreakdown() ? 'green' : 'gray',
                            color: canUpdateBreakdown() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateBreakdown() && { opacity: 1 }),
                            ...(!canUpdateBreakdown() && { opacity: 0.5 }),
                            ...(!canUpdateBreakdown() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateUser(row.id)}
                          disabled={!canUpdateBreakdown()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteBreakdown() ? 'Red' : 'gray',
                            color: canDeleteBreakdown() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteBreakdown() && { opacity: 1 }),
                            ...(!canDeleteBreakdown() && { opacity: 0.5 }),
                            ...(!canDeleteBreakdown() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteBreakdown()}
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
        count={breackdownData.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this breackdown maintenance?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeletebreackdownmaintenance} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default BreakdownmaintenanceList;
