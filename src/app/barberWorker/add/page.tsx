'use client';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import theme from '@/theme';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import ErrorIcon from '@mui/icons-material/Error';
import { useAlert } from '@/hooks/useAlert';
import { Worker, workerSchema } from '@/zod/worker';

const processValue = (value: string): string => {
  return value.replace(/[^\d,]/g, '');
};

export default function Services() {
  const { alert, showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Worker>({
    resolver: zodResolver(workerSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Worker> = async (data) => {
    try {
      const response = await axios.post('/api/worker/create', data);
      if (response.status === 201) {
        showAlert('success', 'Funcionário criado com sucesso');
      } else {
        showAlert('error', 'Falha ao criar Funcionário');
      }
      reset();
    } catch (error) {
      console.error('Post user fail', error);
      showAlert('error', 'Falha ao criar Funcionário');
    }
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        borderRadius: 20,
        border: `2px solid ${theme.palette.text.disabled}`,
        padding: '16px 32px',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Cadastrar Funcinário
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome"
            {...register('nome')}
            error={!!errors.nome}
            helperText={errors.nome?.message}
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            Registrar
          </Button>
        </Box>
      </Box>
      {alert.visible && (
        <Alert
          icon={
            alert.status === 'success' ? (
              <CheckIcon fontSize="inherit" />
            ) : (
              <ErrorIcon fontSize="inherit" />
            )
          }
          // @ts-ignore
          severity={alert.status}
        >
          {alert.message}
        </Alert>
      )}
    </Container>
  );
}
