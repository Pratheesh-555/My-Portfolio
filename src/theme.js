import { createTheme } from '@mui/material';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light' 
      ? {
          primary: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#1976d2',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: '#1a1a1a',
            secondary: '#666666',
          },
        }
      : {
          primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5',
          },
          background: {
            default: '#0a1929',
            paper: '#001e3c',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
          },
        }),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});
