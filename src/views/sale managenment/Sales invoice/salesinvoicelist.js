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
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@emotion/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { SalesInvoiceExcel, SalesInvoicePDF, SalesInvoiceview, deleteSalesinvoice, getallSalesInvoice } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const columns = [
  { id: 'invoiceno', label: 'Invocie No', align: 'center' },
  { id: 'party', label: 'Party', align: 'center' },
  { id: 'invoicedate', label: 'Date.', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Salesinvoicelist = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { canUpdateSalesinvoice, canViewalesinvoice, canDownloadPdfSalesinvoice, canDeleteSalesinvoice, canCreateSalesinvoice } = useCan();
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

  const handleOpenLedgerDialog = () => {
    setOpenLedgerDialog(true);
  };

  const handleCloseLedgerDialog = () => {
    setOpenLedgerDialog(false);
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

  const handleLedger = (formDate, toDate) => {
    dispatch(SalesInvoiceExcel(formDate, toDate));
    // navigate('/daybookledger');
    setFormDate(formDate);
    // sessionStorage.setItem('RDaybookformDate', formDate);
    setToDate(toDate);
    // sessionStorage.setItem('RDaybooktoDate', toDate);
  };

  const handledownloadpdf = async (id) => {
    await dispatch(SalesInvoicePDF(id, navigate));
  };

  return (
    // <Container>
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
                            backgroundColor: canDeleteSalesinvoice() ? 'Red' : 'gray',
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
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDownloadPdfSalesinvoice() ? '#425466' : 'gray',
                            color: canDownloadPdfSalesinvoice() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDownloadPdfSalesinvoice() && { opacity: 1 }),
                            ...(!canDownloadPdfSalesinvoice() && { opacity: 0.5 }),
                            ...(!canDownloadPdfSalesinvoice() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handledownloadpdf(row.id)}
                          disabled={!canDownloadPdfSalesinvoice()}
                        >
                          <PictureAsPdfIcon style={{ fontSize: '16px' }} />
                        </IconButton>
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
        count={salesinvoice?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
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
      </Dialog>
      <Dialog
        open={openLedgerDialog}
        onClose={handleCloseLedgerDialog}
        PaperProps={{
          style: {
            height: 'auto',
            width: isMobile ? '90%' : '18%',
            margin: isMobile ? '0' : 'auto',
            maxWidth: isMobile ? '80%' : 'none'
          }
        }}
      >
        <div style={{ display: 'flex', padding: '0px 20px', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Excel Details</h3>
        </div>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">From Date:</Typography>
              <DatePicker
                selected={formDate}
                onChange={(date) => handleformDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">To Date:</Typography>
              <DatePicker
                selected={toDate}
                onChange={(date) => handletoDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>

            <Button onClick={() => handleLedger(formDate, toDate)} variant="contained" color="secondary" style={{ marginLeft: '60%' }}>
              GO
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
    // </Container>
  );
};

export default Salesinvoicelist;
