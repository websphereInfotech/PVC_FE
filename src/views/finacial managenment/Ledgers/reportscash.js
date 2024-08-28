import React, { useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import Ledgeraccountcashreport from 'component/reports/financial cash report/ledgercashreport';
import Cashdaybookreport from 'component/reports/financial cash report/cashdaybook';
import useCan from 'views/permission managenment/checkpermissionvalue';

const Reportcash = () => {
  const [openLedgerDialog, setOpenLedgerDialog] = useState(false);
  const [opendaybookLedgerDialog, setOpendaybookLedgerDialog] = useState(false);
  const { canseeaccountcashledger, canseedaybookcashledger } = useCan();

  const handleOpenLedgerDialog = () => {
    setOpenLedgerDialog(true);
  };

  const handleCloseLedgerDialog = () => {
    setOpenLedgerDialog(false);
  };

  const handleOpenLDayBookedgerDialog = () => {
    setOpendaybookLedgerDialog(true);
  };

  const handleCloseDayBookLedgerDialog = () => {
    setOpendaybookLedgerDialog(false);
  };
  return (
    <div>
      <Card variant="outlined" style={{ padding: '30px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Cash Reports
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ borderBottom: '0.2px solid grey' }}>
                <Typography variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartIcon sx={{ fontSize: '30px', marginRight: '10px' }} />
                  General Report
                </Typography>
              </CardContent>
              <CardContent sx={{ height: '230px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '0' } }}>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Sales Summary
                </Typography>

                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Sales Register
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Sales Return Summary
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Sales Return Item Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Purchase Summary
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Purchase Register
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Expense Summary
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Unbilled Challan
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '2px' }}>
                  Item Rate Card
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ borderBottom: '0.2px solid grey' }}>
                <Typography variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartIcon sx={{ fontSize: '30px', marginRight: '10px' }} />
                  Financial Report
                </Typography>
              </CardContent>
              <CardContent sx={{ height: '230px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '0' } }}>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Trial Balance
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Balance Sheet
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Profit and Lost Report
                </Typography>
                {canseeaccountcashledger() && (
                  <>
                    <Typography
                      variant="body1"
                      sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}
                      onClick={handleOpenLedgerDialog}
                      style={{ cursor: 'pointer' }}
                    >
                      Ledger Report
                    </Typography>
                    {openLedgerDialog && <Ledgeraccountcashreport Open={handleOpenLedgerDialog} onClose={handleCloseLedgerDialog} />}
                  </>
                )}
                {canseedaybookcashledger() && (
                  <>
                    <Typography
                      variant="body1"
                      sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}
                      onClick={handleOpenLDayBookedgerDialog}
                      style={{ cursor: 'pointer' }}
                    >
                      Daybook Reports
                    </Typography>
                    {opendaybookLedgerDialog && (
                      <Cashdaybookreport Open={handleOpenLDayBookedgerDialog} onClose={handleCloseDayBookLedgerDialog} />
                    )}
                  </>
                )}

                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Cashbook Report
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ borderBottom: '0.2px solid grey' }}>
                <Typography variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartIcon sx={{ fontSize: '30px', marginRight: '10px' }} />
                  Receivable Report
                </Typography>
              </CardContent>
              <CardContent sx={{ height: '230px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '0' } }}>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Invoice Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Customer Wise Receivable
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Customer and Invoice Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Customer Outstanding
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Accont Receivable Aging Detail Report
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Payment Receivable
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '2px' }}>
                  Customer Wise Pending Invoice Report
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Second Row */}
          <Grid item xs={12} sm={8} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ borderBottom: '0.2px solid grey' }}>
                <Typography variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartIcon sx={{ fontSize: '30px', marginRight: '10px' }} />
                  Payable Report
                </Typography>
              </CardContent>
              <CardContent sx={{ height: '230px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '0' } }}>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Bill Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Vendor Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Vendor Wise Total Payable
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Bill and Vendor Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Vendor Outstanding
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '2px' }}>
                  Purchase Payment Report
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ borderBottom: '0.2px solid grey' }}>
                <Typography variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartIcon sx={{ fontSize: '30px', marginRight: '10px' }} />
                  Item Report
                </Typography>
              </CardContent>
              <CardContent sx={{ height: '230px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '0' } }}>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Stoke Summary (Inventory Report)
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Stoke Valuation Report
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Item Sales Summary (Item Wise Sales)
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Low Stoke Summary
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Stoke Register
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Item Report Customer Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Item Report Vendor Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Betch Wise Stoke
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Item Costing Analyze Report
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Adjusted Costing Report
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Item Report Date and Customer Wise
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '2px' }}>
                  Item Report Date and Vendor Wise
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ borderBottom: '0.2px solid grey' }}>
                <Typography variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartIcon sx={{ fontSize: '30px', marginRight: '10px' }} />
                  Statutory Report
                </Typography>
              </CardContent>
              <CardContent sx={{ height: '230px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '0' } }}>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  TDS Report
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '2px' }}>
                  TCS Report
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Reportcash;
