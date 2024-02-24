import { createSlice } from "@reduxjs/toolkit";
export const pyramidSlice = createSlice({
  name: "pyramidSlice",
  initialState: {
    loginData: {
      email: "",
      domainName: "",
      registry_name: "",
      appList: [],
      logo_url: "",
    },
    allOrganization: [],
    allTechUsers: [],
    // appList: [],
    orgAdmin: [],
    allMUsOfOrg: [],
    orgDetails: {
      selectedOrg: "",
    },
    allPendingRequest: [],
    pyramidData: [],
    cuDefalutApps:[],
  },
  reducers: {
    setLoginData: (state, action) => {
      state.loginData.registry_name = action.payload.registry_name;
      state.loginData.email = action.payload.email;
      state.loginData.domainName = action.payload.domain_name;
      // state.loginData.appList = action.payload.appList;
      state.loginData.logo_url = action.payload.logo_url;
    },
    setAllTechUsers: (state, action) => {
      state.allTechUsers = action.payload;
    },
    setAllOrganization: (state, action) => {
      state.allOrganization = action.payload;
    },

    setAppList: (state, action) => {
      state.loginData.appList = action.payload;

      // for (let index = 0; index < tempAppList.length; index++) {
      //   const element = tempAppList[index];
      //   const app_id = element._id;
      //   const app_name = element.app_name;
      //   const newAppObject = { [app_id]: app_name };
      // }
    },

    setCuDefaultApps: (state, action) => {
      state.orgAdmin = action.payload;
    },
    setOrgAdmin: (state, action) => {
      state.orgAdmin = action.payload;
    },

    setAllPendingRequest: (state, action) => {
      state.allPendingRequest = action.payload;
    },
    setSelectedOrgName: (state, action) => {
      state.orgDetails.selectedOrg = action.payload;
    },

    setAllMusOfOrg: (state, action) => {
      state.allMUsOfOrg = action.payload;
    },
    setPyramidData: (state, action) => {
      state.pyramidData = action.payload;
    },
  },
});
export const { setAllTechUsers, setAllOrganization, setAppList, setOrgAdmin, setSelectedOrgName, setAllPendingRequest, setAllMusOfOrg, setLoginData, setPyramidData,setCuDefaultApps } = pyramidSlice.actions;
