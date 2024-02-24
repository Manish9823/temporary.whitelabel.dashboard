import { Card, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Registry_NavBarOptions } from "../../../utils/Registry_NavBarOptions";
import AddOrganization from "../AddOrganization";
import AddTechSupport from "../AddTechSupport";
import AddUnit from "../AddUnit";
import AppList from "../AppList";
import PendingRequestDetail from "../PendingRequestDetail";

export default function RegistryDashboard() {
  const state = useSelector((store) => store.pyramidStore);
  const [value, setValue] = useState("add-org");

  return (
    <>
      <Grid>
        {/* <Grid style={{ width: "100%", background: "#1e293b", height: "8%", alignItems: "center", display: "flex" }}>
                    <Typography style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: "20px", color: "white" }} className="ml-3 ">
                        Welcome !
                    </Typography>
                </Grid> */}

        {/* <Grid container spacing={2}>
                    <Grid item xs={1.8}>
                        <Box
                            sx={{
                                overflow: "auto",
                                border: "none",
                                backgroundColor: "#F6F8FA",
                            }}
                        >
                            <List className="mt-1" style={{ height: "91vh", overflow: "hidden" }}>
                                {Registry_NavBarOptions.map((text, index) => (
                                    <>
                                        <Card className="mb-2" style={{ boxShadow: "none" }} key={index}>
                                            <ListItem
                                                className="mt-2 mb-2"
                                                key={text.name}
                                                disablePadding
                                                onClick={() => {
                                                    setValue(text.route);
                                                }}
                                            >
                                                <ListItemButton style={{ backgroundColor: "white" }}>
                                                    <text.icon />

                                                    <ListItemText className="ml-2" primary={text.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        </Card>
                                    </>
                                ))}
                            </List>
                            <Divider />
                        </Box>
                    </Grid>
                    <Grid item xs={10.2}>
                        {value === "add-org" && <AddOrganization />}
                        {value === "add-tech-support" && <AddTechSupport />}
                        {value === "app-list" && <AppList />}
                        {value === "add-units" && <AddUnit />}

                        {value === "pending-request-details" && <PendingRequestDetail />}
                    </Grid>
                </Grid> */}
      </Grid>
    </>
  );
}
