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
import { ClientService } from '@/service/ClientService';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';

export default function TableService() {
  const {
    data: clients,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await ClientService.get(),
    queryKey: ['clients'],
  });

  console.log('data', clients);
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
              Clientes
            </Typography>
          </Toolbar>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Telefone</TableCell>
              </TableRow>
            </TableHead>
            {clients !== undefined && (
              <TableBody>
                {clients?.map((row) => (
                  <TableRow
                    key={row.nome}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.nome}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">
                      {row.telefone.length > 0
                        ? formatPhoneNumber(row.telefone)
                        : 'Não cadastrado'}
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
