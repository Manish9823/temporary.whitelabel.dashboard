import { Box, Card, Chip, FormControl, Grid, Icon, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAppList } from "../../store/pyramidSlice";
import { useTheme } from "@emotion/react";

export default function AppList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((store) => store.pyramidStore);
  const theme = useTheme();

  const handelOnClick = (value) => {
    // setAge(event.target.value);
    navigate(value);
  };

  const getApps = async () => {
    try {
      const response = await axios.get("http://localhost:6020/allapps/get-all-apps");

      dispatch(setAppList(response.data.data));
    } catch (error) {}
  };

  useEffect(() => {
    getApps();
  }, []);

  return (
    <>
      <Box sx={{ height: "100vh", width: "100%" }}>
        <Grid>
          <div style={{ color: theme.palette.primary.main, fontSize: "2rem", marginBottom:"20px"}}>Apps</div>
        </Grid>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth className="text-center">
            <Grid display={"flex"} gap={2} container flex={1}>
              {state.loginData.appList.length > 0 &&
                state.loginData.appList.map((item, key) => (
                  <Grid
                    className="hoverCss"
                    item
                    md={2}
                    display={"flex"}
                    flexDirection={"column"}
                    sx={{
                      padding: 2,
                      backgroundColor: "white",
                      borderRadius: "8px",
                      // boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                      border: "1px solid #706bf9",
                      height: "120px",
                      // margin: 2,
                      
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handelOnClick(item.route);
                    }}
                  >
                    <Grid
                      item
                      style={{
                        height: "auto",
                        display: "flex",
                        justifyContent: "start",
                        width: "100%",
                      }}
                    >
                      {/* <item.icon className='icon' />/ */}

                      {/* <img src={item.icon} style={{ height: "70px", width: "70px" }} /> */}
                      <Grid
                        item
                        style={{
                          fontSize: "1px",
                          display: "flex",
                          justifyContent: "end",
                          width: "100%",
                        }}
                      >
                        {/* {item.status ? "..." + item.status : " "} */}
                        {item.status === "INSTALLED" && <Chip label={item.status} color="success" size="small" sx={{ fontSize: "10px" }} />}
                        {item.status === "COMING SOON" && <Chip label={item.status} size="small" sx={{ fontSize: "10px" }} color="primary" variant="outlined" />}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        height: "100%",
                        display: "flex",
                        justifyContent: "start",
                        color: theme.palette.primary.main,
                        // alignItems: "center",
                      }}
                    >
                      {item.app_name}
                    </Grid>
                    <Grid>
                      <Grid sx={{ color: "grey", fontSize: "15px" }}>{item.description}</Grid>
                    </Grid>
                    {/* </Grid> */}
                  </Grid>
                  // <MenuItem value={item.route}>{item.name}</MenuItem>
                ))}
            </Grid>

            {/* <MenuItem value={"/RCS"}>RCS</MenuItem>`
            <MenuItem value={'/RCS-add-bot'}>WhatApp</MenuItem>
            <MenuItem value={'/RCS-add-bot'}>Others...</MenuItem> */}
          </FormControl>
        </Box>
      </Box>
    </>
  );
}
