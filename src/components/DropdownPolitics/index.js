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
      <>
        <FormHelperText style={{ marginLeft: "12px", marginBottom: "-3px"  }}>
          Categoria
        </FormHelperText>
        <Select
          fullWidth
          variant="outlined"
          size="small"
          onChange={onChange}
          defaultValue={0}
          style={{ background: "white", height: 42 }}
        >
          {options.map((item, index) => (
            <MenuItem key={index} value={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </>
    );
  else
    return (
      <>
        <FormHelperText style={{ marginLeft: "12px", marginBottom: "-3px" }}>
          Categoria
        </FormHelperText>
        <Select
          fullWidth
          variant="outlined"
          size="small"
          onChange={onChange}
          defaultValue={1}
          style={{ background: "white", height: 42 }}
        >
          <MenuItem key={0} value={0} disabled></MenuItem>
          {options.map((item, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </>
    );
}
