import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Card } from '@mui/material';

const AddUserForm = () => {
  // State variables to hold form data
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here, such as sending data to an API
    console.log('Form submitted:', { name, role, salary });
    // Reset form fields
    setName('');
    setRole('');
    setSalary('');
  };

  return (
    <Container>
      <Card style={{ padding: '40px' }}>
        {/* <CardContent> */}
        <Typography variant="h4" align="center" id="mycss">
          Add User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Name</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={name}
                label="Name"
                color="secondary"
                onChange={(e) => setName(e.target.value)}
                InputProps={{ outline: true }} // Add this line to remove the default border
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Role</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={role}
                label="role"
                color="secondary"
                onChange={(e) => setRole(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Salary</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={salary}
                label="salary"
                color="secondary"
                onChange={(e) => setSalary(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="secondary" type="submit">
                Add User
              </Button>
            </Grid>
          </Grid>
        </form>
        {/* </CardContent> */}
      </Card>
    </Container>
  );
};

export default AddUserForm;
