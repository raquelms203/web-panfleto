import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
//import CircularProgress from "@material-ui/core/CircularProgress";

// function sleep(delay = 0) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }

export default function DropdownCities(props) {
  const { list, onChange, error, helperText, open } = props;

  return (
    <Autocomplete
      options={list}
      autoHighlight
      size="small"
      open={open}
      onChange={(event, value) => onChange(event, value)}
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label="Selecione a cidade"
          fullWidth
          variant="outlined"
          style={{ background: "white" }}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
}
