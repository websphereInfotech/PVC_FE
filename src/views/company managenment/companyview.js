import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Companyview, createCompanyBank, deleteCompanyBank, updateCompanyBank } from 'store/thunk';
import { toast } from 'react-toastify';
import useCan from 'views/permission managenment/checkpermissionvalue';

const CompanyviewPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { canCreateCompanyBank, canUpdateCompanyBank, canDeleteCompanyBank } = useCan();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [bankdata, setBankdata] = useState({
    accountname: '',
    bankname: '',
    accountnumber: '',
    ifsccode: '',
    branch: ''
  });

  const handleInputChange = (field, value) => {
    setBankdata({ ...bankdata, [field]: value });
  };

  const handleClickOpen = () => {
    setSelectedBank(null);
    setBankdata({
      accountname: '',
      bankname: '',
      accountnumber: '',
      ifsccode: '',
      branch: ''
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(Companyview(id))
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching Company data:', error);
      });
  }, [dispatch, id]);

  const handleEdit = (id) => {
    const bank = data.comapnyBank[id];
    setSelectedBank(bank.id);
    setBankdata(bank);
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      const bankdetails = {
        companyId: data.id,
        ...bankdata
      };
      if (selectedBank) {
        await dispatch(updateCompanyBank(selectedBank, bankdetails));
        window.location.reload();
      } else {
        const response = await dispatch(createCompanyBank(bankdetails, navigate));
        toast.success(response.data.message, {
          icon: <img src={require('../../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000,
          onClose: () => {
            navigate('/companylist');
          }
        });
      }
    } catch (error) {
      console.error('Error updating or creating bank details:', error);
    }
  };
  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteBank = async () => {
    try {
      await dispatch(deleteCompanyBank(selectedId));
      setOpenConfirmation(false);
    } catch (error) {
      console.error('Error deleting bank details:', error);
    }
  };
  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Company View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Company Name</Typography>
          <Typography variant="subtitle2">{data?.companyname}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle2">{data?.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Mobile No.</Typography>
          <Typography variant="subtitle2">{data?.mobileno}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Address 1</Typography>
          <Typography variant="subtitle2">{data?.address1}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Address 2</Typography>
          <Typography variant="subtitle2">{data?.address2}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">GST No.</Typography>
          <Typography variant="subtitle2">{data?.gstnumber}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Pincode</Typography>
          <Typography variant="subtitle2">{data?.pincode}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">State</Typography>
          <Typography variant="subtitle2">{data?.state}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">City</Typography>
          <Typography variant="subtitle2">{data?.city}</Typography>
        </Grid>
        <Grid item container style={{ display: 'flex', justifyContent: 'end', justifyItems: 'center' }}>
          <button id="buttoncs" style={{ width: '150px' }} onClick={handleClickOpen} disabled={!canCreateCompanyBank()}>
            Add Bank Details
          </button>
        </Grid>
        {data?.comapnyBank && data.comapnyBank.length > 0 && (
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Account Name</TableCell>
                    <TableCell>Bank Name</TableCell>
                    <TableCell>Account Number</TableCell>
                    <TableCell>IFSC Code</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.comapnyBank.map((bank, index) => (
                    <TableRow key={index}>
                      <TableCell>{bank.accountname}</TableCell>
                      <TableCell>{bank.bankname}</TableCell>
                      <TableCell>{bank.accountnumber}</TableCell>
                      <TableCell>{bank.ifsccode}</TableCell>
                      <TableCell>{bank.branch}</TableCell>
                      <TableCell>
                        <Button variant="outlined" color="secondary" onClick={() => handleEdit(index)} disabled={!canUpdateCompanyBank()}>
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDeleteConfirmation(bank.id)}
                          variant="outlined"
                          color="secondary"
                          disabled={!canDeleteCompanyBank()}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedBank ? 'Edit' : 'Add'} Bank Details</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Account Name:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  id="accountname"
                  placeholder="Account Name"
                  onChange={(e) => handleInputChange('accountname', e.target.value)}
                  value={bankdata.accountname}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  IFSC Code:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  placeholder="IFSC Code"
                  id="ifsccode"
                  onChange={(e) => handleInputChange('ifsccode', e.target.value)}
                  value={bankdata.ifsccode}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Branch:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  placeholder="Branch"
                  id="branch"
                  onChange={(e) => handleInputChange('branch', e.target.value)}
                  value={bankdata.branch}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Bank Name:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  placeholder="Bank Name"
                  id="bankname"
                  onChange={(e) => handleInputChange('bankname', e.target.value)}
                  value={bankdata.bankname}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Account Number:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  placeholder="Account Number"
                  id="accountnumber"
                  onChange={(e) => handleInputChange('accountnumber', e.target.value)}
                  value={bankdata.accountnumber}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} id="savebtncs" variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSave} id="savebtncs" variant="outlined">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>Are you sure you want to delete this Bank?</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
              Cancel
            </Button>
            <Button onClick={handleDeleteBank} color="secondary" variant="contained">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'space-between' }}>
          <Link to="/companylist" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="secondary" id="savebtncs">
              Cancel
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CompanyviewPage;
