import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF7A59',
      light: '#FF9980',
      dark: '#E56642',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#33475B',
      light: '#516F90',
      dark: '#192C3C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F8FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#33475B',
      secondary: '#516F90',
    },
    error: {
      main: '#F2545B',
    },
    success: {
      main: '#00BDA5',
    },
    warning: {
      main: '#FFB400',
    },
    info: {
      main: '#0091AE',
    },
  },
  typography: {
    fontFamily: '"Lexend", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        sizeLarge: {
          padding: '12px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;