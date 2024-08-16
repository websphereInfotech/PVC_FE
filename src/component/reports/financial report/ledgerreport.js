import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, useMediaQuery, IconButton, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { fetchAllAccounts, getallAccountledger } from 'store/thunk';
import { useNavigate } from 'react-router';
import { useTheme } from '@emotion/react';

const Ledgeraccountreport = ({ Open, onClose }) => {
  Ledgeraccountreport.propTypes = {
    Open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  //   const [openDrawer, setOpenDrawer] = useState(false);
  const [AccountId, setAccountId] = useState(null);
  const [Account, setAccount] = useState([]);
  const [Accountname, setAccountname] = useState('');
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const handleCloseDrawer = () => {
  //     setOpenDrawer(false);
  //   };

  //   const handleLedgerClick = () => {
  //     setOpenDrawer(true);
  //   };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      setAccountId(selectedOption.value);
      setAccountname(selectedOption.label);
      //   setAccount('');
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllAccounts());

        if (Array.isArray(response)) {
          const options = response.map((account) => ({
            value: account.id,
            label: account.accountName
          }));
          setAccount(options);
        }
      } catch (error) {
        console.error('Error fetching ledger:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleLedger = (AccountId, formDate, toDate) => {
    dispatch(getallAccountledger(AccountId, formDate, toDate));
    navigate('/accountledger');
    setAccountId(AccountId);
    sessionStorage.setItem('RAccountId', AccountId);
    setFormDate(formDate);
    sessionStorage.setItem('RAccountformDate', formDate);
    setToDate(toDate);
    sessionStorage.setItem('RAccounttoDate', toDate);
  };

  return (
    <>
      <Dialog
        open={Open}
        onClose={onClose}
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
          <h3>Ledger Details</h3>
          <span>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </span>
        </div>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ paddingTop: '20px' }}>
              <Typography variant="subtitle1">Account :</Typography>
              <Select
                options={Account}
                value={{ value: AccountId, label: Accountname }}
                onChange={handleSelectChange}
                menuPortalTarget={document.body}
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                    maxHeight: '300px',
                    overflowY: 'scroll'
                  }),
                  container: (provided) => ({
                    ...provided,
                    zIndex: 9999
                  }),
                  menuPortal: (provided) => ({
                    ...provided,
                    zIndex: 9999
                  })
                }}
              />
            </Grid>
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
              <Typography variant="subtitle1">From Date:</Typography>
              <DatePicker
                selected={toDate}
                onChange={(date) => handletoDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>

            <Button
              onClick={() => handleLedger(AccountId, formDate, toDate)}
              variant="contained"
              color="secondary"
              style={{ marginLeft: '60%' }}
            >
              GO
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Ledgeraccountreport;
