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
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import { AppointmentService } from '@/service/Appointment';

export default function TableService() {
  const {
    data: agendamentos,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await AppointmentService.get(),
    queryKey: ['agendamentos'],
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
              Agendamentos
            </Typography>
          </Toolbar>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Serviço</TableCell>
                <TableCell align="right">Cliente</TableCell>
                <TableCell align="right">Data</TableCell>
                <TableCell align="right">Hora</TableCell>
                <TableCell align="right">Telefone</TableCell>
                <TableCell align="right">Funcionário</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agendamentos !== undefined &&
                agendamentos.length > 0 &&
                agendamentos.map((row) => (
                  <TableRow
                    key={`${row.fk_funcionario_id}_${row.fk_servico_id}_${row.data}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {/* Supondo que você tenha um campo `servico` no `row`, ajuste conforme necessário */}
                      {row.servico?.nome || 'Não disponível'}
                    </TableCell>
                    <TableCell align="right">{row.cliente.nome}</TableCell>
                    <TableCell align="right">
                      {new Date(row.data).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(row.horario).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {row.cliente.telefone
                        ? formatPhoneNumber(row.cliente.telefone)
                        : 'Não cadastrado'}
                    </TableCell>
                    <TableCell align="right">{row.funcionario.nome}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
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
