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
import { WorkerService } from '@/service/WorkerService';

export default function TableService() {
  const {
    data: funcionario,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await WorkerService.get(),
    queryKey: ['funcionarios'],
  });

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
              Funcionários
            </Typography>
          </Toolbar>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
              </TableRow>
            </TableHead>
            {funcionario !== undefined && (
              <TableBody>
                {funcionario?.map((row) => (
                  <TableRow
                    key={row.nome}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.nome}
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
