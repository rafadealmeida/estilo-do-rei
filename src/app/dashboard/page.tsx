'use client';

import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
  useMediaQuery,
} from '@mui/material';
import theme from '@/theme';

const sessions = [
  {
    title: 'Serviços',
    cards: [
      { label: 'Adicionar Serviços', link: '/barberService/add' },
      { label: 'Visualizar Serviços', link: '/barberService/' },
    ],
  },
  {
    title: 'Clientes',
    cards: [
      // { label: 'Adicionar Cliente', link: '/barberClient/add' },
      { label: 'Visualizar Clientes', link: '/barberClient/' },
    ],
  },
  {
    title: 'Funcionários',
    cards: [
      { label: 'Adicionar Funcionário', link: '/barberWorker/add' },
      { label: 'Visualizar Funcionários', link: '/barberWorker/' },
    ],
  },
  {
    title: 'Agendamentos',
    cards: [
      { label: 'Adicionar Agendamento', link: '#' },
      { label: 'Visualizar Agendamentos', link: '#' },
    ],
  },
];

export default function Dashboard() {
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1200, padding: isDesktop ? 0 : 2 }}>
        {sessions.map((session, index) => (
          <Box key={index} sx={{ marginBottom: 4 }}>
            <Typography variant="h4" gutterBottom>
              {session.title}
            </Typography>
            <Grid
              container
              spacing={2}
              direction={isDesktop ? 'row' : 'column'}
            >
              {session.cards.map((card, cardIndex) => (
                <Grid item xs={12} sm={6} key={cardIndex}>
                  <Link
                    href={card.link}
                    underline="none"
                    sx={{ width: '100%' }}
                  >
                    <Container
                      component="div"
                      style={{
                        backgroundColor: ` ${theme.palette.background.paper}`,
                        borderRadius: 20,
                        border: `2px solid ${theme.palette.text.disabled}`,
                        padding: '16px 32px',
                        marginBottom: 16,
                        width: '100%',
                        textAlign: 'center',
                        textDecoration: 'none',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                        color: 'inherit',
                      }}
                    >
                      <CssBaseline />
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          minHeight: '150px',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          component="h1"
                          variant="h5"
                          color={theme.palette.text.primary}
                        >
                          {card.label}
                        </Typography>
                      </Box>
                    </Container>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
