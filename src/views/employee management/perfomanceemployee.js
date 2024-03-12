import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Divider } from '@mui/material';

const PerformanceManagementPage = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" style={{ margin: '20px' }}>
        Performance Management
      </Typography>
      <Grid container spacing={3}>
        {/* Metrics */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Total Employees
              </Typography>
              <Divider />
              <Typography variant="h4" align="center">
                100
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Average Performance Rating
              </Typography>
              <Divider />
              <Typography variant="h4" align="center">
                4.2
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Top Performers
              </Typography>
              <Divider />
              <Typography variant="h4" align="center">
                20
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Bottom Performers
              </Typography>
              <Divider />
              <Typography variant="h4" align="center">
                5
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Performance Trends */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                Performance Trends
              </Typography>
              {/* Add performance trend chart or graph */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PerformanceManagementPage;
