import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TableHead,
  TableContainer,
  Grid,
  Paper,
  styled,
  Button,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { AccountCashExcel, AccountCashledgerImage, AccountCashPDF, fetchAllAccountCash, getallCashAccountledger } from 'store/thunk';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { IoMdMenu } from 'react-icons/io';
import { BiSolidFilePdf } from 'react-icons/bi';
import { MdLocalPrintshop } from 'react-icons/md';
import { IoImage } from 'react-icons/io5';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';

const columns = [
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'particulars', label: 'Particulars', align: 'center' },
  { id: 'vchType', label: 'Vch Type', align: 'center' },
  { id: 'vchNo', label: 'Vch No.', align: 'center' },
  { id: 'debitAmount', label: 'Debit', align: 'center' },
  { id: 'creditAmount', label: 'Credit', align: 'center' }
];

const CustomTableRow = styled(TableRow)({
  padding: '5px 0px'
});

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const Cashaccountledgerlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canaccountcashpdf, canseeaccountcashledgerexcel, canseeaccountcashledgerjpg } = useCan();
  const [AccountIdc, setAccountId] = useState(null);
  const [Account, setAccount] = useState([]);
  const [Accountname, setAccountname] = useState('');
  const [yearData, setYearData] = useState({});
  const [getdata, setGetdata] = useState({});
  const [gettodata, setGettodata] = useState({});
  const [toDatec, setToDate] = useState(new Date());
  const [formDatec, setFormDate] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const AccountId = sessionStorage.getItem('RCAccountId');
  const formData = sessionStorage.getItem('RCAccountformDate');
  const toDate = sessionStorage.getItem('RCAccounttoDate');

  useEffect(() => {
    dispatch(getallCashAccountledger(AccountId, formData, toDate))
      .then((data) => {
        if (data) {
          setYearData(data.years || {});
          setGetdata(data.form);
          setGettodata(data.to);
        } else {
          console.error('Data is undefined.');
          if (error.response.status === 401) {
            navigate('/');
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching payment ledger data:', error);
      });
  }, [dispatch, AccountId, formData, toDate, navigate]);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      setAccountId(selectedOption.value);
      setAccountname(selectedOption.label);
    }
  };

  const handleFormDateChange = (date) => {
    setFormDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllAccountCash());

        if (Array.isArray(response)) {
          const options = response.map((account) => ({
            value: account.id,
            label: account.contactPersonName
          }));
          setAccount(options);
        }
      } catch (error) {
        console.error('Error fetching ledger:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleLedger = async () => {
    const formattedFormDate = formDatec.toISOString().split('T')[0];
    const formattedToDate = toDatec.toISOString().split('T')[0];
    const data = await dispatch(getallCashAccountledger(AccountIdc, formattedFormDate, formattedToDate));
    setYearData(data.years || {});
    setGetdata(data.form);
    setGettodata(data.to);
    navigate('/cashaccountledger');
    sessionStorage.setItem('RCAccountId', AccountIdc);
    sessionStorage.setItem('RCAccountformDate', formattedFormDate);
    sessionStorage.setItem('RCAccounttoDate', formattedToDate);
  };

  const handlepdf = async () => {
    if (AccountIdc) {
      await dispatch(AccountCashPDF(AccountIdc, formDatec, toDatec, navigate));
    } else {
      await dispatch(AccountCashPDF(AccountId, formData, toDate, navigate));
    }
  };

  const handleImage = async () => {
    if (AccountIdc) {
      await dispatch(AccountCashledgerImage(AccountIdc, formDatec, toDatec, navigate));
    } else {
      await dispatch(AccountCashledgerImage(AccountId, formData, toDate, navigate));
    }
  };

  const handleExcel = async () => {
    if (AccountIdc) {
      await dispatch(AccountCashExcel(AccountIdc, formDatec, toDatec, navigate));
    } else {
      await dispatch(AccountCashExcel(AccountId, formData, toDate, navigate));
    }
  };

  const handlePrint = async () => {
    try {
      const accountIdToUse = AccountIdc ? AccountIdc : AccountId;
      const formDataToUse = AccountIdc ? formDatec : formData;
      const toDateToUse = AccountIdc ? toDatec : toDate;
      const base64Data = await dispatch(AccountCashPDF(accountIdToUse, formDataToUse, toDateToUse, navigate, false));

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
    } catch (error) {
      console.error('Error printing the PDF:', error);
      toast.error('An error occurred while trying to print the PDF');
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Grid container>
        <Grid item xs={12} md={2} sm={6}>
          <Typography variant="subtitle1">Account:</Typography>
          <Select
            options={Account}
            value={AccountIdc ? { value: AccountIdc, label: Accountname } : null}
            onChange={handleSelectChange}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              menu: (provided) => ({
                ...provided,
                zIndex: 9999,
                maxHeight: '300px',
                overflowY: 'scroll'
              })
            }}
          />
        </Grid>
        <Grid item xs={12} md={2} sm={6}>
          <Typography variant="subtitle1">From Date:</Typography>
          <DatePicker
            selected={formDatec}
            onChange={handleFormDateChange}
            dateFormat="dd/MM/yyyy"
            isClearable={false}
            showPopperArrow={false}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={2} sm={6}>
          <Typography variant="subtitle1">To Date:</Typography>
          <DatePicker
            selected={toDatec}
            onChange={handleToDateChange}
            dateFormat="dd/MM/yyyy"
            isClearable={false}
            showPopperArrow={false}
            style={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} md={2} sm={4} justifyContent={'start'} style={{ marginTop: '20px' }}>
          <Button onClick={handleLedger} variant="contained" color="secondary">
            GO
          </Button>
        </Grid>
        <Grid item style={{ marginTop: '20px' }}>
          <IconButton onClick={handleMenuOpen}>
            <IoMdMenu />
          </IconButton>
          <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
            <MenuItem onClick={handlepdf} disabled={!canaccountcashpdf()}>
              <BiSolidFilePdf style={{ marginRight: '8px' }} /> PDF
            </MenuItem>
            <MenuItem onClick={handlePrint}>
              <MdLocalPrintshop style={{ marginRight: '8px' }} /> Print
            </MenuItem>
            <MenuItem onClick={handleImage} disabled={!canseeaccountcashledgerjpg()}>
              <IoImage style={{ marginRight: '8px' }} /> JPEG Image
            </MenuItem>
            <MenuItem onClick={handleExcel} disabled={!canseeaccountcashledgerexcel()}>
              <PiMicrosoftExcelLogoFill style={{ marginRight: '8px' }} /> Excel
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h6">From:</Typography>
          <Typography variant="h4">{getdata.companyname}</Typography>
          <Typography>{getdata.address1}</Typography>
          <Typography>
            {getdata.city}, {getdata.state}, {getdata.pincode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6">To:</Typography>
          <Typography variant="h4">{gettodata.contactPersonName}</Typography>
          <Typography>{gettodata.address1}</Typography>
          <Typography>
            {gettodata.city} {gettodata.state} {gettodata.pincode}
          </Typography>
        </Grid>
      </Grid>

      {Object.entries(yearData).map(([year, data]) => (
        <React.Fragment key={year}>
          <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
            {data.dateRange}
          </Typography>
          <TableContainer component={Paper}>
            <Table style={{ border: '1px solid lightgrey' }}>
              <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
                <TableRow sx={{ padding: '5px 0px' }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(data.records, 'recoderd')}
                {Object.entries(data.records).map(([date, records]) =>
                  Array.isArray(records) ? (
                    records.map((record, idx) => (
                      <CustomTableRow key={`${date}-${idx}`}>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              color: column.id === 'creditAmount' ? '#00CE00' : column.id === 'debitAmount' ? 'red' : 'inherit'
                            }}
                          >
                            {column.id === 'creditAmount' && record[column.id] !== 0 ? record[column.id] : ''}
                            {column.id === 'debitAmount' && record[column.id] !== 0 ? record[column.id] : ''}
                            {column.id === 'date' && (idx === 0 || records[idx - 1]?.date !== record.date)
                              ? formatDate(record[column.id])
                              : ''}
                            {column.id !== 'creditAmount' && column.id !== 'debitAmount' && column.id !== 'date' && record[column.id]}
                          </TableCell>
                        ))}
                      </CustomTableRow>
                    ))
                  ) : (
                    <TableRow key={''}>
                      <TableCell colSpan={columns.length} align="center">
                        No records available
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} align="right"></TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: 'red' }}>
                      {data.totals.totalDebit.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: '#00CE00' }}>
                      {data.totals.totalCredit.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
                {data.closingBalance.type === 'credit' && (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">Closing Balance :</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center" style={{ color: '#00CE00' }}>
                      {data.closingBalance.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                )}
                {data.closingBalance.type === 'debit' && (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">Closing Balance :</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center" style={{ color: 'red' }}>
                      {data.closingBalance.amount.toFixed(2)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={4} align="right"></TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: 'red' }}>
                      {data.totalAmount.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: '#00CE00' }}>
                      {data.totalAmount.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      ))}
    </Card>
  );
};

export default Cashaccountledgerlist;
