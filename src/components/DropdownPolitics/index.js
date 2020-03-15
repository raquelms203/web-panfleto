import React, { useEffect, useState } from "react";
import { Select, FormHelperText, MenuItem } from "@material-ui/core";

export default function DropdownPolitics(props) {
  const { onChange, isFilter } = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (isFilter) setOptions(["Todos", "Prefeitos", "Vereadores"]);
    else setOptions(["Prefeitos", "Vereadores"]);
  }, [setOptions, isFilter]);

  if (isFilter)
    return (
      <div  style={{ background: "white" }}>
        <FormHelperText>Categoria</FormHelperText>
        <Select
          fullWidth
          onChange={onChange}
          defaultValue={0}
         
        >
          <MenuItem key={0} value={0}>
            Todos
          </MenuItem>
          {options.map((item, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  else
    return (
      <>     
        <Select
          fullWidth
          variant= "outlined"
          label="Categoria"
          InputLabelProps={{ shrink: true }}
          onChange={onChange}
          defaultValue={1}
          style={{ background: "white" }}
        >
          <MenuItem key={0} value={0}></MenuItem>
          {options.map((item, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </>
    );
}
