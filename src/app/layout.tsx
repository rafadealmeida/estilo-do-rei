import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import theme from '../theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Page } from '@/components/Page';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Estilo do Rei',
  description: 'Estilo da alta sociedade',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Page>{children}</Page>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}