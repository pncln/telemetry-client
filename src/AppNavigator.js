import React, { useContext, useEffect, useState } from 'react'
import { AuthNavigator } from './navigation/AuthNavigator';
import { Context as AuthContext } from './contexts/AuthContext';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import SigninScreen from './screens/SigninScreen';

const router = createBrowserRouter([
    {
        path: '',
        element: (
            <>Hi there</>
        )
    },
    {
        path: "/signin",
        element: <AuthNavigator />
    }
])

export const AppNavigator = () => {
    const { state: authState } = useContext(AuthContext);
    // const [ isLoading, setIsLoading] = useState(true);

    return (
        <RouterProvider router={router} />
    )
}