import React, { useEffect, useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Grid, IconButton, InputAdornment, Snackbar, Stack, TextField, Typography, createStyles } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAppList, setLoginData } from '../store/pyramidSlice';
import axiosInstance from '../utils/AxiosInstance';
import { isValidToken, setSession } from '../utils/jwt';
import { useTheme } from '@emotion/react';
import { showSnackbar } from '../store/snackbarSlice';
import { AxiosError } from 'axios';
import SnackbarMessage from './Snackbar';

export default function Login() {
    const navigate = useNavigate();

    const state = useSelector(store => store.pyramidStore);
    const dispatch = useDispatch();

    const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });

    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();

    const handleDetails = event => {
        const { name, value } = event.target;

        switch (name) {
            case 'email':
                setLoginDetails({ ...loginDetails, email: value });
                break;

            case 'password':
                setLoginDetails({ ...loginDetails, password: value });
                break;

            default:
                break;
        }
    };

    const handleLoginOnClick = async () => {
        try {
            if (loginDetails.email === '') {
                dispatch(showSnackbar({ open: true, severity: 'error', message: 'Please Enter Your Email!!' }));
                return;
            }

            if (loginDetails.password === '') {
                dispatch(showSnackbar({ open: true, severity: 'error', message: 'Please Enter Your Password!!' }));
                return;
            }

            const response = await axiosInstance.post(`/login`, loginDetails);
            switch (response.status) {
                case 200: {
                    if (response.data.status === 'SUCCESS') {
                        dispatch(
                            setLoginData({
                                email: response.data.data.registryDetails.email,
                                domain_name: response.data.data.registryDetails._doc.domain_name,
                                logo_url: response.data.data.registryDetails._doc.logo_url,
                                registry_name: response.data.data.registryDetails._doc.registry_name,
                            }),
                        );
                        dispatch(setAppList(response.data.data.registryDetails._doc.app_list));
                        setSession(response.data.data.tokenData.token);
                        dispatch(showSnackbar({ open: true, severity: 'success', message: 'User Logged In Successfully!!' }));

                        navigate('/organization');
                    } else {
                        dispatch(
                            showSnackbar({
                                open: true,
                                severity: 'error',
                                message: response.data.data ? response.data.data.reason : 'Server Not Reachable!!',
                            }),
                        );

                        // dispatch(showSnackbar({ open: true, severity: 'error', message: response.data.reason }));
                    }
                    break;
                }
                case 500: {
                    dispatch(showSnackbar({ open: true, severity: 'error', message: response.data.reason }));

                    break;
                }
                default: {
                    dispatch(showSnackbar({ open: true, severity: 'error', message: 'Incorrect Server Response!!' }));
                    break;
                }
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error);
                dispatch(
                    showSnackbar({
                        open: true,
                        severity: 'error',
                        message: error.response
                            ? error.response.data
                                ? error.response.data.reason
                                : error.response.statusText
                            : 'Server not reachable',
                    }),
                );
            }
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    useEffect(() => {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken && isValidToken(accessToken)) {
            navigate('/Organization');
        }
    }, []);
    return (
        <Grid container>
            <Grid item md={3} style={{ backgroundColor: `${theme.palette.primary.main}` }}>
                <Grid style={{ height: '100vh', display: 'flex', flexDirection: 'column', gap: '100px' }}>
                    <Grid
                        style={{ display: 'flex', gap: '20px', fontSize: '20px', marginTop: '20px' }}
                        display={'flex'}
                        justifyContent={'center'}
                        paddingX={2}
                        alignItems={'center'}
                        overflow={'hidden'}
                    >
                        <img
                            src={process.env.REACT_APP_REGISTRY_LOGO_URL}
                            style={{ objectFit: 'cover', width: '80px', height: '80px', borderRadius: '50%' }}
                            alt={process.env.REACT_APP_REGISTRY_NAME}
                        />
                        <Grid style={{ fontSize: '1.5rem', color: 'white' }} className="d-flex">
                            {process.env.REACT_APP_REGISTRY_NAME ?? 'name'}
                            <br />
                            Communication ERP
                        </Grid>
                    </Grid>

                    <Grid className="d-flex" style={{ justifySelf: 'flex-start' }}>
                        <Card
                            style={{
                                height: 'auto',
                                width: '100%',
                                padding: '20px',
                                boxShadow: 'none',
                                borderRadius: '18px',
                                backgroundColor: 'transparent',
                            }}
                        >
                            <Grid className="text-center m-1 d-flex" style={{ fontSize: '22px', color: '#1e3a8a' }}>
                                <Grid
                                    className="text-center"
                                    style={{ margin: 'auto', width: '100%', padding: '4px', color: 'white', fontSize: '1.5rem' }}
                                >
                                    Registry Admin Login
                                </Grid>
                            </Grid>

                            <Grid className="text-center" style={{ margin: 'auto', width: '100%', padding: '4px' }}>
                                <Stack spacing={3}>
                                    <Grid className="mt-4">
                                        <TextField
                                            fullWidth
                                            label="Username"
                                            name="email"
                                            size="medium"
                                            onChange={handleDetails}
                                            style={{ color: 'white !important' }}
                                            sx={{
                                                input: {
                                                    'input:-webkit-autofill:active ': {},
                                                    '-webkit-box-shadow': '0 0 0 30px #706bf9 inset !important',
                                                    '-webkit-text-fill-color': 'white',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '&>fieldset': { borderColor: '#fff' },
                                                    '&:hover fieldset': { borderColor: '#fff' },
                                                    '&:focus fieldset': {
                                                        borderColor: '#fff',
                                                        backgroundColor: `${theme.palette.primary.main}`,
                                                    },
                                                },
                                            }}
                                            InputLabelProps={{ style: { color: '#fff' } }}
                                            inputProps={{ autoComplete: 'new-password', form: { autoComplete: 'off' } }}
                                        />
                                    </Grid>

                                    <TextField
                                        className="mb-3"
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        style={{ color: 'white !important' }}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        sx={{
                                            input: {
                                                'input:-webkit-autofill:active ': {},
                                                '-webkit-box-shadow': '0 0 0 30px #706bf9 inset !important',
                                                '-webkit-text-fill-color': 'white',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '&>fieldset': { borderColor: '#fff' },
                                                '&:hover fieldset': { borderColor: '#fff' },
                                                '&:focus fieldset': {
                                                    borderColor: '#fff',
                                                    backgroundColor: `${theme.palette.primary.main}`,
                                                },
                                            },
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        style={{ fontSize: '20px', color: 'white' }}
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            autoComplete: 'new-password',
                                            form: {
                                                autoComplete: 'off',
                                            },
                                        }}
                                        onChange={handleDetails}
                                    />
                                </Stack>

                                <Grid className="mt-4">
                                    <Button
                                        fullWidth
                                        style={{
                                            height: '28%',
                                            backgroundColor: 'white',
                                            color: `${theme.palette.primary.main}`,
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                        }}
                                        variant="contained"
                                        className="mb-3"
                                        onClick={handleLoginOnClick}
                                    >
                                        LOG IN
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={9} style={{ textAlign: 'center' }}>
                <img src="welcome.png" />
            </Grid>
            <SnackbarMessage />
        </Grid>
    );
}
