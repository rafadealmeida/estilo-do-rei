'use client';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import theme from '@/theme';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IFormInput, loginSchema } from '@/zod/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import InputMask from 'react-input-mask';

import { useRouter } from 'next/navigation';
import { Servico, servicoSchema } from '@/zod/servicoSchema';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import ErrorIcon from '@mui/icons-material/Error';
import { useState } from 'react';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://www.df.senac.br/">
        Senac
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const processValue = (value: string): string => {
  return value.replace(/[^\d,]/g, '').replace(',', '.');
};

interface AlertProps {
  visible: boolean;
  status: 'success' | 'error' | '';
  message: string;
}

export default function Services() {
  const [alert, setAlert] = useState<AlertProps>({
    visible: false,
    status: '',
    message: '',
  });

  const onSubmit: SubmitHandler<Servico> = async (data) => {
    const processedData = {
      ...data,
      valor: processValue(data.valor),
    };
    console.log('processedData', processedData);
    try {
      const response = await axios.post('/api/service/create', processedData);

      if (response.status === 201) {
        setAlert({
          visible: true,
          status: 'success',
          message: 'Serviço criado com sucesso',
        });
      } else {
        setAlert({
          visible: true,
          status: 'error',
          message: 'Falha ao criar serviço',
        });
      }
    } catch (error) {
      console.error('Post service fail', error);
      setAlert({
        visible: true,
        status: 'error',
        message: 'Falha ao criar serviço',
      });
    } finally {
      setTimeout(() => setAlert({ ...alert, visible: false }), 3000);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<Servico>({
    resolver: zodResolver(servicoSchema), // Usando o schema importado
    mode: 'onChange', // Validar em cada alteração dos campos
  });
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
          Adicionar serviços
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome do serviço"
            {...register('nome')}
            error={!!errors.nome}
            helperText={errors.nome?.message}
            autoFocus
          />
          <Controller
            name="valor"
            control={control}
            render={({ field }) => (
              <InputMask mask="R$ 99,99" maskChar="" {...field}>
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    margin="normal"
                    required
                    fullWidth
                    label="Valor do serviço"
                    type="text"
                    error={!!errors.valor}
                    helperText={errors.valor?.message}
                  />
                )}
              </InputMask>
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            Adicionar Serviço
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
          severity={alert.status}
        >
          {alert.message}
        </Alert>
      )}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
