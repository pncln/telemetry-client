import {
    createTheme,
    responsiveFontSizes
  } from '@mui/material/styles';
  
  const font = "'Rubik', sans-serif";
  
  let theme = createTheme({
    palette: {
      primary: { main: '#1d2031' },
      secondary: { main: '#dc0250' },
      error: { main: '#6E353A' },
      warning: { main: '#F5EE9E' },
      info: { main: '#568BFF' },
      success: { main: '#00B389' },
      background: { default: '#FDFFFC' }
    },
    breakpoints: {
      values: { xs: 600, sm: 800, md: 1000, lg: 1200, xl: 1536, }
    },
    typography: {
      fontFamily: font,
      h1: { fontSize: 69 },
      h2: { fontSize: 57 },
      h3: { fontSize: 48 },
      h4: { fontSize: 40 },
      h5: { fontSize: 33 },
      h6: { fontSize: 28 },
      subtitle1: { fontSize: 23 },
      subtitle2: { fontSize: 19 },
      body1: { fontSize: 19 },
      body2: { fontSize: 16 }
    }
  });
  
  theme = responsiveFontSizes(theme);
  
  export default theme;
  