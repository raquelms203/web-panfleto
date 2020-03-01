import React from "react";
import {
  FormControl,
  Select,
  FormHelperText,
  MenuItem
} from "@material-ui/core";

export default function DropdownPolitics(props) {
  const { onChange, isFilter } = props;

  return (
    <FormControl>
      <FormHelperText>Categoria</FormHelperText>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        onChange={onChange}
        defaultValue={1}
        style={{ width: 250 }}
      >
        {isFilter ?
        <MenuItem key={1} value={1}>
          Todos
        </MenuItem>
        : undefined}
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
