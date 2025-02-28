import {
  Card,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchBonusConfig, getPenalty, updateBonusConfig, updatePenalty } from 'store/thunk';
// import Select from 'react-select';

// const yearOptions = [
//     { value: "2024", label: "2024" },
//     { value: "2025", label: "2025" },
//     { value: "2026", label: "2026" },
// ];

const BonusConfigPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bonusData, setBonusData] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [penalty, setPenalty] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const monthMap = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12'
  };

  const handelYearChange = (value) => {
    setSelectedYear(value);
    fetchBonusConfigs(value);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...bonusData];
    updatedData[index][field] = value;
    setBonusData(updatedData);
  };

  const handleSave = async () => {
    const data = transformed(bonusData);
    updateBonusConfigs(data);
    await dispatch(updatePenalty(penalty));
  };

  const updateBonusConfigs = async (value) => {
    await dispatch(updateBonusConfig(value));
  };

  const transformed = (months) => {
    return months.flatMap(({ month, ...ranges }) => {
      const monthNumber = monthMap[month];
      const monthString = `${selectedYear}-${monthNumber}`;

      return [
        {
          month: monthString,
          minAttendance: 0,
          maxAttendance: 50,
          bonusPercentage: parseInt(ranges.range_0_50, 10)
        },
        {
          month: monthString,
          minAttendance: 51,
          maxAttendance: 70,
          bonusPercentage: parseInt(ranges.range_51_70, 10)
        },
        {
          month: monthString,
          minAttendance: 71,
          maxAttendance: 80,
          bonusPercentage: parseInt(ranges.range_71_80, 10)
        },
        {
          month: monthString,
          minAttendance: 81,
          maxAttendance: 90,
          bonusPercentage: parseInt(ranges.range_81_90, 10)
        },
        {
          month: monthString,
          minAttendance: 91,
          maxAttendance: 100,
          bonusPercentage: parseInt(ranges.range_91_100, 10)
        }
      ];
    });
  };

  const fetchBonusConfigs = async (value) => {
    try {
      const response = await dispatch(fetchBonusConfig(value));
      const data = getRange(response);
      setBonusData(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
      const data = getRange([]);
      setBonusData(data);
      console.error('Error fetching employee data:', error);
    }
  };

  const fetchPenalty = async () => {
    try {
      const response = await dispatch(getPenalty());
      setPenalty(response.value);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
      setPenalty('');
      console.error('Error fetching employee data:', error);
    }
  };

  const getRange = (data) => {
    const monthMap = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec'
    };
    const orderedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const result = orderedMonths.map((monthName) => ({
      month: monthName,
      range_0_50: '0',
      range_51_70: '0',
      range_71_80: '0',
      range_81_90: '0',
      range_91_100: '0'
    }));

    const getMonthName = (monthStr) => {
      const [, , monthNum] = monthStr.match(/(\d{4})-(\d{2})/);
      return monthMap[monthNum];
    };

    data.forEach((item) => {
      const monthName = getMonthName(item.month);
      const monthEntry = result.find((r) => r.month === monthName);

      if (monthEntry) {
        const bonusPercentage = String(item.bonusPercentage);

        if (item.minAttendance === 0 && item.maxAttendance === 50) {
          monthEntry.range_0_50 = bonusPercentage;
        } else if (item.minAttendance === 51 && item.maxAttendance === 70) {
          monthEntry.range_51_70 = bonusPercentage;
        } else if (item.minAttendance === 71 && item.maxAttendance === 80) {
          monthEntry.range_71_80 = bonusPercentage;
        } else if (item.minAttendance === 81 && item.maxAttendance === 90) {
          monthEntry.range_81_90 = bonusPercentage;
        } else if (item.minAttendance === 91 && item.maxAttendance === 100) {
          monthEntry.range_91_100 = bonusPercentage;
        }
      }
    });

    return result;
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = currentYear - 2; i <= currentYear + 2; i++) {
      yearsArray.push(i);
    }
    setYearOptions(yearsArray);
    setSelectedYear(currentYear);

    fetchBonusConfigs(currentYear);
    fetchPenalty();
  }, [navigate]);

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Bonus Configuration
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Typography variant="subtitle1">Penalty :</Typography>
        <input
          placeholder="Enter Penalty"
          id="penalty"
          value={penalty}
          onChange={(e) => setPenalty(e.target.value)}
          style={{ width: '15%' }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
            <TableRow>
              <TableCell align="center" style={{ paddingLeft: '10px ' }}>
                <Select value={selectedYear} onChange={(e) => handelYearChange(e.target.value)} style={{ color: 'white' }}>
                  {yearOptions.map((year) => (
                    <MenuItem value={year} key={year}>
                      {year}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem> */}
                </Select>
              </TableCell>
              <TableCell align="center">0-50%</TableCell>
              <TableCell align="center">51-70%</TableCell>
              <TableCell align="center">71-80%</TableCell>
              <TableCell align="center">81-90%</TableCell>
              <TableCell align="center">91-100%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bonusData.map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                <TableCell align="center">{row.month}</TableCell>
                <TableCell align="center">
                  <input value={row.range_0_50} onChange={(e) => handleInputChange(index, 'range_0_50', e.target.value)} />
                </TableCell>
                <TableCell align="center">
                  <input value={row.range_51_70} onChange={(e) => handleInputChange(index, 'range_51_70', e.target.value)} />
                </TableCell>
                <TableCell align="center">
                  <input value={row.range_71_80} onChange={(e) => handleInputChange(index, 'range_71_80', e.target.value)} />
                </TableCell>
                <TableCell align="center">
                  <input value={row.range_81_90} onChange={(e) => handleInputChange(index, 'range_81_90', e.target.value)} />
                </TableCell>
                <TableCell align="center">
                  <input value={row.range_91_100} onChange={(e) => handleInputChange(index, 'range_91_100', e.target.value)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0px' }}>
        <div style={{ display: 'flex' }}>
          <button id="savebtncs" onClick={handleSave}>
            Save
          </button>
        </div>
      </Grid>
    </Card>
  );
};

export default BonusConfigPage;
