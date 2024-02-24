import { Add, InsertLink, PersonAdd, RecentActors } from "@mui/icons-material";
import { Button, Chip, Grid, IconButton, Stack, Tooltip, Typography, styled } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinkTechSupportToOrgModal from "../../modal/LinkTechSupportToOrgModal";
import { setPyramidData } from "../../store/pyramidSlice";
import ViewTechUserModal from "../../modal/ViewTechUsersModal";
import axiosInstance from "../../utils/AxiosInstance";
import LinkAppsToConsumerUnitModal from "../../modal/LinkAppsToConsumerUnitModal";
import { useTheme } from "@emotion/react";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(0),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const TreeNode = ({ node, index, getPyramidData }) => {
  const [expanded, setExpanded] = React.useState("panel");

  const [linkTechSupport, setLinkTechSupport] = useState(false);
  const [linkAppsModal, setLinkAppsModal] = useState(false);

  const [techSupportList, setTechSupportList] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const theme = useTheme();

  const handleClose = () => {
    setLinkTechSupport(false);
  };
  const handleOnClose = () => {
    setTechSupportList(false);
  };

  return (
    <div style={{ paddingBottom: "10px" }}>
      <div>
        <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")} style={{ border: "1px solid #706bf9", paddingLeft: "20px" }}>
          <div style={{ display: "flex", width: "100%" }}>
            {node.organization_name && (
              <div
                className="mt-2"
                style={{
                  width: "50px",
                  height: "100%",
                  justifyContent: "center",
                  textAlign: "center",
                  verticalAlign: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "17px", fontWeight: "bold", paddingTop: "8px", paddingBottom: "8px", paddingRight: "8px" }}>{index + 1}</div>
              </div>
            )}
            <div style={{ width: "100%" }}>
              <AccordionSummary expanded aria-controls="panel1d-content" id="panel1d-header" sx={{ width: "100%", backgroundColor: "white" }} className="p-0 pt-0 pb-0">
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center !important" }}>
                  <Typography sx={{ display: "flex", width: "100%" }}>
                    <Stack direction="row" spacing={1} style={{ justifyContent: "center" }}>
                      {node.organization_name ? (
                        <Chip className="pl-1 pr-1" sx={{ backgroundColor: "white", color: `${theme.palette.primary.main}`, border: "1px solid #706bf9" }} variant="filled" label={"Organization"} />
                      ) : (
                        <Chip
                          className="pl-1 pr-1"
                          sx={{ backgroundColor: "white", color: `${theme.palette.primary.main}`, border: "1px solid #706bf9" }}
                          variant="filled"
                          color="primary"
                          // color={node.unit_type === "MONITORING_UNIT" ? "warning" : "primary"}
                          label={node.unit_type === "MONITORING_UNIT" ? "Monitoring Unit" : "Consumer Unit"}
                        />
                      )}
                      {node.organization_name ? (
                        <div style={{ fontWeight: "bold", fontSize: "1rem", padding: "4px" }}> {node.organization_name} </div>
                      ) : (
                        <div style={{ fontWeight: "bold", fontSize: "1rem", padding: "4px" }}> {node.unit_name} </div>
                      )}
                    </Stack>
                  </Typography>
                </div>
              </AccordionSummary>
            </div>
            {node.organization_name && (
              <div style={{ width: "22%", display: "grid", placeItems: "center" }} className="mr-1 ml-1">
                <Button
                  size="small"
                  style={{ alignItems: "center", width: "250px", height: "65%" }}
                  variant="contained"
                  className="font-weight-bold"
                  onClick={() => {
                    setLinkTechSupport(true);
                  }}
                >
                  <InsertLink fontSize="small" />
                  &nbsp;Link Tech Support Users
                </Button>
              </div>
            )}
            {node.unit_type === "CONSUMER_UNIT" && (
              <div style={{ display: "grid", placeItems: "center" }} className="mr-2 ml-1 ">
                <Button
                  size="small"
                  style={{ alignItems: "center", width: "130px", height: "65%" }}
                  variant="contained"
                  className="font-weight-bold"
                  onClick={() => {
                    setLinkAppsModal(true);
                  }}
                >
                  <InsertLink fontSize="small" />
                  &nbsp;Link Apps
                </Button>
              </div>
            )}
            {/* <div
              style={{
                width: "4%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setTechSupportList(true);
              }}
            >
              <Tooltip title="View Tech Users">
                <RecentActors className="mr-2" fontSize="small" />
              </Tooltip>
            </div> */}
          </div>

          <AccordionDetails>
            {node.data.map((child, index) => (
              <TreeNode node={child} index={index} getPyramidData={getPyramidData} />
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
      {linkTechSupport && <LinkTechSupportToOrgModal setLinkTechSupport={setLinkTechSupport} node={node} getPyramidData={getPyramidData} />}
      {linkAppsModal && <LinkAppsToConsumerUnitModal setLinkAppsModal={setLinkAppsModal} node={node} getPyramidData={getPyramidData} />}

      {/* {techSupportList && <ViewTechUserModal setTechSupportList={setTechSupportList} node={node} handleClose={handleOnClose} />} */}
    </div>
  );
};
export default function Pyramid() {
  const [temp, setTemp] = useState([]);
  const state = useSelector((store) => store.pyramidStore);
  const dispatch = useDispatch();
  const theme = useTheme();

  const getAllData = async () => {
    try {
      const response = await axiosInstance.get(`/pyramid/get-pyramid-by-registry-id`);
      dispatch(setPyramidData(response.data.data));
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <div>
        <Grid style={{ color: theme.palette.primary.main, fontSize: "2rem", marginTop: "5px", marginBottom: "20px" }}>Pyramid</Grid>
        {/* <Accordion expanded style={{ border: "1px solid #706bf9", padding: "0px" }}>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "100%" }}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" sx={{ width: "100%", backgroundColor: `${theme.palette.primary.main}` }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center !important",
                  }}
                >
                  <div style={{ display: "flex", width: "100%", color:"white", fontSize:"1.2rem" }}>
                      Registry
                  </div>
                </div>
              </AccordionSummary>
            </div>

           
          </div>
        </Accordion> */}
        <div>{state.pyramidData.length > 0 && state.pyramidData.map((child, index) => <TreeNode node={child} index={index} getPyramidData={getAllData} />)}</div>
      </div>
    </div>
  );
}
