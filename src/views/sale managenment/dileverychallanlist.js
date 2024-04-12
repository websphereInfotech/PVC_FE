import React, { useState, useEffect } from 'react';
import {
  // Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TableContainer,
  TableHead,
  TablePagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Deliverychallanview, getallDeliverychallan } from 'store/thunk';
import { useDispatch } from 'react-redux';

const columns = [
  { id: 'date', label: 'Date', minWidth: 170, align: 'center' },
  { id: 'challanno', label: 'Challan No', minWidth: 170 },
  { id: 'mobileno', label: 'Mobile No.', minWidth: 170, align: 'center' },
  { id: 'customer', label: 'Customer', minWidth: 170, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 100 }
];

const DileveryChallanList = () => {
  const navigate = useNavigate();
  const [deliverychallan, setdeliverychallan] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDeliverychallan = async () => {
      try {
        const data = await dispatch(getallDeliverychallan());
        // console.log(data.data);
        setdeliverychallan(data.data);
      } catch (error) {
        console.error('Error fetching delivery challan:', error);
      }
    };

    fetchDeliverychallan();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddDeliverychallan = () => {
    navigate('/deliverychallan');
  };

  const handleViewDeliverychallan = (id) => {
    dispatch(Deliverychallanview(id));
    navigate(`/deliverychallanview/${id}`);
  };

  return (
    // <Container>
    <Card style={{ padding: '25px', width: '100%' }}>
      <Typography variant="h4" align="center" id="mycss">
        Dilevery Challan List
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleAddDeliverychallan}>
        Create Delivery Challan
      </Button>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table style={{ borderLeft: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'lightgrey', color: 'white' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {deliverychallan?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <Button variant="outlined" color="secondary" onClick={() => handleViewDeliverychallan(order.id)}>
                        View
                      </Button>
                    ) : column.id === 'date' ? (
                      new Date(order[column.id]).toLocaleDateString()
                    ) : (
                      order[column.id]
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
        count={deliverychallan?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
    // </Container>
  );
};

export default DileveryChallanList;
