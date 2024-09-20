import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import Select from 'react-select';
import { getAllBom, viewSingleBom } from 'store/thunk';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const Employeeentry = () => {
  const [formData, setFormData] = useState({
    bomNo: 0,
    date: new Date(),
    weight: 0,
    productId: '',
    qty: 0,
    unit: '',
    shift: '',
    wastageId: '',
    wastageQty: 0
  });

  const [startTime, setstartTime] = useState('');
  const [endTime, setendTime] = useState('');

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { bomId } = useParams();

  //   const handleDateChange = (date) => {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       date: date
  //     }));
  //   };

  const shift = [
    { value: 'Day', label: 'Day' },
    { value: 'Night', label: 'Night' }
  ];
  const handleshiftChange = (selectedOption) => {
    let startTime = '';
    let endTime = '';

    if (selectedOption.value === 'Day') {
      startTime = '08:00';
      endTime = '20:00';
    } else if (selectedOption.value === 'Night') {
      startTime = '20:00';
      endTime = '08:00';
    }

    setstartTime(startTime);
    setendTime(endTime);
    setFormData({ ...formData, shift: selectedOption.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (bomId) {
        const response = await dispatch(viewSingleBom(bomId));
        const { bomNo, date, weight, bomProduct, qty, unit, shift, endTime, startTime, wastageQty, bomWastage } = response;
        setstartTime(startTime);
        setendTime(endTime);
        setFormData({ wastageId: bomWastage.id, date, bomNo, weight, qty, productId: bomProduct.id, unit, shift, wastageQty });
      }
    };

    const generateAutoDebitnoteNumber = async () => {
      if (!bomId) {
        try {
          const BomResponse = await dispatch(getAllBom());
          let nextBomNumber = 1;
          if (BomResponse.length === 0) {
            const BomNumber = nextBomNumber;
            setFormData((prevFormData) => ({
              ...prevFormData,
              bomNo: Number(BomNumber)
            }));
            return;
          }
          const existingBomNumbers = BomResponse.map((Bom) => {
            const BomNumber = Bom.bomNo;
            return parseInt(BomNumber);
          });
          const maxBomNumber = Math.max(...existingBomNumbers);
          if (!isNaN(maxBomNumber)) {
            nextBomNumber = maxBomNumber + 1;
          }

          const BomNumber = nextBomNumber;
          setFormData((prevFormData) => ({
            ...prevFormData,
            bomNo: Number(BomNumber)
          }));
        } catch (error) {
          console.error('Error generating auto Bom number:', error);
        }
      }
    };
    generateAutoDebitnoteNumber();
    fetchData();
  }, [dispatch, bomId]);

  // const handleCreateOrUpdateInvoice = async () => {
  //   try {
  //     const payload = {
  //       ...formData,
  //       startTime,
  //       endTime,
  //       items: rows.map((row) => ({
  //         id: row.id || null,
  //         productId: row.productId,
  //         qty: row.qty,
  //         unit: row.unit
  //       }))
  //     };
  //     if (bomId) {
  //       await dispatch(updateBom(bomId, payload, navigate));
  //     } else {
  //       await dispatch(createBom(payload, navigate));
  //     }
  //   } catch (error) {
  //     console.error('Error creating or updating invoice:', error);
  //   }
  // };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {bomId ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Employee
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Employee
          </Typography>
        )}
        <Grid container spacing={2} style={{ marginBottom: '16px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Employee Name :</Typography>
            <input placeholder="name" value={formData.unit}></input>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Salary : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="QTY" type="number" value={formData.wastageQty} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Company Working Day :</Typography>
            <input placeholder="day" value={formData.unit}></input>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Company Off Day :</Typography>
            <input placeholder="off day" value={formData.unit}></input>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Shift : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select options={shift} value={shift.find((option) => option.value === formData.shift)} onChange={handleshiftChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              In Time: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              type="time"
              value={startTime}
              onChange={(e) => {
                setstartTime(e.target.value);
                setFormData({ ...formData, startTime: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Out Time: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              type="time"
              value={endTime}
              onChange={(e) => {
                setendTime(e.target.value);
                setFormData({ ...formData, endTime: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Delay Time: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              type="time"
              value={endTime}
              onChange={(e) => {
                setendTime(e.target.value);
                setFormData({ ...formData, endTime: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Over Time: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              type="time"
              value={endTime}
              onChange={(e) => {
                setendTime(e.target.value);
                setFormData({ ...formData, endTime: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Total Earn : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="total earn" type="number" value={formData.wastageQty} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Advance : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="QTY" type="number" value={formData.wastageQty} />
          </Grid>
        </Grid>

        {/* {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Link to="/billofmateriallist" style={{ textDecoration: 'none' }}>
                <button id="savebtncs" style={{ marginRight: '5px' }}>
                  Cancel
                </button>
              </Link>
              <button id="savebtncs" onClick={handleCreateOrUpdateInvoice}>
                Save
              </button>
            </div>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
            <div>
              <Link to="/billofmateriallist" style={{ textDecoration: 'none' }}>
                <button id="savebtncs">Cancel</button>
              </Link>
            </div>
            <div style={{ display: 'flex' }}>
              <button id="savebtncs" onClick={handleCreateOrUpdateInvoice}>
                Save
              </button>
            </div>
          </Grid>
        )} */}
      </div>
    </Paper>
  );
};

export default Employeeentry;
