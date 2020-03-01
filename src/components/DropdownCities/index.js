import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function DropdownCities(props) {
  const { list, onChange } = props;

  return (
    <Autocomplete
      id="combo-box-demo"
      options={list}
      onChange={onChange}
      getOptionLabel={option => option}
      style={{ width: 250 }}
      renderInput={params => (
        <TextField {...params} label="Selecione a cidade" variant="outlined" fullWidth />
      )}
    />
  );
}
