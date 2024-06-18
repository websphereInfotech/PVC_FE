import React, { useState } from 'react';
import {
  Typography,
//   Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TableContainer,
  TableHead,
  TablePagination,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
  IconButton
} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { SalesInvoiceview, deleteSalesinvoice, getallSalesInvoice } from 'store/thunk';
// import { useDispatch } from 'react-redux';
// import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import { getallSalesInvoice } from 'store/thunk';

const columns = [
  { id: 'product', label: 'Product Name', minWidth: 100, align: 'center' },
  { id: 'hsncode', label: 'HSN Code', minWidth: 100, align: 'center' },
  { id: 'date', label: 'Date', minWidth: 100, align: 'center' },
  { id: 'stock', label: 'Stock', minWidth: 70, align: 'center' },
  { id: 'lowstock', label: 'Low Stock', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];
const initialData = [
    {
      product: 'Product A',
      hsncode: '123456',
      date: new Date().toLocaleDateString('en-GB'),
      stock: 10,
      lowstock: 5,
    },
    {
      product: 'Product B',
      hsncode: '654321',
      date: new Date().toLocaleDateString('en-GB'),
      stock: 2,
      lowstock: 1,
    },
  ];
const LowStock = () => {
    
    const [stoke, setStoke] = useState(initialData);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // const dispatch = useDispatch();
  console.log("setStoke",setStoke);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    return(
        <Card style={{ width: 'auto', padding: '20px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Low Stock List
        </Typography>
        <TableContainer sx={{ maxHeight: 700 }}>
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
              {stoke?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'action' ? (
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <IconButton
                            sizeSmall
                            style={{backgroundColor:'blue',color:'white',borderRadius: 0.8}}
                            // style={{
                            //   backgroundColor: canViewalesinvoice() ? 'Blue' : 'gray',
                            //   color: canViewalesinvoice() ? 'white' : 'white',
                            //   borderRadius: 0.8,
                            //   ...(canViewalesinvoice() && { opacity: 1 }),
                            //   ...(!canViewalesinvoice() && { opacity: 0.5 }),
                            //   ...(!canViewalesinvoice() && { backgroundColor: 'gray' })
                            // }}
                            // onClick={() => handleViewsalesinvoice(row.id)}
                            // disabled={!canViewalesinvoice()}
                          >
                            <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                          </IconButton>
                          <IconButton
                            sizeSmall
                            style={{backgroundColor:'green',color:'white',borderRadius:0.8}}
                            // style={{
                            //   backgroundColor: canUpdateSalesinvoice() ? 'green' : 'gray',
                            //   color: canUpdateSalesinvoice() ? 'white' : 'white',
                            //   borderRadius: 0.8,
                            //   ...(canUpdateSalesinvoice() && { opacity: 1 }),
                            //   ...(!canUpdateSalesinvoice() && { opacity: 0.5 }),
                            //   ...(!canUpdateSalesinvoice() && { backgroundColor: 'gray' })
                            // }}
                            // onClick={() => handleUpdateSalesInvoice(row.id)}
                            // disabled={!canUpdateSalesinvoice()}
                          >
                            <Edit style={{ fontSize: '16px' }} />
                          </IconButton>
                          <IconButton
                            sizeSmall
                            style={{backgroundColor:'red',color:'white',borderRadius:0.8}}
                            // style={{
                            //   backgroundColor: canDeleteSalesinvoice() ? 'Red' : 'gray',
                            //   color: canDeleteSalesinvoice() ? 'white' : 'white',
                            //   borderRadius: 0.8,
                            //   ...(canDeleteSalesinvoice() && { opacity: 1 }),
                            //   ...(!canDeleteSalesinvoice() && { opacity: 0.5 }),
                            //   ...(!canDeleteSalesinvoice() && { backgroundColor: 'gray' })
                            // }}
                            // onClick={() => handleDeleteConfirmation(row.id)}
                            // disabled={!canDeleteSalesinvoice()}
                          >
                            <Delete style={{ fontSize: '16px' }} />
                          </IconButton>
                        </div>
                      ) : // <Button
                      //   variant="outlined"
                      //   color="secondary"
                      //   disabled={!canViewalesinvoice()}
                      //   onClick={() => handleViewsalesinvoice(row.id)}
                      // >
                      //   View
                      // </Button>
                      //  column.id === 'edit' ? (
                      //   <Button
                      //     disabled={!canUpdateSalesinvoice()}
                      //     variant="outlined"
                      //     color="secondary"
                      //     onClick={() => handleUpdateSalesInvoice(row.id)}
                      //   >
                      //     Edit
                      //   </Button>
                      // ) : column.id === 'delete' ? (
                      //   <Button
                      //     variant="outlined"
                      //     color="secondary"
                      //     disabled={!canDeleteSalesinvoice()}
                      //     onClick={() => handleDeleteConfirmation(row.id)}
                      //   >
                      //     Delete
                      //   </Button>
                      // ) :
                      column.id === 'invoicedate' ? (
                        new Date(row[column.id]).toLocaleDateString('en-GB')
                    //   ) : column.id === 'customer' ? (
                    //     row.InvioceCustomer.accountname
                    //   ) : column.id === 'updatedBy' ? (
                    //     row.updateUser?.username
                    //   ) : column.id === 'createdBy' ? (
                    //     row.createUser?.username
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
          count={stoke?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>Are you sure you want to delete this Sale Invoice?</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
              Cancel
            </Button>
            <Button onClick={handleDeleteSalesInvoice} variant="contained" color="secondary">
              Yes
            </Button>
          </DialogActions>
        </Dialog> */}
      </Card>
    )
}

export default LowStock;