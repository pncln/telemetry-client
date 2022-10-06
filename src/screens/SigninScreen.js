import React from 'react';
import { Box, Card, Container } from '@mui/material'

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
}

const SigninScreen = () => {
    return (
        <Container width="sm" style={styles}>
            <Box>
                <Card variant="outlined" style={{ padding: "15px"}}>Test</Card>
            </Box>
        </Container>
            
    );
}

export default SigninScreen;
