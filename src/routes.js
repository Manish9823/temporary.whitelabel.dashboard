import React from "react";
import async from "./components/Async";
// import Login from "./components/Login";
const RegistryLayout = async(() => import("./components/RegistryLayout"));
const RegistryAuthGuard = async(() => import("./components/guards/RegistryAuthGuard"));
const AddUnit = async(() => import("./components/pages/AddUnit"));
const RegistryDashboard = async(() => import("./components/pages/Registry/RegistryDashboard"));
const AddOrganization = async(() => import("./components/pages/AddOrganization"));
const AddTechSupport = async(() => import("./components/pages/AddTechSupport"));
const AppList = async(() => import("./components/pages/AppList"));
const Pyramid = async(() => import("./components/pages/Pyramid"));
const Login = async(() => import("./components/Login"));

const routes = [
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: (
      <RegistryAuthGuard>
        <RegistryLayout />
      </RegistryAuthGuard>
    ),
    children: [
      {
        path: "dashboard",
        element: <RegistryDashboard />,

        // children:[
        //     {
        //         path: "Organization",
        //         element: <AddOrganization />,
        //       },
        // ]
      },
      {
        path: "organization",
        element: <AddOrganization />,
      },

      {
        path: "techsupport",
        element: <AddTechSupport />,
      },
      {
        path: "apps",
        element: <AppList />,
      },
      {
        path: "new-unit",
        element: <AddUnit />,
      },
      // {
      //   path: "pendingrequests",
      //   element: <PendingRequestDetail />,
      // },
      {
        path: "pyramid",
        element: <Pyramid />,
      },

      // {
      //   path: "add-Organization",
      //   element: <AddOrganizationModal />,
      // },
    ],
  },
];
export default routes;
