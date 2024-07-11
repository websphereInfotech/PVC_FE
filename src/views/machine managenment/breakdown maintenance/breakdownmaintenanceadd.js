import React, { useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { createMachine } from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Breakdownmaintenanceadd = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    description: null,
    reportedby: '',
    cost: '',
    date: new Date(),
    reason: ''
  });

  //   useEffect(() => {
  //     const viewData = async () => {
  //       try {
  //         if (id) {
  //           const response = await dispatch(viewSingleclaimCash(id));
  //           const { amount, description, toUser, purpose } = response;
  //           console.log(response, 'response');
  //           setFormData({ amount, description, purpose, toUserId: toUser.id });

  //           setusername(toUser.username);
  //           setSelectuser(toUser.id);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching cliam:', error);
  //       }
  //     };
  //     viewData();
  //   }, [dispatch, id]);

  const handlecreateMachinedetails = async () => {
    try {
      await dispatch(createMachine(formData, navigate));
    } catch (error) {
      console.error('Error creating machine data:', error);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Breakdown Maintenance
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Add Breakdown Maintenance
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Machine Name : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Machine name"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Machine Type : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Machine Type"
                id="model"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Next Maintenance Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.date}
                onChange={(date) => handleInputChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Last Maintenance Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.date}
                onChange={(date) => handleInputChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Cost :</Typography>
              <input
                placeholder="Enter cost amount"
                id="cost"
                value={formData.cost}
                onChange={(e) => handleInputChange('cost', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Reason Of Breakdown :</Typography>
              <input
                placeholder="Enter reason"
                id="reason"
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Reported By :</Typography>
              <input
                placeholder="Enter name"
                id="reportedby"
                value={formData.reportedby}
                onChange={(e) => handleInputChange('reportedby', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">description :</Typography>
              <input
                placeholder="Enter description"
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </Grid>
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
                <button id="savebtncs" onClick={handlecreateMachinedetails}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handlecreateMachinedetails}>
                  Save
                </button>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </Paper>
  );
};

export default Breakdownmaintenanceadd;
