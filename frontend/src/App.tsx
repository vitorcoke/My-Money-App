/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import Home from './components/Home';
import CssBaseline from '@material-ui/core/CssBaseline'
import { createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  const [darkMode, setDarkMode] = useState(true)

  const theme = createTheme({
    palette: {
      type: darkMode ? 'light' : 'dark',
      primary: {
        main: '#05A4C2'
      }
    },

  });
  return (
    <div >
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Home setDarkMode={setDarkMode} darkMode={darkMode}/>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
