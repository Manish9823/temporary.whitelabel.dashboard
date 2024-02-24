import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Alert, Dialog, DialogActions, DialogContent, Grid, Snackbar, TextField, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem, DialogContentText } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";

export default function AddOrgUsersModal({ open, handleClose }) {
  const state = useSelector((store) => store.pyramidStore);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [snackBar, setSnackBar] = useState({
    show: false,
    snackBarMessage: "",
  });

  const [createOrgUser, setCreateOrgUser] = useState({
    email: "",
    phone: "",
    password: "",
    user_type: "OrganizationUser",
  });

  const handleDetails = (event) => {
    const { name, value } = event.target;
    let objectToChange = {};

    objectToChange = { ...createOrgUser, [name]: value };

    setCreateOrgUser(objectToChange);
  };

  const onClickSubmitDetails = async () => {
    if (setCreateOrgUser.email === "") {
      setSnackBar({ show: true, snackBarMessage: "Please Enter Email!" });
      return;
    }

    if (setCreateOrgUser.phone === "") {
      setSnackBar({ show: true, snackBarMessage: "Enter Your Phone Number" });
      return;
    }
    if (setCreateOrgUser.password === "") {
      setSnackBar({
        show: true,
        snackBarMessage: "Password length must contain 8 character!",
      });
      return;
    }
    try {
      //   const response = await axios.post(
      //     "http://localhost:7000/techUsers/create-tech-user",
      //     { ...createOrgUser })
      //   if (response.status === 200) {
      //     handleClose();
      //   }
    } catch (error) {
      alert("error");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} PaperProps={{ style: { width: "30%" } }}>
      <DialogContent
        variant={5}
        className="text-center font-weight-bold "
        style={{
          fontSize: "22px",
          color: "#1e3a8a",
          fontFamily: "'Ubuntu', sans-serif",
          fontWeight: "900px",
        }}
      >
        Add Organization User
      </DialogContent>

      <DialogContent>
        <Grid mt={1}>
          <TextField autoFocus fullWidth size="small" label="Enter Email" name="email" type="email" onChange={handleDetails}></TextField>
        </Grid>

        <Grid mt={3}>
          <TextField
            fullWidth
            label="Enter password"
            name="password"
            type={showPassword ? "text" : "password"}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton style={{ fontSize: "18px" }} aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
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
        <Button variant="contained" onClick={onClickSubmitDetails} size="small">
          Register
        </Button>
        <Button onClick={handleClose} size="small">
          Cancel
        </Button>
      </DialogActions>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackBar.show}
        autoHideDuration={3000}
        onClose={() => {
          setSnackBar({ show: false, snackBarMessage: "" });
        }}
      >
        <Alert severity="error">{snackBar.snackBarMessage}</Alert>
      </Snackbar>
    </Dialog>
  );
}
