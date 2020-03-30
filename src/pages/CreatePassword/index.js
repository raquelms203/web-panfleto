import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";

import { apiADM } from "../../services/api";

export default function CreatePassword(props) {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (event) => {

    event.preventDefault();
    let path = window.location.pathname;
    let href = window.location.href;
    let token = path.split("/")[2];
    let type = href.split("=")[1];
    apiADM
      .put(`${type}/create-password/${token}`, {
        password: password
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };


  return (
    <form onSubmit={handleSubmit}>
      <TextField
        style={{ width: 350 }}
        InputLabelProps={{ shrink: true }}
        size="small"
        label="Senha"
        variant="outlined"
        onChange={event =>
          // setPassword({
          //   value: event.target.value,
          //   error: password.error
          // })
          setPassword(event.target.value)
        }
      ></TextField>
      <div style={{ height: 20 }}></div>
      <TextField
        style={{ width: 350 }}
        InputLabelProps={{ shrink: true }}
        size="small"
        label="Confirmar senha"
        variant="outlined"
        onChange={event =>
          // setPassword({
          //   value: event.target.value,
          //   error: password.error
          // })
          setPassword(event.target.value)
        }
      ></TextField>
      <Button type="submit">OK</Button>
    </form>
  );
}
