'use client';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import theme from '@/theme';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import InputMask from 'react-input-mask';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {
  Alert,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import ErrorIcon from '@mui/icons-material/Error';
import { useState } from 'react';
import { Cliente, clientSchema } from '@/zod/clientSchema';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/hooks/useAlert';

const processValue = (value: string): string => {
  return value.replace(/[^\d,]/g, '');
};

export default function Services() {
  const { alert, showAlert } = useAlert();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setValue,
  } = useForm<Cliente>({
    resolver: zodResolver(clientSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Cliente> = async (data) => {
    const processedData = {
      ...data,
      telefone: data?.telefone ? processValue(data?.telefone) : '',
    };
    try {
      const response = await axios.post('/api/client/create', processedData);
      if (response.status === 201) {
        showAlert('success', 'Usuário criado com sucesso');
        setTimeout(() => router.push('/'), 3000);
      } else {
        showAlert('error', 'Falha ao criar Usuário');
      }
    } catch (error) {
      console.error('Post user fail', error);
      showAlert('error', 'Falha ao criar Usuário');
    } finally {
      reset();
      setValue('telefone', '');
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
          Criar conta
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
          <Controller
            name="telefone"
            control={control}
            render={({ field }) => (
              <InputMask mask="(99) 99999-9999" maskChar="" {...field}>
                {/* @ts-ignore */}
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    margin="normal"
                    fullWidth
                    label="Telefone"
                    type="text"
                    error={!!errors.telefone}
                    helperText={errors.telefone?.message}
                  />
                )}
              </InputMask>
            )}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            autoFocus
          />
          {/* <TextField
            margin="normal"
            required
            fullWidth
            id="senha"
            label="Senha"
            {...register('senha')}
            error={!!errors.senha}
            helperText={errors.senha?.message}
            autoFocus
          /> */}
          <FormControl
            sx={{ mt: 2 }}
            variant="outlined"
            error={!!errors.senha}
            fullWidth
            required
          >
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <Controller
              name="senha"
              control={control}
              defaultValue=""
              rules={{ required: 'Senha é obrigatória' }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
              )}
            />
            {errors.senha && (
              <FormHelperText>{errors.senha.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            sx={{ mt: 3 }}
            variant="outlined"
            error={!!errors.confirmarSenha}
            fullWidth
            required
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirmar senha
            </InputLabel>
            <Controller
              name="confirmarSenha"
              control={control}
              defaultValue=""
              rules={{ required: 'Senha é obrigatória' }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirmar senha"
                />
              )}
            />
            {errors.confirmarSenha && (
              <FormHelperText>{errors.confirmarSenha.message}</FormHelperText>
            )}
          </FormControl>

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
