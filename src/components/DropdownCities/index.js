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
  const { list, onChange, error, helperText, citySelected, filledColor } = props;

  return (
    <Autocomplete
      value={citySelected}
      options={list}
      autoHighlight
      size="small"
      onChange={(event, value) => onChange(event, value)}
      getOptionSelected={(option, value) => option === citySelected}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label="Selecione a cidade"
          fullWidth
          variant="outlined"
          style={{ backgroundColor: filledColor }}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
}
