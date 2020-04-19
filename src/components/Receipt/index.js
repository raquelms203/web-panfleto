import React, { useRef, useState, useEffect } from "react";
import { FileDrop } from "react-file-drop";
import { Grid, Button } from "@material-ui/core";
import "./styles.css";

import ConfirmReceipt from "../ConfirmReceipt";

export default function Receipt(props) {
  const { onBack } = props;
  const inputFile = useRef(null);
  const [receipts, setReceipts] = useState([]);

  const handleImageDrop = (files, event) => {
    let list = [...receipts];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (
          files[i].type === "image/png" ||
          files[i].type === "image/jpeg" ||
          files[i].type === "image/jpg"
        ) {
          list.push({ error: false, file: files[i] });
        } else list.push({ error: true, file: files[i] });
      }
    }
    setReceipts(list);
  };

  const handleImageChange = (event) => {
    let list = [...receipts];
    if (event.target.files) {
      console.log(event.target.files);
      for (let i = 0; i < event.target.files.length; i++) {
        list.push({ error: false, file: event.target.files[0] });
      }
      setReceipts(list);
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

  useEffect(() => {
    document.body.addEventListener(
      "drop",
      function (e) {
        e.preventDefault();
      },
      false
    );
  }, []);

  return (
    <>
      <div className="drag">
        <FileDrop
          // onFrameDragEnter={(event) => console.log("onFrameDragEnter", event)}
          // onFrameDragLeave={(event) => console.log("onFrameDragLeave", event)}
          // onFrameDrop={(event) => console.log("onFrameDrop", event)}
          // onDragOver={(event) => console.log("onDragOver", event)}
          // onDragLeave={(event) => console.log("onDragLeave", event)}
          onDrop={handleImageDrop}
          // console.log("onDrop!", files, event)
        >
          {receipts.length === 0 ? (
            <Grid
              container
              direction="column"
              style={{ height: "40vh" }}
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>Arraste as imagens aqui</Grid>
              <Grid item>ou</Grid>
              <Grid item>
                <Button
                  onClick={handleClick}
                  variant="outlined"
                  color="secondary"
                >
                  <input
                    multiple
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    id="file"
                    onChange={handleImageChange}
                    ref={inputFile}
                    style={{ display: "none" }}
                  ></input>
                  Selecione arquivos
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item direction="column" style={{ height: "40vh" }}>
              <ConfirmReceipt receipts={receipts}/>
            </Grid>
          )}
        </FileDrop>
      </div>
      <div style={{ height: 16 }}></div>
      <Grid container justify="flex-end">
        <Grid item>
          <Button
            size="large"
            style={{ background: "#958a94", color: "white" }}
            onClick={() => onBack()}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
