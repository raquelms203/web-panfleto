import React from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  Checkbox,
  Grid,
  Menu,
  MenuItem,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";

import { TextOverflow } from "./styles";

import { MoreVert } from "@material-ui/icons";

export default function CustomList(props) {
  const {
    list,
    onClick,
    indexSelected,
    onCheckChange,
    dropdownNames,
    dropdownOnChange,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ background: "white", height: "82vh", overflowX: "hidden" }}>
      {list.length === 0 ? (
        <Grid container direction="column" alignItems="center">
          <div style={{ height: "50px" }}></div>
          <strong style={{ padding: "8px" }}> Não há registros</strong>
        </Grid>
      ) : (
        <List
          component="nav"
          dense
          style={{ maxHeight: "82vh", overflowY: "auto", overflowX: "hidden" }}
        >
          {list.map((itemList, indexList) => (
            <ListItem
              key={indexList}
              divider
              button
              style={{ paddingRight: 0 }}
              selected={indexSelected === indexList}
              onClick={(event) => onClick(event, indexList)}
            >
              <Checkbox
                edge="start"
                disableRipple
                onChange={(event, value) => {
                  onCheckChange(event, value, indexList);
                }}
              />
              <Grid
                container
                alignItems="center"
                style={{ overflow: "hidden" }}
              >
                <Grid item xs={8} sm={9} md={10}>
                  {!itemList.hasOwnProperty("group") ? (
                    <TextOverflow>{itemList.name}</TextOverflow>
                  ) : (
                    <TextOverflow>
                      [{itemList.group.toUpperCase()}] {itemList.name}
                    </TextOverflow>
                  )}
                </Grid>
                <Grid item container xs={4} sm={3} md={2} justify="flex-end">
                  <Button onClick={handleClickMenu}>
                    <MoreVert
                      style={{ color: "#525252", transform: "scale(0.8)" }}
                    />
                  </Button>
                </Grid>
              </Grid>
              <ListItemSecondaryAction>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  {dropdownNames.map(function (item, index) {
                    return (
                      <MenuItem
                        key={index}
                        onClick={() => dropdownOnChange[index](indexSelected)}
                      >
                        {item}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

CustomList.propTypes = {
  list: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  indexSelected: PropTypes.number,
};
