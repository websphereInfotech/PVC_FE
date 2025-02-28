import { Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import AnchorShiftDrawer from './anchoreShiftDrawer';
import { createEmployee, Employeeview, fetchAllShift, updateEmployee } from 'store/thunk';

const EmployeeAdd = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dob: '',
    panNumber: '',
    aadharNumber: '',
    shiftId: '',
    role: '',
    salaryPerDay: '',
    hireDate: '',
    sickLeaves: '',
    casualLeaves: ''
  });
  const [shiftOptions, setShiftOptions] = useState([]);
  const [shiftname, setShiftname] = useState('');
  const [isShiftDrawerOpen, setIsShiftDrawerOpen] = useState(false);

  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleFormDateChange = (fieldName, date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFormData({ ...formData, [fieldName]: formattedDate });
  };

  const handlecreateEmployeedetails = async () => {
    try {
      if (id) {
        await dispatch(updateEmployee(id, formData, navigate));
      } else {
        await dispatch(createEmployee(formData, navigate));
      }
    } catch (error) {
      console.error('Error creating employee data:', error);
    }
  };

  const handleShiftSelect = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Shift') {
      setIsShiftDrawerOpen(true);
    } else {
      setShiftname(selectedOption.label);
      setFormData({
        ...formData,
        shiftId: selectedOption.value
      });
      setIsShiftDrawerOpen(false);
    }
  };

  const handelNewShiftAdd = (shift) => {
    const shiftOptionsList = [
      ...shiftOptions,
      {
        value: shift.id,
        label: shift.shiftName
      }
    ];
    setShiftOptions(shiftOptionsList);
    setIsShiftDrawerOpen(false);
  };

  useEffect(() => {
    setShiftOptions([{ value: 'new', label: 'Create New Shift' }]);
    const fetchData = async () => {
      try {
        const shiftResponse = await dispatch(fetchAllShift());
        if (Array.isArray(shiftResponse)) {
          const options = shiftResponse.map((shift) => ({
            value: shift.id,
            label: shift.shiftName
          }));
          setShiftOptions([{ value: 'new', label: 'Create New Shift' }, ...options]);
          if (!canCreateShiftvalue) {
            setShiftOptions(options);
          }
        } else {
          console.error('fetchAllShiftsCash returned an unexpected response:', shiftResponse);
        }
      } catch (error) {
        console.error('Error fetching shifts:', error);
      }
    };
    fetchData();
    const viewData = async () => {
      try {
        if (id) {
          const response = await dispatch(Employeeview(id));
          // const { firstName, lastName, email, phoneNumber, address, dob, panNumber, aadharNumber, shiftId, role, salaryPerDay, hireDate, leaveBalance } = response;
          console.log(response, 'response');
          setShiftname( response.shift.shiftName);
          setFormData({ ...response, shiftId: response.shift.id });
          console.log('{ ...response, shiftId: response.shift.id }: ', { ...response, shiftId: response.shift.id });
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };
    viewData();
  }, [dispatch, id]);

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Employee
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Add Employee
          </Typography>
        )}

        <Grid container spacing={2} style={{ marginBottom: '16px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              First Name : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="Enter First name"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Last Name : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="Enter Last name"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Email : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="Enter Email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Phone Number : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="Enter Phone Number"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Address : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="Enter Address"
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Date of Birth: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <DatePicker
              selected={formData.dob}
              onChange={(e) => handleFormDateChange('dob', e)}
              dateFormat="dd/MM/yyyy"
              isClearable={false}
              showPopperArrow={false}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              PAN No : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="Enter PAN No"
              id="panNo"
              value={formData.panNumber}
              onChange={(e) => handleInputChange('panNumber', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Aadhar No : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="Enter Aadhar No"
              id="aadharNo"
              value={formData.aadharNumber}
              onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Shift : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              color="secondary"
              onChange={(selectedOption) => handleShiftSelect(selectedOption)}
              options={shiftOptions}
              value={{ value: formData.shiftId, label: shiftname }}
            />
            <AnchorShiftDrawer open={isShiftDrawerOpen} onClose={() => setIsShiftDrawerOpen(false)} onNewShiftAdded={handelNewShiftAdd} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Role : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter Role" id="role" value={formData.role} onChange={(e) => handleInputChange('role', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Salary Per Day : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="Enter Salary Per Day"
              id="salaryPerDay"
              value={formData.salaryPerDay}
              onChange={(e) => handleInputChange('salaryPerDay', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Hire Date: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <DatePicker
              selected={formData.hireDate}
              onChange={(e) => handleFormDateChange('hireDate', e)}
              dateFormat="dd/MM/yyyy"
              isClearable={false}
              showPopperArrow={false}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Sick Leaves Balance : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="Enter Leave Balance"
              id="sickLeaves"
              value={formData.sickLeaves}
              onChange={(e) => handleInputChange('sickLeaves', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Casual Leaves Balance : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="Enter Leave Balance"
              id="casualLeaves"
              value={formData.casualLeaves}
              onChange={(e) => handleInputChange('casualLeaves', e.target.value)}
            />
          </Grid>
        </Grid>
        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Link style={{ textDecoration: 'none' }}>
                <button to="/employeelist" id="savebtncs">
                  Cancel
                </button>
              </Link>
              <button id="savebtncs" onClick={handlecreateEmployeedetails}>
                Save
              </button>
            </div>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
            <div>
              <Link to="/employeelist" style={{ textDecoration: 'none' }}>
                <button id="savebtncs">Cancel</button>
              </Link>
            </div>
            <div style={{ display: 'flex' }}>
              <button id="savebtncs" onClick={handlecreateEmployeedetails}>
                Save
              </button>
            </div>
          </Grid>
        )}
      </div>
    </Paper>
  );
};

export default EmployeeAdd;
