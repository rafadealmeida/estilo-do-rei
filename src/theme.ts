'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#427cde',
    },
    secondary: {
      main: '#c7074b',
    },
    error: {
      main: '#FF8077',
    },
    success: {
      main: '#56C435',
    },
    info: {
      main: '#8093FC',
    },
    warning: {
      main: '#FFA100',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
};
export const theme = createTheme(themeOptions);

export default theme;
