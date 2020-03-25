import React, { useEffect, useState } from "react";
import { Select, FormHelperText, MenuItem } from "@material-ui/core";

import { ErrorText, StyledSelect } from "./styles";




export default function DropdownPolitics(props) {
  const { onChange, isFilter, error, } = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (isFilter) setOptions(["Todos", "Prefeitos", "Vereadores"]);
    else setOptions(["Prefeitos", "Vereadores"]);
  }, [setOptions, isFilter]);

  const styles = theme => ({
    select: {
      "&:before": {
        borderColor: "red"
      }
    }
  });

  if (isFilter)
    return (
      <>
        <FormHelperText style={{ marginLeft: "12px", marginBottom: "-3px" }}>
          Categoria
        </FormHelperText>
        <StyledSelect
          fullWidth
          variant="outlined"
          size="small"
          onChange={onChange}
          style={{ outlineColor: error? "red" : "black"}}
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
        <FormHelperText style={{ marginLeft: "12px", marginBottom: "-3px" }}>
          Categoria
        </FormHelperText>
        <Select
        className={{ classes.select }}
      
          fullWidth
          variant="outlined"
          size="small"
          onChange={onChange}
          style={{ background: "white", height: 42 }}
        >
          <MenuItem key={0} value={0} disabled></MenuItem>
          {options.map((item, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {item}
            </MenuItem>
          ))}
        </Select>
        {error ? <ErrorText>Selecione uma categoria</ErrorText> : undefined}
      </>
    );
}
