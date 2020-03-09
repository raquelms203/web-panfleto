import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export default function DropdownCities(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const { list, onChange } = props;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1000); 

      if (active) {
        setOptions(list);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, list]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      size="small"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={() => onChange()}
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={option => option}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          fullWidth
          label="Selecione a cidade"
          variant="outlined"
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
        />
      )}
    />
  );
}
