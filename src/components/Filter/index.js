import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  TextField,
  MenuItem,
  Grid
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function Filter(props) {

  const { list } = props;

  return (
    <Grid container direction="column">
      <Grid item>
        <FormControl>
          <FormHelperText>Políticos</FormHelperText>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={handleChange}
            
           
          >
            <MenuItem key={1} value={1}>
              Todos
            </MenuItem>
            <MenuItem key={2} value={2}>
              Prefeito
            </MenuItem>
            <MenuItem key={3} value={3}>
              Vereador
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item> <Autocomplete
      id="combo-box-demo"
      options={list}
      getOptionLabel={option => option}
      style={{ width: 300 }}
      renderInput={params => (
        <TextField {...params} label="Combo box" variant="outlined" fullWidth />
      )}
    /></Grid>
    </Grid>
  );
}


