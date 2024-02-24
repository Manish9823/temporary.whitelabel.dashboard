import styled from '@emotion/styled';
import { Add } from '@mui/icons-material';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddOrganizationModal from '../../modal/AddOrganizationModal';
import { setAllOrganization } from '../../store/pyramidSlice';
import axiosInstance from '../../utils/AxiosInstance';
import ErrorModal from '../../modal/ErrorModal';
import axios, { AxiosError } from 'axios';
import { showSnackbar } from '../../store/snackbarSlice';
import { useTheme } from '@emotion/react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 16,
        fontWeight: 600,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        padding: '10px !important',
        width: '100vw',
    },
    [`&.${tableCellClasses.body}`]: {
        padding: '10px !important',
        fontSize: 14,
    },
    [`&.${tableCellClasses.head.tr}`]: {
        backgroundColor: '#79E0EE',
        width: '45vw',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
export default function AddOrganization() {
    const state = useSelector(store => store.pyramidStore);
    const snackbarState = useSelector(store => store.snackbarStore);
    const theme = useTheme();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        //fractionalSecondDigits: 0,
    });

    function convertUTCDateToLocalDate(date) {
        var newDate = new Date(date);

        return formatter.format(newDate);
    }

    const [addOrgModal, setAddOrgModal] = useState(false);

    const onCloseOrgCreationModal = () => {
        setAddOrgModal(false);
    };

    const getAllOrg = async () => {
        try {
            const response = await axiosInstance.get(`/organization/get-org-admin`);
            switch (response.status) {
                case 200:
                    if (response.data.status === 'SUCCESS') {
                        dispatch(setAllOrganization(response.data.data));
                    } else {
                        dispatch(
                            showSnackbar({
                                open: true,
                                severity: 'error',
                                message: response.data.data ? response.data.data.reason : 'Server Not Reachable!!',
                            }),
                        );
                    }
                    break;

                case 500:
                    dispatch(showSnackbar({ open: true, severity: 'error', message: response.data.reason }));

                    break;

                default: {
                    dispatch(showSnackbar({ open: true, severity: 'error', message: 'Incorrect Server Response!!' }));
                    break;
                }
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(
                    showSnackbar({
                        open: true,
                        severity: 'error',
                        message: error.response.data ? error.response.data.reason : error.response.statusText,
                    }),
                );
            }
        }
    };

    useEffect(() => {
        getAllOrg();
    }, []);
    const handleOnClick = () => {
        setAddOrgModal(true);
    };

    const onCreateOrganization = async createOrgDetails => {
        try {
            const response = await axiosInstance.post(`/organization/add-organization`, { createOrgDetails });
            if (response.status === 200) {
                onCloseOrgCreationModal();
                dispatch(showSnackbar({ open: true, severity: 'success', message: 'Organization Created!!' }));
                getAllOrg();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(
                    showSnackbar({
                        open: true,
                        severity: 'error',
                        message: error.response.data ? error.response.data.reason : error.response.statusText,
                    }),
                );
            }
        }
    };

    return (
        <>
            <Grid sx={{ justifyContent: 'space-between', display: 'flex', marginBottom: '20px' }}>
                <Grid style={{ color: theme.palette.primary.main, fontSize: '2rem', marginTop: '4px' }}>Organizations</Grid>
                <Button variant="contained" className="add-button mt-2 mr-2" onClick={() => handleOnClick()}>
                    <Add />
                    Add New Organization
                </Button>
            </Grid>
            {/* <Grid style={{ height: '85%', width: '100%' }}> */}
            <Grid style={{ width: '100%' }}>
                <TableContainer  component={Paper} className="table-container table-container-css">
                    <Table className="center" aria-label="table with sticky header" stickyHeader>
                        <TableHead className="p-3 mb-2 row">
                            <TableRow>
                                <StyledTableCell className="col-1 tableHeaderFont">Sr. No.</StyledTableCell>
                                <StyledTableCell className="col-1 tableHeaderFont">Organization Name</StyledTableCell>

                                <StyledTableCell className="col-1 tableHeaderFont">Registered On</StyledTableCell>
                                {/* <StyledTableCell className="col-1 tableHeaderFont">Time</StyledTableCell> */}
                                {/* <StyledTableCell className="col-1 tableHeaderFont">Status</StyledTableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.allOrganization.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell className="tableContentFont">{index + 1}</StyledTableCell>
                                    <StyledTableCell className="tableContentFont">{row.organization_name}</StyledTableCell>

                                    <StyledTableCell className="tableContentFont">
                                        {convertUTCDateToLocalDate(row.createdAt).split(',')[0]} -{' '}
                                        {convertUTCDateToLocalDate(row.createdAt).split(',')[1]}
                                    </StyledTableCell>

                                    {/* <StyledTableCell className="tableContentFont">{convertUTCDateToLocalDate(row.createdAt).split(",")[1]}</StyledTableCell> */}
                                    {/* <StyledTableCell className="tableContentFont">Created</StyledTableCell> */}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            {addOrgModal && (
                <AddOrganizationModal open={addOrgModal} handleClose={onCloseOrgCreationModal} onCreateOrganization={onCreateOrganization} />
            )}
            {/* </Grid> */}
        </>
    );
}
