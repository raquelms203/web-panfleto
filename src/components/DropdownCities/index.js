import React from "react";
import { TextField, withStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const styles = theme => ({
  heigth: 5
});

export var DropdownCities = withStyles(styles)(props => {
  const { list, onChange, classes } = props;

  return (
    
      <Autocomplete
        id="combo-box-demo"
        size="small"
        options={list}
        onChange={onChange}
        getOptionLabel={option => option}
        style={{ width: 250, background: "white" }}
        renderInput={params => (
          <TextField
            {...params}
            InputLabelProps={{ shrink: true }}
            label="Selecione a cidade"
            variant="outlined"
            fullWidth
          />
        )}
      />
  );
});
