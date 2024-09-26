import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TableContainer,
  TableHead,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Menu,
  MenuItem
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import {
  SalesInvoiceExcel,
  SalesInvoicePDF,
  SalesInvoiceSingleExcel,
  SalesInvoiceview,
  deleteSalesinvoice,
  getallSalesInvoice
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { BiSolidFilePdf } from 'react-icons/bi';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { MdLocalPrintshop } from 'react-icons/md';
import { toast } from 'react-toastify';

const columns = [
  { id: 'invoiceno', label: 'Invoice No', align: 'center' },
  { id: 'party', label: 'Party', align: 'center' },
  { id: 'invoicedate', label: 'Date', align: 'center' },
  { id: 'createdBy', label: 'Created By', align: 'center' },
  { id: 'updatedBy', label: 'Updated By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Salesinvoicelist = () => {
  const { canUpdateSalesinvoice, canViewalesinvoice, canDeleteSalesinvoice, canCreateSalesinvoice } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [salesinvoice, setsalesinvoice] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const [openLedgerDialog, setOpenLedgerDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenLedgerDialog = () => {
    setOpenLedgerDialog(true);
  };

  const handleCloseLedgerDialog = () => {
    setOpenLedgerDialog(false);
  };

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoiceId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoiceId(null);
  };

  useEffect(() => {
    const fetchSalesinvoice = async () => {
      try {
        const data = await dispatch(getallSalesInvoice());
        data.data.sort((a, b) => {
          const aNum = parseInt(a.invoiceno);
          const bNum = parseInt(b.invoiceno);
          return aNum - bNum;
        });
        setsalesinvoice(data.data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching sales invoice:', error);
      }
    };

    fetchSalesinvoice();
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddSalesinvoice = () => {
    navigate('/salesinvoice');
  };

  const handleUpdateSalesInvoice = (id) => {
    dispatch(SalesInvoiceview(id));
    navigate(`/salesinvoice/${id}`);
  };

  const handleViewsalesinvoice = (id) => {
    dispatch(SalesInvoiceview(id));
    navigate(`/salesinvoiceview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteSalesInvoice = async () => {
    try {
      await dispatch(deleteSalesinvoice(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(getallSalesInvoice());
      setsalesinvoice(data);
    } catch (error) {
      console.error('Error deleting sales invoice:', error);
    }
  };

  const handleformDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFormDate(formattedDate);
  };

  const handletoDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setToDate(formattedDate);
  };

  const handledownloadexcel = (formDate, toDate) => {
    dispatch(SalesInvoiceExcel(formDate, toDate));
    setFormDate(formDate);
    setToDate(toDate);
  };

  const handledownloadpdf = async (id) => {
    await dispatch(SalesInvoicePDF(id, navigate, true));
  };

  const handlePrint = async (id) => {
    const base64Data = await dispatch(SalesInvoicePDF(id, navigate, false));
    if (!base64Data) {
      toast.error('Unable to retrieve PDF for printing');
      return;
    }
    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    const printWindow = window.open(blobUrl);
    if (!printWindow || printWindow.closed || typeof printWindow.closed === 'undefined') {
      toast.error('Print window blocked by browser. Please enable popups for this site.');
      return;
    }
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
        URL.revokeObjectURL(blobUrl);
      };
    };
  };

  const handledownloadsingleexcel = async (id) => {
    await dispatch(SalesInvoiceSingleExcel(id, navigate));
  };

  return (
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Sales Invoice List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleAddSalesinvoice}
          disabled={!canCreateSalesinvoice()}
        >
          Create Sales Invoice
        </Button>
        <Button variant="contained" color="secondary" style={{ margin: '10px' }} onClick={handleOpenLedgerDialog}>
          Download Excel
        </Button>
      </div>
      <TableContainer sx={{ maxHeight: 700 }}>
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
            {salesinvoice?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewalesinvoice() ? 'Blue' : 'gray',
                            color: canViewalesinvoice() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewalesinvoice() && { opacity: 1 }),
                            ...(!canViewalesinvoice() && { opacity: 0.5 }),
                            ...(!canViewalesinvoice() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewsalesinvoice(row.id)}
                          disabled={!canViewalesinvoice()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateSalesinvoice() ? 'green' : 'gray',
                            color: canUpdateSalesinvoice() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateSalesinvoice() && { opacity: 1 }),
                            ...(!canUpdateSalesinvoice() && { opacity: 0.5 }),
                            ...(!canUpdateSalesinvoice() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateSalesInvoice(row.id)}
                          disabled={!canUpdateSalesinvoice()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteSalesinvoice() ? 'red' : 'gray',
                            color: canDeleteSalesinvoice() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteSalesinvoice() && { opacity: 1 }),
                            ...(!canDeleteSalesinvoice() && { opacity: 0.5 }),
                            ...(!canDeleteSalesinvoice() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteSalesinvoice()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton sizeSmall style={{ color: 'gray' }} onClick={(event) => handleMenuClick(event, row.id)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={openMenu && selectedInvoiceId === row.id} onClose={handleMenuClose}>
                          <MenuItem onClick={() => handledownloadpdf(row.id)}>
                            <BiSolidFilePdf style={{ marginRight: '8px' }} /> PDF
                          </MenuItem>
                          <MenuItem onClick={() => handledownloadsingleexcel(row.id)}>
                            <PiMicrosoftExcelLogoFill style={{ marginRight: '8px' }} /> Excel
                          </MenuItem>
                          <MenuItem onClick={() => handlePrint(row.id)}>
                            <MdLocalPrintshop style={{ marginRight: '8px' }} /> Print
                          </MenuItem>
                        </Menu>
                      </div>
                    ) : column.id === 'invoicedate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.accountSaleInv.accountName
                    ) : column.id === 'updatedBy' ? (
                      row.updateUser?.username
                    ) : column.id === 'createdBy' ? (
                      row.createUser?.username
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
        count={salesinvoice.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this sales invoice?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteSalesInvoice} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openLedgerDialog} onClose={handleCloseLedgerDialog}>
        <DialogTitle>Download Sales Invoices</DialogTitle>
        <DialogContent>
          <Typography>Select Date Range:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DatePicker selected={formDate} onChange={handleformDateChange} dateFormat="dd-MM-yyyy" />
            </Grid>
            <Grid item xs={12}>
              <DatePicker selected={toDate} onChange={handletoDateChange} dateFormat="dd-MM-yyyy" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLedgerDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handledownloadexcel(formDate, toDate)} color="secondary">
            Download Excel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Salesinvoicelist;
