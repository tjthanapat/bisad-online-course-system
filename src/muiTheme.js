import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

export const courseikuTheme = createTheme({
  palette: {
    primary: {
      light: '#ffc36b',
      main: '#fb923c',
      dark: '#c36303',
      contrastText: '#fff',
    },
    secondary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      contrastText: '#fff',
    },
  },
});