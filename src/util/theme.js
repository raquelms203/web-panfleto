import { createMuiTheme, fade } from "@material-ui/core/styles";


export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#000',
    },
    secondary: {
      light: fade("#000", 0.15),
      main:"#000"
    },
    background: {
      default: "#FFF",
      paper: "#FFF"
    },
    text: {
      primary: "#000",
      secondary: "#FFF",
      disabled: "#ececec",
      hint: "#000"
    },
    action: {
      active:"#000",
      selected:"#000"
    }
  },
  overrides: {
    MuiDrawer: {
      paperAnchorTop: {
        marginTop: 90
      },
      paperAnchorDockedLeft: {
        margin: 0
      }
    },
    MuiAppBar: {
      root: {
        margin: 0,
        height: 70,
        justifyContent: "center",
        padding: 0
      }
    },
    MuiPaper: {
      root: {
        padding: 15,
        margin: "15px 0"
      }
    },
    MuiTabs: {
      root: {
        backgroundColor: "#f5f5f5",
        height: 60
      }
    },
    MuiTab: {
      root: {
        height: 60,
        fontWeight: "bold"
      }
    },
    MuiSelect: {
      root: {
        "& .MuiSelect-icon": {
          color: "#000"
        }
      }
    },
    MuiTextField: {
      root: {
        color: "#000",
        "& .MuiFormLabel-root": {
          color: "#000"
        },
        "& .MuiFormLabel-filled, label.Mui-focused": {
          color: "#000"
        },
        "& .MuiSelect-icon": {
          color: "#FFF"
        }
      }
    }
  }
});

