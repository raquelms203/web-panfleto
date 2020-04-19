import React, { useRef } from "react";
import { FileDrop } from "react-file-drop";
import { Grid, Button } from "@material-ui/core";
import "./styles.css";

export default function Receipt(props) {
  const inputFile = useRef(null);

  const handleImageChange = (event) => {
    if (event.target.files) {
      console.log(event.target.files);
      // let reader = new FileReader();
      // reader.onload = (e) => {
      //   reader.readAsDataURL(event.target.files[0]);
      // };
    }
  };
  const handleClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
    console.log(inputFile);
  };
  return (
    <div className="drag">
      <FileDrop
        // onFrameDragEnter={(event) => console.log("onFrameDragEnter", event)}
        // onFrameDragLeave={(event) => console.log("onFrameDragLeave", event)}
        // onFrameDrop={(event) => console.log("onFrameDrop", event)}
        // onDragOver={(event) => console.log("onDragOver", event)}
        // onDragLeave={(event) => console.log("onDragLeave", event)}
        onDrop={(files, event) => console.log("onDrop!", files, event)}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>Arraste as imagens aqui</Grid>
          <Grid item>ou</Grid>
          <Grid item>
            <Button onClick={handleClick} variant="outlined" color="secondary" >
              <input
                type="file"
                id="file"
                onChange={handleImageChange}
                ref={inputFile}
                style={{ display: "none" }}
              ></input>
              Selecione arquivos
            </Button>
          </Grid>
        </Grid>
      </FileDrop>
    </div>
  );
}
