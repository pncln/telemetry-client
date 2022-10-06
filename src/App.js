import React from 'react';
// import HomePage from './HomePage';
import { AppNavigator } from './AppNavigator'
import { Provider as AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from '@mui/material'
import theme from './theme'
// import Dashboard from './Dashboard';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <AppNavigator />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
