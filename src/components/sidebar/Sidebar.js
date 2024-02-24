import styled from '@emotion/styled';
import { Box, Card, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Drawer as MuiDrawer, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import SidebarProfile from './Profile';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

const Drawer = styled(MuiDrawer)`
    border-right: 0;
    > div {
        border-right: 0;
    }
`;

const Sidebar = ({ items, isBotsScreen, ...rest }) => {
    const navigate = useNavigate();
    const state = useSelector(store => store.pyramidStore);
    const { pathname } = useLocation();
    const currentPath = pathname.split('/')[1];
    const theme = useTheme();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: '16vw',
                height: '100%',
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: '16vw',
                    boxSizing: 'border-box',
                    background: theme.palette.primary.main,
                },
                background: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.main,
            }}
            direction={'column'}
        >
            <Grid mt={2} paddingX={2}>
                <Grid display={'flex'} alignItems={'center'} gap={2}>
                    <Grid>
                        <img src={state.loginData.logo_url} style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
                    </Grid>
                    <Grid style={{ fontSize: '1rem', color: 'white' }}>
                        {state.loginData.registry_name}
                        <br />
                        Communication ERP
                    </Grid>
                </Grid>
            </Grid>
            <Grid flex={1} overflow={'auto'} mt={3}>
                <Divider orientation="horizontal" variant="middle" sx={{ backgroundColor: 'white' }} />
                {/* <Grid flex={1} overflow={'auto'}> */}
                <List className="mt-1" sx={{padding:"8px"}}>
                    {items.map((item, index) => (
                        <>
                            <Card
                                className="mb-2"
                                style={{
                                    boxShadow: 'none',
                                    fontWeight: 600,
                                    backgroundColor: item.route === currentPath ? '#8b87ff' : '#706bf9',
                                    color: item.route === currentPath ? 'white' : '#fff',
                                    borderRadius: item.route === currentPath ? '15px' : 'none',
                                    // margin: item.route === currentPath ? '8px' : 'none',
                                }}
                                key={index}
                            >
                                <ListItem
                                    // selected={item.route === currentPath}
                                    className="mt-2 mb-2"
                                    key={item.name}
                                    disablePadding
                                    onClick={() => {
                                        navigate(`${item.route}`);
                                    }}
                                >
                                    <ListItemButton
                                    // style={{ backgroundColor: "red" }}
                                    >
                                        <item.icon />

                                        <ListItemText className="ml-2" primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            </Card>
                        </>
                    ))}
                </List>
                {/* </Grid> */}
            </Grid>

            <Grid>
                <SidebarProfile />
            </Grid>
        </Drawer>
    );
};

export default Sidebar;
