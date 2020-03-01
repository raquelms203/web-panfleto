// import { createMuiTheme, fade } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";


export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#00695c',
      main: '#00695c',
    },
    secondary: {
      light: "#3daf8a",
      main: "#3daf8a"
    },
    background: {
      default: "#FFF",
      paper: "#FFF"
    },
    text: {
      primary: "#000",
      secondary: "#000",
      disabled: "#ececec",
      hint: "#ececec"
    },
    action: {
      active:"#000",
      selected:"#dadfd7"
    }
  },
  // overrides: {
  //   MuiDrawer: {
  //     paperAnchorTop: {
  //       marginTop: 90
  //     },
  //     paperAnchorDockedLeft: {
  //       margin: 0
  //     }
  //   },
  //   MuiAppBar: {
  //     root: {
  //       margin: 0,
  //       height: 70,
  //       justifyContent: "center",
  //       padding: 0
  //     }
  //   },
  //   MuiPaper: {
  //     root: {
  //       padding: 15,
  //       margin: "15px 0"
  //     }
  //   },
  //   MuiTabs: {
  //     root: {
  //       backgroundColor: "#f5f5f5",
  //       height: 60
  //     }
  //   },
  //   MuiTab: {
  //     root: {
  //       height: 60,
  //       fontWeight: "bold"
  //     }
  //   },
  //   MuiSelect: {
  //     root: {
  //       "& .MuiSelect-icon": {
  //         color: "#fff"
  //       }
  //     }
  //   },
  //   MuiTextField: {
  //     root: {
  //       color: "#000",
  //       "& .MuiFormLabel-root": {
  //         color: "#000"
  //       },
  //       "& .MuiFormLabel-filled, label.Mui-focused": {
  //         color: "#000"
  //       },
  //       "& .MuiSelect-icon": {
  //         color: "#FFF"
  //       }
  //     }
  //   }
  // }
});

