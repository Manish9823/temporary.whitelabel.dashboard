import { Add } from "@mui/icons-material";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import { setAllTechUsers } from "../../store/pyramidSlice";
import AddOrgUsersModal from "../../modal/AddOrgUsersModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 16,
    fontWeight: 600,
    backgroundColor: "#d1d5db",
    //   color: theme.palette.common.white,
    padding: "10px !important",
    width: "100vw",
  },
  [`&.${tableCellClasses.body}`]: {
    padding: "10px !important",
    fontSize: 14,
  },
  [`&.${tableCellClasses.head.tr}`]: {
    backgroundColor: "#79E0EE",
    width: "45vw",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AddOrgUsers() {
  const state = useSelector((store) => store.pyramidStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addOrgUsersModal, setAddOrgUsersModal] = useState(false);

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    //fractionalSecondDigits: 0,
  });

    function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date);

    return formatter.format(newDate);
  }

  const onCloseOrgCreationModal = () => {
    setAddOrgUsersModal(false);
  };
  const handleOnClick = () => {
    setAddOrgUsersModal(true);
    // navigate("/login");
  };

  return (
    <>
      <Grid sx={{ width: "100%", display: "flex", justifyContent: "end", overflow: "hidden !important" }}>
        <Button variant="contained" onClick={() => handleOnClick()}>
          <Add />
          Add Organization User
        </Button>
      </Grid>
      <Grid style={{ height: "85vh", width: "100%", overflow: "hidden !important" }}>
        <Grid className="mt-3">
          <TableContainer
            component={Paper}
            className="table-container"
            sx={{
              height: "735px",
              overflowY: "scroll",
              overflowX: "hidden",
              width: "auto !important",
            }}
          >
            <Table className="center" aria-label="table with sticky header" stickyHeader>
              <TableHead className="p-3 mb-2 row">
                <TableRow>
                  <StyledTableCell className="col-1 tableHeaderFont">Sr.No.</StyledTableCell>
                  <StyledTableCell className="col-1 tableHeaderFont">Organization Users</StyledTableCell>

                  <StyledTableCell className="col-1 tableHeaderFont">Date</StyledTableCell>
                  <StyledTableCell className="col-1 tableHeaderFont">Time</StyledTableCell>
                  {/* <StyledTableCell className="col-1 tableHeaderFont"></StyledTableCell>
                  <StyledTableCell className="col-1 tableHeaderFont"></StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {state.allTechUsers.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell className="tableContentFont">{index + 1}</StyledTableCell>
                    <StyledTableCell className="tableContentFont">{row.email}</StyledTableCell>

                    <StyledTableCell className="tableContentFont">{convertUTCDateToLocalDate(row.createdAt).split(",")[0]}</StyledTableCell>

                    <StyledTableCell className="tableContentFont">{convertUTCDateToLocalDate(row.createdAt).split(",")[1]}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {addOrgUsersModal && <AddOrgUsersModal open={addOrgUsersModal} handleClose={onCloseOrgCreationModal} />}
      </Grid>
    </>
  );
}
