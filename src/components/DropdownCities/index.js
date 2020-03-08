import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function DropdownCities(props) {
  const { list, onChange } = props;
  const [loading, setLoading] = useState(false); 

  const wait3sec = (event) => { 
    setLoading(true); 
    setTimeout(function() { 
      setLoading(false);
  }.bind(this), 3000)
  }

  return (
   <Autocomplete
   id="combo-box-demo"
   size="small"
   options={list}
   onChange={onChange}
   getOptionLabel={option => option}
   style={{ background: "white" }}
   renderInput={params => (
     <TextField
       {...params}
       fullWidth
       InputLabelProps={{ shrink: true }}
       InputProps={{
         ...params.InputProps,
         endAdornment: (
           <React.Fragment>
             {loading ? (
               <CircularProgress color="inherit" size={20} />
             ) : null}
             {params.InputProps.endAdornment}
           </React.Fragment>
         )
       }}
       label="Selecione a cidade"
       variant="outlined"
     />
   )}
 />
  );
}
