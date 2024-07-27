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
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormInput, loginSchema } from '@/zod/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { useRouter } from 'next/navigation';

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

export default function SignIn() {
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('/api/auth/login', data);

      if (response.status === 200) {
        // Redireciona para a página principal após o login bem-sucedido
        router.push('/addService');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    resolver: zodResolver(loginSchema), // Usando o schema importado
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Estilo do Rei
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            id="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            Logar
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Não tem uma conta? Clique aqui!"}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
