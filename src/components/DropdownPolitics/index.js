import React from "react";
import {
  Select,
  FormHelperText,
  MenuItem
} from "@material-ui/core";

export default function DropdownPolitics(props) {
  const { onChange, isFilter } = props;

  return (
    <>
      <FormHelperText>Categoria</FormHelperText>
      <Select fullWidth onChange={onChange} defaultValue={1}>
        {isFilter ? (
          <MenuItem key={1} value={1}>
            Todos
          </MenuItem>
        ) : (
          undefined
        )}
        <MenuItem key={2} value={2}>
          Prefeitos
        </MenuItem>
        <MenuItem key={3} value={3}>
          Vereadores
        </MenuItem>
      </Select>
    </>
  );
}
