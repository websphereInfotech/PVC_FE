import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { Breakdownview, createbreackdown, fetchAllMachine, updateBreakdown } from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const Breakdownmaintenanceadd = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [machine, setMachine] = useState([]);
  const [machinename, setmachinename] = useState('');
  const { id } = useParams();
  const [formData, setFormData] = useState({
    machineId: '',
    description: null,
    performed: '',
    cost: '',
    date: new Date(),
    reason: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllMachine());
        if (Array.isArray(response)) {
          const options = response.map((machine) => ({ value: machine.id, label: machine.name }));
          setMachine([...options]);
        }
      } catch (error) {
        console.error('Error fetching machine:', error);
      }
    };
    const viewData = async () => {
      try {
        if (id) {
          const response = await dispatch(Breakdownview(id));
          const { machineId, performed, description, cost, date, reason, machineBreakdownMaintenance } = response;
          setFormData({ machineId, performed, description, cost, reason, date });
          setmachinename(machineBreakdownMaintenance.name);
        }
      } catch (error) {
        console.error('Error fetching machine:', error);
      }
    };
    viewData();
    fetchData();
  }, [dispatch, id]);

  const handlecreateMachinedetails = async () => {
    try {
      if (id) {
        await dispatch(updateBreakdown(id, formData, navigate));
      } else {
        await dispatch(createbreackdown(formData, navigate));
      }
    } catch (error) {
      console.error('Error creating Breackdown data:', error);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };
  const handleSelectChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      machineId: selectedOption.value
    }));
    setmachinename(selectedOption.label);
  };
  const handledateChange = (date) => {
    setFormData({ ...formData, date: date });
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
                Machine Id : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={machine}
                value={{ value: formData.machineId, label: machinename }}
                onChange={handleSelectChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.date}
                onChange={(date) => handledateChange(date)}
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
                id="performed"
                value={formData.performed}
                onChange={(e) => handleInputChange('performed', e.target.value)}
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