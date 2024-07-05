import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Userview } from 'store/thunk';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Userviewpage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});

  //called api for view data
  useEffect(() => {
    dispatch(Userview(id))
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching User data:', error);
      });
  }, [dispatch, id, navigate]);

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        User View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">User</Typography>
          <Typography variant="subtitle2">{data?.username}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Mobile No.</Typography>
          <Typography variant="subtitle2">{data?.mobileno}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle2">{data?.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Role</Typography>
          <Typography variant="subtitle2">{data?.role}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Basic Salary</Typography>
          <Typography variant="subtitle2">{data?.salary}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Duty Entry Time</Typography>
          <Typography variant="subtitle2">{data?.entryTime}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Duty Exit Time</Typography>
          <Typography variant="subtitle2">{data?.exitTime}</Typography>
        </Grid>

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/userlist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/userlist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Userviewpage;
