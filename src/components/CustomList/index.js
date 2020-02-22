import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Grid
} from "@material-ui/core";

export default function CustomList(props) {
  const { list, onClick, indexSelected } = props;

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
                onChange={() => console.log("mudança")}
              />
              <ListItemText primary={item.nome}></ListItemText>
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
