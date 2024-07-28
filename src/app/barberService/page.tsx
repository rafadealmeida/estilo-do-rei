'use client';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Skeleton, Toolbar, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { BarberService } from '@/service/BarberService';
import { formatCurrency } from '@/utils/formatCurrency';

export default function TableService() {
  const {
    data: service,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await BarberService.get(),
    queryKey: ['services'],
  });

  console.log('data', service);
  return (
    <>
      {isLoading && (
        <Skeleton variant="rectangular" width={1200} height={160} />
      )}

      {!isLoading && (
        <TableContainer component={Paper} sx={{ maxWidth: 1200 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Serviços
            </Typography>
          </Toolbar>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome do Serviço</TableCell>
                <TableCell align="right">Valor</TableCell>
              </TableRow>
            </TableHead>
            {service !== undefined && (
              <TableBody>
                {service?.map((row) => (
                  <TableRow
                    key={row.nome}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.nome}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(row.valor)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}

      {isError && (
        <Alert sx={{ marginTop: 4 }} severity="error">
          Ocorreu um erro ao buscar os serviços
        </Alert>
      )}
    </>
  );
}
