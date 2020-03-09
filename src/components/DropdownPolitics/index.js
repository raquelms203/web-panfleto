import React, { useEffect } from "react";
import { Select, FormHelperText, MenuItem } from "@material-ui/core";

export default function DropdownPolitics(props) {
  const { onChange, isFilter, showAll } = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (isFilter === 1) setOptions(["Todos", "Prefeitos", "Vereadores"]);
    else setOptions(["Prefeitos", "Vereadores"]);
  }, [setOptions]);

  return (
    <>
      <FormHelperText>Categoria</FormHelperText>
      <Select fullWidth onChange={onChange} defaultValue={1}>
      {isFilter ? options.map((item, index) => <MenuItem key={index} value={index}>{item}</MenuItem>)
      : <><MenuItem key={0} value={0}>""</MenuItem>
      {options.map((item, index) => <MenuItem key={index+1} value={index+1}>{item}</MenuItem>)}</>}
      </Select>
    </>
  );
}
