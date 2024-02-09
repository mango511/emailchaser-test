'use client';
import React from 'react'
import { AuthProvider } from '@/context/AuthContext'
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/styles/theme';

type Props = {
    children: React.ReactNode
}

const AppProvider = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </AuthProvider>
        </Provider>
    )
}

export default AppProvider