import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function Filter(props) {
  const { list, onChange } = props;

  return (
    <Autocomplete
      id="combo-box-demo"
      options={list}
      onChange={onChange}
      getOptionLabel={option => option}
      style={{ width: 300 }}
      renderInput={params => (
        <TextField {...params} label="Cidades" variant="outlined" fullWidth />
      )}
    />
  );
}
