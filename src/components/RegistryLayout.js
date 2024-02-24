import styled from '@emotion/styled';
import { Box, CssBaseline, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Registry_NavBarOptions } from '../utils/Registry_NavBarOptions';
import Footer from './Footer';
import SnackbarMessage from './Snackbar';
import Sidebar from './sidebar/Sidebar';
import { useTheme } from '@emotion/react';

const Root = styled.div`
    display: flex;
    min-height: 100vh;
`;

const AppContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 100%;
`;

export default function RegistryLayout({ children }) {
    const theme = useTheme();
    const state = useSelector(store => store.pyramidStore);
    return (
        <Root>
            <CssBaseline />
            <Grid container>
                <Grid item md={2}>
                    <Sidebar
                        PaperProps={{ style: { width: 100 } }}
                        variant="temporary"
                        open={false}
                        onClose={() => {}}
                        items={Registry_NavBarOptions}
                        isBotsScreen={true}
                    />
                </Grid>

                <Grid item md={10} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                    <AppContent>
                        <Grid  display={'flex'} flexDirection={'column'} justifyContent={'space-between'} height={'100%'}>
                            <Grid>
                                <Grid pt={2} pl={2}>
                                    <div style={{ fontSize: '1rem', color: theme.palette.primary.main, fontWeight: 'bold' }}>
                                        Welcome {state.loginData.email}, Registry Admin
                                    </div>
                                </Grid>
                                {/* <Grid flex={1} sx={{backgroundColor:"red"}}> */}
                                <Grid p={2} overflow={'auto'} >
                                    {children}
                                    <Outlet />
                                </Grid>
                                {/* </Grid> */}
                            </Grid>
                            {/* <Grid sx={{ justifySelf: 'end' }}>
                                <Footer />
                            </Grid> */}
                        </Grid>
                    </AppContent>
                </Grid>
            </Grid>
            <SnackbarMessage />
        </Root>
    );
}
