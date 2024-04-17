import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Card, Checkbox, Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import createData from './permissionsection';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell width={'16px'}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid container spacing={2}>
                {Object.entries(row.permissions).map(([sectionName, sectionPermissions]) => (
                  <Grid xs={12} sm={6} key={sectionName}>
                    <Box>
                      <Typography variant="h5">{sectionName}</Typography>
                      <Table size="small" aria-label="permissions">
                        <TableBody>
                          {Object.entries(sectionPermissions).map(([permission]) => (
                            <React.Fragment key={permission}>
                              <TableRow style={{ display: 'flex' }}>
                                <Typography width={'230px'} sx={{ display: 'flex', alignItems: 'center' }}>
                                  {permission}
                                </Typography>
                                <Typography>
                                  <Checkbox />
                                </Typography>
                              </TableRow>
                            </React.Fragment>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    permissions: PropTypes.object.isRequired
  }).isRequired
};

const rows = [
  createData('Super Admin', 'Super Admin'),
  createData('Admin', 'Admin'),
  createData('Finance', 'Finance'),
  createData('Employee', 'Employee'),
  createData('Worker', 'Worker'),
  createData('Others', 'Others')
];

export default function CollapsibleTable() {
  return (
    <Card style={{ height: 'auto' }}>
      <TableContainer style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Permissions
        </Typography>
        <Table>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
