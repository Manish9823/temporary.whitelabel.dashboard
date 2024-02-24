import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
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
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { Save } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

export default function AddTechSupportModal({ open, handleClose, onCreateTechUser }) {
  const state = useSelector((store) => store.pyramidStore);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [snackBar, setSnackBar] = useState({
    show: false,
    snackBarMessage: "",
  });
  const theme = useTheme();

  const [createTechSupport, setCreateTechSupport] = useState({
    email: "",
    phone: "",
    password: "",
    registry_id: "",
    org_id: "",
  });

  const handleDetails = (event) => {
    const { name, value } = event.target;
    let objectToChange = {};

    objectToChange = { ...createTechSupport, [name]: value };

    setCreateTechSupport(objectToChange);
  };

  const onClickSubmitDetails = async () => {
    if (createTechSupport.email === "") {
      setSnackBar({ show: true, snackBarMessage: "Please Enter Email!" });
      return;
    }

    if (createTechSupport.phone === "") {
      setSnackBar({ show: true, snackBarMessage: "Enter Your Phone Number" });
      return;
    }
    if (createTechSupport.password === "") {
      setSnackBar({
        show: true,
        snackBarMessage: "Password length must contain 8 character!",
      });
      return;
    }
    await onCreateTechUser(createTechSupport);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} PaperProps={{ style: { width: "30%" } }}>
      <DialogTitle
        variant={5}
        style={{
          fontSize: "1.8rem",
          color: theme.palette.primary.main,
        }}
      >
        Add Tech Support User
      </DialogTitle>
      <DialogContent>
        <Grid mt={2}>
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
        <Button variant="contained" onClick={onClickSubmitDetails}>
          <Save fontSize="small" />
          &nbsp;Register
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
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
