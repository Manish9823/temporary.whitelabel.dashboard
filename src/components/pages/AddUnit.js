import { Save } from '@mui/icons-material';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    styled,
    tableCellClasses,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllMusOfOrg, setOrgAdmin } from '../../store/pyramidSlice';
import axiosInstance from '../../utils/AxiosInstance';
import { AllUnits } from '../../utils/units';
import { showSnackbar } from '../../store/snackbarSlice';
import { useTheme } from '@emotion/react';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 16,
        fontWeight: 600,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        padding: '10px !important',
        width: '20vw',
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
export default function AddUnit() {
    const state = useSelector(store => store.pyramidStore);
    const dispatch = useDispatch();
    const [domain, setDomain] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState({ id: '', name: '' });
    const [selectedMU, setSelectedMU] = useState({ id: '', name: '' });
    const theme = useTheme();

    const [unitDetails, setUnitDetails] = useState({
        unit_name: '',
        org_id: '',
        monitoringUnitId: '',
        consumerUnitId: '',
        unit_type: '',
        status: 'active',
    });

    const [applicationsList, setApplicationsList] = useState([]);

    const setDefaultAppList = () => {
        state.loginData.appList.map((app, index) => {
            if (app.essential) {
                const defaultApp = applicationsList.push(app);
                setApplicationsList(...applicationsList, defaultApp);
            }
        });
    };

    const getAllOrgAdmin = async () => {
        const response = await axiosInstance.get(`/organization/get-org-admin`);
        dispatch(setOrgAdmin(response.data.data));
    };

    const handleOnClick = async () => {
        try {
            if (unitDetails.unit_name === '') {
                dispatch(showSnackbar({ open: true, severity: 'error', message: 'Please Enter Unit Name' }));
                return;
            }
            if (unitDetails.unit_type === '') {
                dispatch(showSnackbar({ open: true, severity: 'error', message: 'Please Select Unit Type' }));
                return;
            }

            if (unitDetails.org_id === '') {
                dispatch(showSnackbar({ open: true, severity: 'error', message: 'Please Select Organization' }));
                return;
            }

            if (unitDetails.unit_type === 'CONSUMER_UNIT') {
                setDefaultAppList();
            }

            if (unitDetails.unit_type === 'MONITORING_UNIT') {
                const response = await axiosInstance.post('/unit/create-mu', { ...unitDetails });
                if (response.status === 200) {
                    // alert("Unit created successfully!");
                    dispatch(showSnackbar({ open: true, severity: 'success', message: 'Monitoring Unit Created!!' }));
                }
            } else {
                const response = await axiosInstance.post('/unit/create-cu', { ...unitDetails, linked_apps: applicationsList });
                if (response.status === 200) {
                    // alert("Unit created successfully!");
                    dispatch(showSnackbar({ open: true, severity: 'success', message: 'Consumer Unit Created!!' }));
                }
            }
            setUnitDetails({
                unit_name: '',
                org_id: '',
                monitoringUnitId: '',
                consumerUnitId: '',
                unit_type: '',
                status: 'active',
            });
            setSelectedOrganization({ id: '', name: '' });
            setSelectedMU({ id: '', name: '' });
        } catch (error) {}
    };

    const handleOrgChange = async event => {
        const value = event.target.value;
        const orgDetails = state.orgAdmin.find(org => org._id === value);
        if (orgDetails) {
            setUnitDetails({ ...unitDetails, org_id: value });
            setSelectedOrganization({ id: value, name: orgDetails.organization_name });

            try {
                const response = await axiosInstance.post(`/unit/get-mu-by-parent_id`, { unit_type: 'MONITORING_UNIT', org_id: value });
                dispatch(setAllMusOfOrg(response.data.data));
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleChangeParentMu = event => {
        const value = event.target.value;
        const selectedMU = state.allMUsOfOrg.find(unit => unit._id === value);
        if (selectedMU) {
            setUnitDetails({ ...unitDetails, monitoringUnitId: event.target.value });
            setSelectedMU({ id: value, name: selectedMU.unit_name });
        }
    };

    const handleUnitName = event => {
        const value = event.target.value;
        setUnitDetails({ ...unitDetails, unit_name: value });
    };

    const handleUnitType = event => {
        const value = event.target.value;
        setUnitDetails({ ...unitDetails, unit_type: value });
    };

    useEffect(() => {
        getAllOrgAdmin();
        // setDefaultAppList();
    }, [unitDetails.monitoringUnitId]);

    console.log(applicationsList, '///////');
    return (
        <div>
            {/* <div
        style={{
          display: "flex",
          justifyContent: "start",
          textAlign: "center",
          alignContent: "center",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Create New Unit
      </div> */}
            <div style={{ color: theme.palette.primary.main, fontSize: '2rem', marginTop: '4px', marginBottom: '20px' }}>New Unit</div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '70vh',
                    backgroundColor: '#F6F8FA',
                }}
            >
                <div style={{ width: '40%', fontWeight: 'bold' }} className="add-css ml-2">
                    <Grid>
                        {' '}
                        <Grid mt={3} sx={{ display: 'flex ', justifyContent: 'center' }}>
                            <TextField
                                style={{ width: '100%', backgroundColor: 'white' }}
                                size="small"
                                label="Enter Unit Name"
                                value={unitDetails.unit_name}
                                name="unit_name"
                                type="email"
                                onChange={handleUnitName}
                            ></TextField>
                        </Grid>
                        <Grid mt={3} sx={{ display: 'flex ', justifyContent: 'center' }}>
                            <FormControl style={{ width: '100%', backgroundColor: 'white' }} size="small">
                                <InputLabel id="demo-select-small-label">Select Unit Type</InputLabel>

                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    size="small"
                                    // label="Enter Parent Name"

                                    value={unitDetails.unit_type}
                                    label="Select Unit Type"
                                    name="orgName"
                                    onChange={handleUnitType}
                                >
                                    {AllUnits.map((event, index) => (
                                        <MenuItem key={index} value={event.name}>
                                            {event.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid mt={3} sx={{ display: 'flex ', justifyContent: 'center' }}>
                            <FormControl style={{ width: '100%', backgroundColor: 'white' }} size="small">
                                <InputLabel sx={{ textAlign: 'center' }} id="demo-select-small-label">
                                    Select Organization Name
                                </InputLabel>

                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    size="small"
                                    //   label="Enter Parent Name"
                                    // defaultValue={selectedOrganization.name ? selectedOrganization.name : ""}
                                    value={selectedOrganization.id}
                                    label="Select Organization Name"
                                    name="orgNameForMU"
                                    onChange={handleOrgChange}
                                >
                                    {state.orgAdmin.length > 0 &&
                                        state.orgAdmin.map((event, index) => (
                                            <MenuItem key={index} value={event._id}>
                                                {event.organization_name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid mt={3} sx={{ display: 'flex ', justifyContent: 'center' }}>
                            <FormControl style={{ width: '100%', backgroundColor: 'white' }} size="small">
                                <InputLabel sx={{ textAlign: 'center' }} id="demo-select-small-label">
                                    Select MU Name
                                </InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    size="small"
                                    // label="Enter Parent Name"
                                    value={selectedMU.id}
                                    label="Enter MU Name"
                                    // name="parent_id"
                                    onChange={handleChangeParentMu}
                                >
                                    {state.allMUsOfOrg.length > 0 &&
                                        state.allMUsOfOrg.map((event, index) => (
                                            <MenuItem key={index} value={event._id}>
                                                {event.unit_name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* </Card> */}
                    </Grid>
                    <Grid
                        sx={{
                            justifyContent: 'start',
                            alignContent: 'center',
                            textAlign: 'center',
                            backgroundColor: '#F6F8FA',
                        }}
                    >
                        <Button variant="contained" className="mt-3 mb-2" onClick={handleOnClick}>
                            <Save />
                            &nbsp;create
                        </Button>
                    </Grid>
                </div>
                <div style={{ width: '60%' }} className="mr-2">
                    {/* <div style={{ marginLeft: "8%", marginTop: "2%" }}>Select Apps</div> */}
                    <Grid
                        mt={2}
                        sx={{
                            display: 'flex ',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        {/* <FormControl style={{ width: "80%" }}>
              {state.appList.length > 0 &&
                state.appList.map((app, index) => (
                  <FormControlLabel
                    style={{ backgroundColor: "white"}}
                    control={<Checkbox />}
                    label={
                      <>
                        {app.app_name} - {app.app_subdomain}.{domain}
                      </>
                    }
                    onChange={(e) => {
                      handleOnChange(e, app);
                    }}
                  />
                ))}
            </FormControl> */}

                        {/* <div style={{ width: "80%" }}> */}

                        <TableContainer
                            component={Paper}
                            className="table-container"
                            sx={{
                                height: '420px',
                                overflowY: 'scroll',
                                overflowX: 'hidden',
                                width: 'auto !important',
                            }}
                        >
                            <Table className="center" aria-label="table with sticky header" stickyHeader>
                                <TableHead className="p-3 mb-2 row">
                                    <TableRow>
                                        <StyledTableCell className="col-1 tableHeaderFont">Apps</StyledTableCell>
                                        <StyledTableCell className="col-1 tableHeaderFont">Sub Domain</StyledTableCell>
                                        {/* <StyledTableCell className="col-1 tableHeaderFont">Domain</StyledTableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.loginData.appList.map((app, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell className="tableContentFont">{app.app_name}</StyledTableCell>

                                            <StyledTableCell className="tableContentFont">
                                                {app.app_subdomain}.{state.loginData.domainName}
                                            </StyledTableCell>

                                            {/* <StyledTableCell className="tableContentFont">{domain}</StyledTableCell> */}

                                            {/* <StyledTableCell className="tableContentFont">{app.subDomain}{state.whiteLabelDetails.domainName !== "" ? "." + state.whiteLabelDetails.domainName : state.whiteLabelDetails.domainName}</StyledTableCell> */}
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </div>
            </div>
            {/* <Grid
        sx={{
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          backgroundColor: "#F6F8FA",
        }}
      >
        <Button variant="contained" className="mt-3 mb-2" onClick={handleOnClick}>
          create
        </Button>
      </Grid> */}
        </div>
    );
}
