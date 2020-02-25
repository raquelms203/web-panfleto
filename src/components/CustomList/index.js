import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Grid,
  Button,
  Menu,
  MenuItem,
  ListItemSecondaryAction
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
    dropdownOnChange
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ background: "white", height: "100vh" }}>
      {list.length === 0 ? (
        <Grid container direction="column" alignItems="center">
          <div style={{ height: "50px" }}></div>
          <strong> Não há registros</strong>
        </Grid>
      ) : (
        <List component="nav" dense>
          {list.map((itemList, indexList) => (
            <ListItem
              style={{ paddingRight: "0" }}
              key={indexList}
              divider
              button
              selected={indexSelected === indexList}
              onClick={event => onClick(event, indexList)}
            >
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                onChange={(event, value) =>
                  onCheckChange(event, value, indexList)
                }
              />

              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={6} sm={6} md={6}>
                  <TextOverflow>{itemList.nome}</TextOverflow>
                </Grid>
                <Grid item>
                  <Button
                    edge="end"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClickMenu}
                  >
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
                  {dropdownNames.map(function(item, index) {
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
  indexSelected: PropTypes.number
};
