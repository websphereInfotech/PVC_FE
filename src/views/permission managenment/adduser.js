import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const User = () => {
  //   const [formData, setFormData] = useState({
  //     customer: '',
  //     mobileno: '',
  //     email: '',
  //     date: '',
  //     quotation_no: '',
  //     validtill: ''
  //   });
  const isMobile = useMediaQuery('(max-width:600px)');
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const { id } = useParams();
  const roledata = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Employee', label: 'Employee' },
    { value: 'Worker', label: 'Worker' },
    { value: 'Other', label: 'Other' }
  ];
  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update User
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create User
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">User Name</Typography>
              <input placeholder="Enter Name" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Mobile No.</Typography>
              <input
                placeholder="Enter Mobile number"
                // id="mobileno"
                // value={formData.mobileno}
                // onChange={(e) => setFormData({ ...formData, mobileno: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Email</Typography>
              <input
                placeholder="Enter Email"
                // id="email"
                // value={formData.email}
                // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Role</Typography>
              <Select color="secondary" options={roledata} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Password</Typography>
              <input
                // type="password"
                placeholder="Enter Password"
                // id="date"
                // value={formData.date ? formData.date.split('T')[0] : ''}
                // onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Confirm Password</Typography>
              <input
                // type="password"
                placeholder="Enter Confirm Password"
                // id="validtill"
                // value={formData.validtill ? formData.validtill.split('T')[0] : ''}
                // onChange={(e) => setFormData({ ...formData, validtill: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Basic Salary</Typography>
              <input
                placeholder="Enter Salary"
                // id="validtill"
                // value={formData.validtill ? formData.validtill.split('T')[0] : ''}
                // onChange={(e) => setFormData({ ...formData, validtill: e.target.value })}
              />
            </Grid>
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/userlist" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button id="savebtncs">Save</button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/userlist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button
                  id="savebtncs"
                  style={{
                    marginRight: '10px'
                  }}
                >
                  Save & Next
                </button>
                <button id="savebtncs">Save</button>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </Paper>
  );
};

export default User;
