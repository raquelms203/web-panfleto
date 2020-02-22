import React from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Grid,
  ListItemIcon,
} from "@material-ui/core";

import { ArrowForwardIos } from "@material-ui/icons";

export default function CustomList(props) {
  const { list, onClick, indexSelected, onCheckChange } = props;

  return (
    <div style={{ background: "white", height: "100vh" }}>
      {list.length === 0 ? (
        <Grid container direction="column" alignItems="center">
          <div style={{ height: "50px" }}>
          </div>
            <strong> Não há registros</strong>
        </Grid>
      ) : (
        <List component="nav" dense>
          {list.map((item, index) => (
            <ListItem
              key={index}
              divider
              button
              selected={indexSelected === index}
              onClick={event => onClick(event, index)}
            >
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                onChange={(event, value) => onCheckChange(event, value, index)}
              />
              <ListItemText primary={item.nome}></ListItemText>
              <ListItemIcon><ArrowForwardIos style={{ color: "#525252", transform: "scale(0.8)" }} /></ListItemIcon>
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
