import React, { useEffect, useState } from "react";
import { MenuItem } from "@material-ui/core";

import { ErrorText, StyledSelect, StyledFormHelperText } from "./styles";

export default function DropdownPolitics(props) {
  const { onChange, isFilter, error, value } = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (isFilter) setOptions(["Todos", "Prefeitos", "Vereadores"]);
    else setOptions(["Prefeito", "Vereador"]);
  }, [setOptions, isFilter]);

  if (Boolean(isFilter))
    return (
      <>
        <StyledFormHelperText style={{ color: error ? "#ef9a9a" : "black" }}>
          Categoria
        </StyledFormHelperText>
        <StyledSelect
          defaultValue={0}
          fullWidth
          variant="outlined"
          size="small"
          onChange={onChange}
          style={{ border: error ? "1px solid #ef5350" : "1px solid #f3f5f5" }}
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
  else
    return (
      <>
        <StyledFormHelperText style={{ color: error ? "#ef5350" : "black" }}>
          Categoria
        </StyledFormHelperText>
        <StyledSelect
          value={value}
          fullWidth
          variant="outlined"
          size="small"
          onChange={onChange}
          style={{ border: error ? "1px solid #ef5350" : "1px solid #f3f5f5" }}
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
