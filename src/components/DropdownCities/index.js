import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function DropdownCities(props) {
  const { list, onChange } = props;

  return (
    <Autocomplete
      id="combo-box-demo"
      size="small"
      options={list}
      onChange={onChange}
      getOptionLabel={option => option}
      style={{ background: "white" }}
      renderInput={params => (
        <TextField
          {...params}
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Selecione a cidade"
          variant="outlined"
        />
      )}
    />
  );
}
