import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableRow, TableCell, Card, IconButton } from '@mui/material';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProductionListPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [productions, setProductions] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    // Dummy production data
    const dummyProductions = [
      {
        id: 1,
        name: 'Product A',
        batchNo: 'BATCH-001',
        quantity: 10,
        weight: 20,
        certified: 'Yes'
      },
      {
        id: 2,
        name: 'Product B',
        batchNo: 'BATCH-002',
        quantity: 15,
        weight: 30,
        certified: 'No'
      }
    ];
    setProductions(dummyProductions);
    setIsLoading(false);
  }, []);

  const handleAddProduction = () => {
    // Navigate to the page to add production
    navigate('/addproduction');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Card style={{ padding: '25px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Production List
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddProduction}
          style={{ margin: '16px', alignSelf: 'flex-end', display: 'flex' }}
        >
          Add Production
        </Button>
        <Table>
          <TableRow>
            <TableCell variant="head">ID</TableCell>
            <TableCell variant="head">Name</TableCell>
            <TableCell variant="head">Batch No.</TableCell>
            <TableCell variant="head">Quantity</TableCell>
            <TableCell variant="head">Weight</TableCell>
            <TableCell variant="head">Certified</TableCell>
            <TableCell variant="head">Action</TableCell>
          </TableRow>
          <TableBody>
            {productions.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((production) => (
              <TableRow key={production.id}>
                <TableCell>{production.id}</TableCell>
                <TableCell>{production.name}</TableCell>
                <TableCell>{production.batchNo}</TableCell>
                <TableCell>{production.quantity}</TableCell>
                <TableCell>{production.weight}</TableCell>
                <TableCell>{production.certified}</TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Pagination
        count={Math.ceil(productions.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
      />
      {isLoading && <div>Loading...</div>}
    </Container>
  );
};

export default ProductionListPage;
