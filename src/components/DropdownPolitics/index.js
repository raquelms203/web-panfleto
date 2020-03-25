import React, { useEffect, useState } from "react";
import { Select, MenuItem, withStyles } from "@material-ui/core";

import { ErrorText, StyledSelect, StyledFormHelperText } from "./styles";

export default function DropdownPolitics(props) {
  const { onChange, isFilter, error, classes } = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (isFilter) setOptions(["Todos", "Prefeitos", "Vereadores"]);
    else setOptions(["Prefeitos", "Vereadores"]);
  }, [setOptions, isFilter]);

  if (isFilter)
    return (
      <>
        <StyledFormHelperText style={{ color: error ? "red" : "black" }}>
          Categoria
        </StyledFormHelperText>
        <StyledSelect
          fullWidth
          variant="outlined"
          size="small"
          onChange={onChange}
        >
          {options.map((item, index) => (
            <MenuItem key={index} value={index}>
              {item}
            </MenuItem>
          ))}
        </StyledSelect>
        {error ? <ErrorText>Selecione uma categoria</ErrorText> : undefined}
      </>
    );
  else
    return (
      <>
        <StyledFormHelperText style={{ color: error ? "red" : "black" }}>
          Categoria
        </StyledFormHelperText>
        <StyledSelect
          fullWidth
          variant="outlined"
          size="small"
          onChange={onChange}
          style={{ border: error ? "1px solid red" : "1px solid #f3f5f5" }}
        >
          <MenuItem key={0} value={0} disabled></MenuItem>
          {options.map((item, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {item}
            </MenuItem>
          ))}
        </StyledSelect>
        {error ? <ErrorText>Selecione uma categoria</ErrorText> : undefined}
      </>
    );
}
