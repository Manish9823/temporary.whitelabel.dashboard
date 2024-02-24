import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    Snackbar,
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogContentText,
    Divider,
    DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Save } from '@mui/icons-material';
import { showSnackbar } from '../store/snackbarSlice';
import { useTheme } from '@emotion/react';

export default function AddOrganizationModal({ open, handleClose, onCreateOrganization }) {
    const state = useSelector(store => store.pyramidStore);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();

    const [createOrgDetails, setCreateOrgDetails] = useState({
        userDetails: {
            email: '',
            phone: '',
            password: '',
        },
        otherDetails: {
            organization_name: '',
            app_list: state.loginData.appList,
            linked_tech_support_users: {},
        },
    });

    const handleDetails = event => {
        const { name, value } = event.target;

        switch (name) {
            case 'organization_name':
                setCreateOrgDetails({ ...createOrgDetails, otherDetails: { ...createOrgDetails.otherDetails, [name]: value } });
                break;

            case 'email':
                setCreateOrgDetails({ ...createOrgDetails, userDetails: { ...createOrgDetails.userDetails, [name]: value } });
                break;

            case 'password':
                setCreateOrgDetails({ ...createOrgDetails, userDetails: { ...createOrgDetails.userDetails, [name]: value } });
                break;

            case 'phone':
                setCreateOrgDetails({ ...createOrgDetails, userDetails: { ...createOrgDetails.userDetails, [name]: value } });
                break;
            default:
                break;
        }
    };

    const onClickSubmitDetails = async () => {
        if (createOrgDetails.otherDetails.organization_name === '') {
            dispatch(showSnackbar({ open: true, severity: 'error', message: 'Please Enter Org Name!!' }));
            return;
        }

        if (createOrgDetails.userDetails.email === '') {
            dispatch(showSnackbar({ open: true, severity: 'error', message: 'Please Enter Email!!' }));
            return;
        }

        if (createOrgDetails.userDetails.phone === '') {
            dispatch(showSnackbar({ open: true, severity: 'error', message: 'Please Enter Your Phone Name!!' }));
            return;
        }
        if (createOrgDetails.userDetails.password === '') {
            dispatch(showSnackbar({ open: true, severity: 'error', message: 'Password length must contain 8 character!!' }));
            return;
        }

        await onCreateOrganization(createOrgDetails);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <Dialog open={open} PaperProps={{ style: { width: '30%' } }}>
            <DialogTitle
                variant={5}
                style={{
                    fontSize: '1.8rem',
                    color: theme.palette.primary.main,
                }}
            >
                Add New Organization
            </DialogTitle>
            <DialogContent>
                <Grid mt={2}>
                    <TextField
                        autoFocus
                        fullWidth
                        size="small"
                        label="Enter Organization Name"
                        name="organization_name"
                        onChange={handleDetails}
                    ></TextField>
                </Grid>

                <Grid mt={3}>
                    <TextField fullWidth size="small" label="Enter Email" name="email" type="email" onChange={handleDetails}></TextField>
                </Grid>

                <Grid mt={3}>
                    <TextField
                        fullWidth
                        label="Enter password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        style={{ fontSize: '18px' }}
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleDetails}
                    />
                </Grid>

                <Grid mt={3}>
                    <TextField fullWidth size="small" label="Enter phone Number" name="phone" onChange={handleDetails}></TextField>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={onClickSubmitDetails}>
                    <Save fontSize="small" />
                    &nbsp;Register
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
