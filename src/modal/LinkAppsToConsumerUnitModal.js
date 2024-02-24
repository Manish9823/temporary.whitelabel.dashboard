import {
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    FormGroup,
    IconButton,
    Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useState } from 'react';
import { Close, InsertLink, Save } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setAllTechUsers } from '../store/pyramidSlice';
import axiosInstance from '../utils/AxiosInstance';
import { Modal } from 'react-bootstrap';
import { showSnackbar } from '../store/snackbarSlice';
import { useTheme } from '@emotion/react';

export default function LinkAppsToConsumerUnitModal({ setLinkAppsModal, node, getPyramidData }) {
    const state = useSelector(store => store.pyramidStore);
    const [updateApps, setUpdateApps] = useState(node.linked_apps ?? []);
    const dispatch = useDispatch();
    const theme = useTheme();

    const [snackBar, setSnackBar] = useState({
        show: false,
        snackBarMessage: '',
    });

    const [newApps, setNewApps] = useState({
        linked_apps: [],
    });

    const handleOnChange = (e, obj) => {
        if (e.target.checked) {
            // const app_id = obj._id;
            // const app_name = obj.app_name;
            const newAppArray = [...updateApps, obj];
            setUpdateApps(newAppArray);
        } else {
            const app_id = obj._id;
            const newAppArray = updateApps.filter(app => app._id !== app_id);
            setUpdateApps(newAppArray);
        }
    };

    const linkAppsToConsumerUnit = async () => {
        const payloadData = {
            consumer_unit_id: node._id,
            linked_apps: updateApps,
        };
        try {
            setLinkAppsModal(false);
            const response = await axiosInstance.post(`/unit/link-apps-to-cu`, { ...payloadData });
            if (response.status === 200) {
                dispatch(showSnackbar({ open: true, severity: 'success', message: 'Changes Saved Successfully!!' }));
            }
            await getPyramidData();
        } catch (error) {
            throw error;
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth={'xs'}
            backdrop="static"
            open={true}
            // onHide={()=>{
            //   setCreateTechSupport(false)
            // }}
        >
            <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: theme.palette.primary.main, fontSize: '1.8rem' }}>
                    {/* <div className="mt-1">
            <InsertLink />
            &nbsp;
          </div> */}
                    Link Apps
                </div>
                <IconButton
                    variant="secondary"
                    onClick={() => {
                        setLinkAppsModal(false);
                    }}
                >
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {state.loginData.appList.map((app, index) => {
                    // if (app.essential === false) {
                        return (
                            <FormGroup key={app._id}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    checked={updateApps.find(newApp => newApp._id === app._id) ? true : false}
                                    label={`${app.app_name}`}
                                    onChange={e => {
                                        handleOnChange(e, app);
                                    }}
                                />
                            </FormGroup>
                        );
                    // }
                    return <React.Fragment />;
                })}
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={linkAppsToConsumerUnit}>
                    <Save fontSize="small" />
                    &nbsp;Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
