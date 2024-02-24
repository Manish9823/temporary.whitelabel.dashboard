import { AccountTree, Apps, GroupAdd, PersonSearch, WorkHistory } from "@mui/icons-material";

export const AllUnit_NavBarOptions = [
  {
    name: "Monitoring Unit",
    iconProvider: "mui",
    icon: PersonSearch,
    route: "monitoring-unit",
  },

  {
    name: "Consumer Unit",
    iconProvider: "mui",
    icon: GroupAdd,
    route: "consumer-unit",
  },

  {
    name: "Organization Users",
    iconProvider: "mui",
    icon: GroupAdd,
    route: "add-org-users",
  },

  {
    name: "Pyramid",
    iconProvider: "mui",
    icon: AccountTree,
    route: "",
  },

  {
    name: "Apps",
    iconProvider: "mui",
    icon: Apps,
    route: "app-list",
  },
  // {
  //   name: "Audit logs",
  //   iconProvider: "mui",
  //   icon: WorkHistory,
  //   route: "",
  // },
];
