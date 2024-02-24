import { Close } from "@mui/icons-material";
import { Box, IconButton, List, ListItem } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/AxiosInstance";

export default function ViewTechUserModal({ setLinkTechSupport, open, handleClose, node }) {
  const state = useSelector((store) => store.pyramidStore);
  const [updateTechUser, setUpdateTechUser] = useState([]);
  const dispatch = useDispatch();

  const [snackBar, setSnackBar] = useState({
    show: false,
    snackBarMessage: "",
  });

  const getAllTechUser = async (node) => {
    try {
      // const userDetails = {
      //     user_type:node.user_type,
      //     email:node.email,
      // }
      const response = await axiosInstance.post("/tech-support-user/get-by-org", { org_id: node.org_id });
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    getAllTechUser();
    // getLinkedTechUser(node);
  }, []);

  return (
    <Modal
      centered
      backdrop="static"
      show={true}
      // onHide={()=>{
      //   setCreateTechSupport(false)
      // }}
    >
      <Modal.Header>
        <Modal.Title>Tech Support User</Modal.Title>
        <IconButton variant="secondary">
          <Close onClick={handleClose} />
        </IconButton>
      </Modal.Header>
      <Modal.Body>
        <Box sx={{ width: "100%", maxWidth: 360, bgColor: "background.paper" }}>
          {node.linked_tech_support_users.map((row, index) => (
            <List>
              <ListItem>{row}</ListItem>
            </List>
          ))}
        </Box>
      </Modal.Body>

      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
