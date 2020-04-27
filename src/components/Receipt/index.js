import React, { useState, useEffect, useRef } from "react";
import { Grid, Button, List } from "@material-ui/core";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { FileDrop } from "react-file-drop";
import { isMobile } from "react-device-detect";
import Resizer from "react-image-file-resizer";
import "./styles.css";
import { apiADM } from "../../services/api";
import { FontButton, StyledButton } from "../FormHired/styles";

export default function Receipt(props) {
  const { onBack, idHired, idManager } = props;
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
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
        } else {
          setHasError(true);
          list.push({ error: true, file: files[i] });
        }
      }
    }
    setReceipts(list);
  };

  const handleImageChange = (event) => {
    let list = [...receipts];
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        list.push({ error: false, file: event.target.files[i] });
      }
      console.log(list);
      setReceipts(list);
    }
  };
  const handleClick = () => {
    inputFile.current.click();
  };

  const sendReceipts = async (event) => {
    event.preventDefault();
    for (let i = 0; i < receipts.length; i++) {
      Resizer.imageFileResizer(
        receipts[i].file,
        400,
        400,
        "PNG",
        100,
        0,
        (uri) => {
          console.log(uri);
        },
        "base64"
      );
      let fd = new FormData();
      fd.append("file", receipts[i].file);
      await apiADM
        .put(`hired/${idHired}?managerId=${idManager}`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast.success("Comprovante adicionado com sucesso!");
        })
        .catch((error) => {
          if (Boolean(error.response) && error.response.status === 401)
            toast.info(
              "Após 1h a sessão expira. Você será redirecionado para a página de login.",
              {
                onClose: function () {
                  history.push("/");
                },
              }
            );
          else if (Boolean(error.response) && error.response.status === 400) {
            toast.error("Erro. É necessário assinar e validar antes.");
          } else toast.error("Ocorreu um erro ao adicionar comprovante!");
        });
    }
    onBack();
  };

  const removeReceipt = (event, item) => {
    let list = [...receipts];
    let i;
    let position;
    for (let i = 0; i < list.length; i++) {
      if (list[i].file.name === item.file.name) {
        position = i;
        break;
      }
    }
    list.splice(position, 1);
    for (i = 0; i < list.length; i++) {
      if (list[i].error) {
        setHasError(true);
        break;
      }
    }
    if (i === list.length) setHasError(false);
    setReceipts(list);
  };

  const mobileView = () => {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={2}
        style={{ marginTop: 30 }}
      >
        <Grid item>
          <Button onClick={handleClick} variant="outlined" color="secondary">
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
        <Grid item container direction="row" justify="flex-end" spacing={2}>
          <Grid item>
            <Button
              size="large"
              style={{ background: "#958a94", color: "white" }}
              onClick={() => onBack()}
            >
              Voltar
            </Button>
          </Grid>
          <Grid item>
            <StyledButton
              style={{ marginRight: 16 }}
              disabled={hasError || receipts.length === 0}
              onClick={sendReceipts}
              variant="contained"
              size="large"
              color="secondary"
            >
              <FontButton>SALVAR</FontButton>
            </StyledButton>
          </Grid>
        </Grid>
      </Grid>
    );
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
      {isMobile ? (
        mobileView()
      ) : (
        <>
          <div className="drag">
            <FileDrop onDrop={handleImageDrop}>
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
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="stretch"
                  style={{ height: "40vh" }}
                >
                  <Grid item>
                    <List
                      dense
                      component="nav"
                      style={{
                        marginLeft: 8,
                        maxHeight: 220,
                        overflowY: "auto",
                      }}
                    >
                      {receipts.map((item, index) => (
                        <Grid item container alignItems="baseline" key={index}>
                          <p
                            className="font-list"
                            style={{ color: item.error ? "red" : "black" }}
                          >
                            {item.file.name}
                          </p>
                          {item.error ? (
                            <p
                              className="font-list"
                              style={{ color: "red", marginLeft: 5 }}
                            >
                              (formato não suportado)
                            </p>
                          ) : undefined}
                          <Button
                            size="small"
                            onClick={(event) => {
                              removeReceipt(event, item);
                            }}
                          >
                            X
                          </Button>
                        </Grid>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              )}
            </FileDrop>
          </div>
          <div style={{ height: 16 }}></div>
          <Grid container direction="row" justify="flex-end" spacing={2}>
            <Grid item>
              <Button
                size="large"
                style={{ background: "#958a94", color: "white" }}
                onClick={() => onBack()}
              >
                Voltar
              </Button>
            </Grid>
            <Grid item>
              <StyledButton
                style={{ marginRight: 16 }}
                disabled={hasError || receipts.length === 0}
                onClick={sendReceipts}
                variant="contained"
                size="large"
                color="secondary"
              >
                <FontButton>SALVAR</FontButton>
              </StyledButton>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
