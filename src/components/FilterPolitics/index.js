import React from "react";
import {
  FormControl,
  Select,
  FormHelperText,
  MenuItem,
} from "@material-ui/core";

export default function Filter(props) {
  const { onChange } = props;

  return (
    
        <FormControl>
          <FormHelperText>Políticos</FormHelperText>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={onChange}
          >
            <MenuItem key={1} value={1}>
              Todos
            </MenuItem>
            <MenuItem key={2} value={2}>
              Prefeitos
            </MenuItem>
            <MenuItem key={3} value={3}>
              Vereadores
            </MenuItem>
          </Select>
        </FormControl>
  );
}