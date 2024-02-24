import { AccountTree, AddBusiness, Apps, DynamicFeed, PendingActions, SupportAgent, WorkHistory } from "@mui/icons-material";

export const Registry_NavBarOptions = [
  {
    name: "Pyramid",
    iconProvider: "mui",
    icon: AccountTree,
    route: "pyramid",
  },
  {
    name: "Organizations",
    iconProvider: "mui",
    icon: AddBusiness,
    route: "organization",
  },

  {
    name: "Tech Support Users",
    iconProvider: "mui",
    icon: SupportAgent,
    route: "techsupport",
  },

 
  {
    name: "New Unit",
    iconProvider: "mui",
    icon: DynamicFeed,
    route: "new-unit",
  },
  {
    name: "Apps",
    iconProvider: "mui",
    icon: Apps,
    route: "apps",
  },
  // {
  //   name: "Audit Logs",
  //   iconProvider: "mui",
  //   icon: WorkHistory,
  //   route: "billing-unit",
  // },

  // {
  //   name: "Pending Requests",
  //   iconProvider: "mui",
  //   icon: PendingActions,
  //   route: "pendingrequests",
  // },
];
