import {
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Close, InsertLink, Save } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setAllTechUsers } from '../store/pyramidSlice';
import axiosInstance from '../utils/AxiosInstance';
import { showSnackbar } from '../store/snackbarSlice';
import { useTheme } from '@emotion/react';

export default function LinkTechSupportToOrgModal({ setLinkTechSupport, node, getPyramidData }) {
    console.log(node);
    const state = useSelector(store => store.pyramidStore);
    const [updateTechUser, setUpdateTechUser] = useState(node.linked_tech_support_users ?? {});
    const dispatch = useDispatch();
    const theme = useTheme();

    const getAllTechUser = async () => {
        try {
            const response = await axiosInstance.get(`/tech-support-user/get-all`);
            console.log(response.data.data);
            dispatch(setAllTechUsers(response.data.data));
        } catch (error) {
            throw error;
        }
    };
    const handleOnChange = (e, obj) => {
        if (e.target.checked) {
            console.log(obj, 'Obj Obj');
            const techUserId = obj._id;
            const techUserEmail = obj.email;
            const newTechUserObject = { ...updateTechUser, [techUserId]: techUserEmail };
            setUpdateTechUser(newTechUserObject);
        } else {
            const newTechUserObject = {};
            const techUserId = obj._id;
            Object.keys(updateTechUser).forEach(key => {
                if (key !== techUserId) {
                    newTechUserObject[key] = updateTechUser[key];
                }
            });

            setUpdateTechUser(newTechUserObject);
            // const a = updateTechUser;
            // setUpdateTechUser(a.filter((email) => email !== email));
        }
    };

    const linkTechSupportToOrg = async () => {
        const payloadData = {
            org_id: node._id,
            linked_tech_support_users: updateTechUser,
        };
        try {
            setLinkTechSupport(false);
            const response = await axiosInstance.post(`/organization/link-tech-support-user`, { ...payloadData });
            if (response.status === 200) {
                dispatch(showSnackbar({ open: true, severity: 'success', message: 'Tech Support User Linked Successfully!!' }));
            }
            getPyramidData();
        } catch (error) {
            throw error;
        }
    };

    React.useEffect(() => {
        if (node.linked_tech_support_users) {
            setUpdateTechUser(node.linked_tech_support_users);
        }
        getAllTechUser();
    }, []);

    return (
        <Dialog
            fullWidth
            open={true}
            maxWidth={'xs'}
            // onHide={()=>{
            //   setCreateTechSupport(false)
            // }}
        >
            <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between', color: theme.palette.primary.main, fontSize: '1.8rem' }}>
                    {/* <Grid className="mt-1">
            <InsertLink />
            &nbsp;
          </Grid> */}
                    Link Tech Support User
                </Grid>
                <IconButton
                    variant="secondary"
                    onClick={() => {
                        setLinkTechSupport(false);
                    }}
                >
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {state.allTechUsers.map((row, index) => (
                    <FormGroup>
                        {updateTechUser &&
                        Object.keys(updateTechUser).find(key => updateTechUser[key] == row.email) ? (
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label={row.email}
                                checked={true}
                                onChange={e => {
                                    handleOnChange(e, row);
                                }}
                            />
                        ) : (
                            <FormControlLabel
                                control={<Checkbox />}
                                label={row.email}
                                onChange={e => {
                                    handleOnChange(e, row);
                                }}
                            />
                        )}
                    </FormGroup>
                ))}
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={linkTechSupportToOrg}>
                    <Save fontSize="small" />
                    &nbsp;Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
