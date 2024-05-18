// import React, { useState, useEffect } from 'react';
// import {
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
//   Card,
//   TablePagination,
//   TableHead,
//   TableContainer,
//   Drawer,
//   IconButton
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { useDispatch } from 'react-redux';
// import { getallPaymentCash } from 'store/thunk';

// const columns = [
//   { id: 'paymentdate', label: 'From Date', align: 'center', minWidth: 100 },
//   { id: 'paymentdate', label: 'To Date', align: 'center', minWidth: 100 },
//   { id: 'voucherno', label: 'Vendor', align: 'center', minWidth: 100 },
//   { id: 'go', label: 'Go', align: 'center', minWidth: 100 }
// ];

// const detailColumns = [
//   { id: 'date', label: 'Date', align: 'center', minWidth: 100 },
//   { id: 'description', label: 'Description', align: 'center', minWidth: 100 },
//   { id: 'credit', label: 'Credit', align: 'center', minWidth: 100 },
//   { id: 'debit', label: 'Debit', align: 'center', minWidth: 100 },
//   { id: 'total', label: 'Total', align: 'center', minWidth: 100 }
// ];

// const Ledgerlist = () => {
//   const [payments, setPayments] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getallPaymentCash())
//       .then((data) => {
//         setPayments(data.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching payment data:', error);
//       });
//   }, [dispatch]);

//   const handleViewPayment = (payment) => {
//     setSelectedPayment(payment);
//     setDrawerOpen(true);
//   };

//   const handleCloseDrawer = () => {
//     setDrawerOpen(false);
//     setSelectedPayment(null);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Card style={{ width: '100%', padding: '25px' }}>
//       <Typography variant="h4" align="center" id="mycss">
//         Ledger List
//       </Typography>
//       <TableContainer>
//         <Table style={{ border: '1px solid lightgrey' }}>
//           <TableHead sx={{ backgroundColor: 'lightgrey', color: 'white' }}>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {payments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment) => (
//               <TableRow key={payment.id}>
//                 {columns.map((column) => (
//                   <TableCell key={column.id} align={column.align}>
//                     {column.id === 'go' ? (
//                       <Button variant="outlined" color="secondary" onClick={() => handleViewPayment(payment)}>
//                         Go
//                       </Button>
//                     ) : column.id === 'paymentdate' ? (
//                       new Date(payment[column.id]).toLocaleDateString()
//                     ) : (
//                       payment[column.id]
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={payments?.length || 0}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//       <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer} PaperProps={{ style: { width: '80%' } }}>
//         <div style={{ padding: '20px' }}>
//           <IconButton onClick={handleCloseDrawer} style={{ position: 'absolute', right: 12, top: 5 }}>
//             <CloseIcon />
//           </IconButton>
//           <Typography
//             variant="h5"
//             align="center"
//             style={{ margin: '20px 0px', backgroundColor: '#425466', color: 'white', padding: '10px 0px' }}
//           >
//             Payment Details
//           </Typography>
//           {selectedPayment && (
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     {detailColumns.map((column) => (
//                       <TableCell key={column.id} align={column.align}>
//                         {column.label}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell align="center">{new Date(selectedPayment.paymentdate).toLocaleDateString()}</TableCell>
//                     <TableCell align="center">{selectedPayment.description}</TableCell>
//                     <TableCell align="center">{selectedPayment.credit}</TableCell>
//                     <TableCell align="center">{selectedPayment.debit}</TableCell>
//                     <TableCell align="center">{selectedPayment.total}</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </div>
//       </Drawer>
//     </Card>
//   );
// };

// export default Ledgerlist;
import React, { useState, useEffect } from 'react';
import {
  Typography,
  // Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TablePagination,
  TableHead,
  TableContainer,
  Dialog,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { getallPaymentCash } from 'store/thunk';

const columns = [
  { id: 'paymentdate', label: 'From Date', align: 'center', minWidth: 100 },
  { id: 'paymentdate', label: 'To Date', align: 'center', minWidth: 100 },
  { id: 'voucherno', label: 'Vendor', align: 'center', minWidth: 100 },
  { id: 'voucherno', label: 'Credit', align: 'center', minWidth: 100 },
  { id: 'voucherno', label: 'Debit', align: 'center', minWidth: 100 },
  { id: 'voucherno', label: 'Balance', align: 'center', minWidth: 100 }
  // { id: 'go', label: 'Go', align: 'center', minWidth: 100 }
];

const detailColumns = [
  { id: 'date', label: 'Date', align: 'center', minWidth: 100 },
  { id: 'description', label: 'Description', align: 'center', minWidth: 100 },
  { id: 'credit', label: 'Credit', align: 'center', minWidth: 100 },
  { id: 'debit', label: 'Debit', align: 'center', minWidth: 100 },
  { id: 'total', label: 'Total', align: 'center', minWidth: 100 }
];

const Ledgerlist = () => {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog
  const [selectedPayment, setSelectedPayment] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallPaymentCash())
      .then((data) => {
        setPayments(data.data);
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error);
      });
  }, [dispatch]);

  // const handleViewPayment = (payment) => {
  //   setSelectedPayment(payment);
  //   setDialogOpen(true); // Open the dialog
  // };

  const handleCloseDialog = () => {
    setDialogOpen(false); // Close the dialog
    setSelectedPayment(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Ledger List
      </Typography>
      <TableContainer>
        <Table style={{ border: '1px solid lightgrey' }}>
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
            {payments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment) => (
              <TableRow key={payment.id}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'paymentdate' ? new Date(payment[column.id]).toLocaleDateString() : payment[column.id]}
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
        count={payments?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* Dialog Component */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="lg"
        PaperProps={{
          style: {
            width: '90%',
            maxWidth: '90%',
            margin: 0
          }
        }}
      >
        <div style={{ padding: '20px', width: '100%' }}>
          <IconButton onClick={handleCloseDialog} style={{ position: 'absolute', right: 12, top: 5 }}>
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            align="center"
            style={{ margin: '20px 0px', backgroundColor: '#425466', color: 'white', padding: '10px 0px' }}
          >
            Payment Details
          </Typography>
          {selectedPayment && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {detailColumns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{new Date(selectedPayment.paymentdate).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{selectedPayment.description}</TableCell>
                    <TableCell align="center">{selectedPayment.credit}</TableCell>
                    <TableCell align="center">{selectedPayment.debit}</TableCell>
                    <TableCell align="center">{selectedPayment.total}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </Dialog>
    </Card>
  );
};

export default Ledgerlist;
