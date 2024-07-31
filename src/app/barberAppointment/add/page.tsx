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
import {
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { useEffect } from 'react';
import { Agendamento, agendamentoSchema } from '@/zod/agendamentoSchema';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/hooks/useAlert';
import { useQuery } from '@tanstack/react-query';
import { ClientService } from '@/service/ClientService';
import { BarberService } from '@/service/BarberService';
import { WorkerService } from '@/service/WorkerService';
import dayjs from 'dayjs';

export default function AgendamentoForm() {
  const { alert, showAlert } = useAlert();
  // const [value, setValue] = useState<Dayjs | null>(dayjs());
  const {
    data: clients,
    isLoading: isLoadingClients,
    isError: isErrorClients,
  } = useQuery({
    queryFn: async () => await ClientService.get(),
    queryKey: ['clients'],
  });
  const {
    data: services,
    isLoading: isLoadingServices,
    isError: isErrorServices,
  } = useQuery({
    queryFn: async () => await BarberService.get(),
    queryKey: ['services'],
  });

  const {
    data: funcionarios,
    isLoading: isLoadingFuncionarios,
    isError: isErrorFuncionarios,
  } = useQuery({
    queryFn: async () => await WorkerService.get(),
    queryKey: ['funcionarios'],
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setValue: setFormValue,
  } = useForm<Agendamento>({
    resolver: zodResolver(agendamentoSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    const now = dayjs();
    setFormValue('data', now.format('YYYY-MM-DD'));
    setFormValue('horario', now.format('HH:mm'));
  }, [setFormValue]);

  const combineDateAndTime = (date: string, time: string) => {
    return `${date}T${time}:00`;
  };

  const onSubmit: SubmitHandler<Agendamento> = async (data) => {
    const combinedDateTime = combineDateAndTime(data.data, data.horario);
    const formattedData = {
      ...data,
      data: dayjs(data.data).format('YYYY-MM-DD'),
      horario: combinedDateTime,
    };

    try {
      const response = await axios.post(
        '/api/appointment/create',
        formattedData,
      );
      if (response.status === 201) {
        showAlert('success', 'Agendamento criado com sucesso');
        reset({
          data: formattedData.data,
          horario: formattedData.horario,
        });
      } else {
        showAlert('error', 'Falha ao criar agendamento');
      }
    } catch (error) {
      console.error('Post agendamento fail', error);
      showAlert('error', 'Falha ao criar agendamento');
    }
  };

  if (isLoadingClients || isLoadingServices || isLoadingFuncionarios) {
    return <div>Loading...</div>;
  }

  if (isErrorClients || isErrorServices || isErrorFuncionarios) {
    return <div>Error loading data</div>;
  }

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
          Agendamento de Serviço
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <FormControl
            margin="normal"
            required
            fullWidth
            error={!!errors.fk_cliente_id}
          >
            <InputLabel id="cliente-label">Cliente</InputLabel>
            <Controller
              name="fk_cliente_id"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Select
                  labelId="cliente-label"
                  id="fk_cliente_id"
                  {...field}
                  label="Cliente"
                  onChange={(e) => {
                    console.log('Cliente selecionado:', e.target.value);
                    field.onChange(e);
                  }}
                  value={field.value}
                >
                  {clients?.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.nome}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.fk_cliente_id && (
              <FormHelperText>{errors.fk_cliente_id.message}</FormHelperText>
            )}
          </FormControl>

          {/*
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="dataHora"
              control={control}
              render={({ field }) => (
                <MobileDateTimePicker
                  {...field}
                  value={dayjs(field.value)}
                  onChange={(newValue) => {
                    setValue(newValue);
                    setFormValue('data', newValue?.format('YYYY-MM-DD'));
                    setFormValue('horario', newValue?.format('HH:mm'));
                  }}
                  label="Data e Hora do Agendamento"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      required
                      fullWidth
                      error={!!errors.dataHora}
                      helperText={errors.dataHora?.message}
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider> */}

          <TextField
            margin="normal"
            required
            fullWidth
            id="data"
            label="Data do Agendamento"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            {...register('data')}
            error={!!errors.data}
            helperText={errors.data?.message}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="horario"
            label="Hora do Agendamento"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            {...register('horario')}
            error={!!errors.horario}
            helperText={errors.horario?.message}
          />

          <FormControl
            margin="normal"
            required
            fullWidth
            error={!!errors.fk_servico_id}
          >
            <InputLabel id="servico-label">Serviço</InputLabel>
            <Controller
              name="fk_servico_id"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Select
                  labelId="servico-label"
                  id="fk_servico_id"
                  {...field}
                  label="Serviço"
                >
                  {services?.map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.nome}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.fk_servico_id && (
              <FormHelperText>{errors.fk_servico_id.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            margin="normal"
            required
            fullWidth
            error={!!errors.fk_funcionario_id}
          >
            <InputLabel id="funcionario-label">Funcionário</InputLabel>
            <Controller
              name="fk_funcionario_id"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Select
                  labelId="funcionario-label"
                  id="fk_funcionario_id"
                  {...field}
                  label="Funcionário"
                >
                  {funcionarios?.map((funcionario) => (
                    <MenuItem key={funcionario.id} value={funcionario.id}>
                      {funcionario.nome}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.fk_funcionario_id && (
              <FormHelperText>
                {errors.fk_funcionario_id.message}
              </FormHelperText>
            )}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Agendar
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
