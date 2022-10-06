import React, { useEffect, useContext, useState } from 'react';
import SigninScreen from '../screens/SigninScreen';
import { useNavigate } from 'react-router-dom';
import { Context as AuthContext } from '../contexts/AuthContext';

export const AuthNavigator = () => {
    const { state: authState } = useContext(AuthContext);
    const [ error, setError ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleNotLoggedIn = async (e) => {
            if (authState.isLogged) {
                try {
                    setError('');
                    navigate('/');
                } catch (error) {
                    console.log(error);
                }
            }
        };

        handleNotLoggedIn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SigninScreen />
    )
}