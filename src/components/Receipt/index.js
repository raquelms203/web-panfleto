import React, { useState, useEffect, useRef } from "react";
import { Grid, Button, List, LinearProgress } from "@material-ui/core";
import { CheckCircle, Cancel } from "@material-ui/icons";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { FileDrop } from "react-file-drop";
import { isMobile } from "react-device-detect";

import "./styles.css";
import { apiADM } from "../../services/api";
import { FontButton, StyledButton } from "../FormHired/styles";

export default function Receipt(props) {
  const { onBack, idHired, idManager } = props;
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  const inputFile = useRef(null);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseFiles, setResponseFiles] = useState([]);
  const [closeDisabled, setCloseDisabled] = useState(true);
  const [hasResponseError, setHasResponseError] = useState(false);

  const handleImageDrop = (files, event) => {
    let list = [...receipts];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        let item = files[i];
        if (
          item.type !== "image/png" &&
          item.type !== "image/svg" &&
          item.type !== "image/jpeg"
        ) {
          setHasError(true);
          list.push({ error: 1, file: files[i] });
        } else if ((item.size / 1024 / 1024).toFixed(4) > 1000) {
          setHasError(true);
          list.push({ error: 2, file: files[i] });
        } else list.push({ error: 0, file: files[i] });
      }
    }
    setReceipts(list);
  };

  const handleImageChange = (event) => {
    let list = [...receipts];
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        let item = event.target.files[i];
        if ((item.size / 1024 / 1024).toFixed(4) > 1000) {
          setHasError(true);
          list.push({ error: 2, file: item });
        } else list.push({ error: 0, file: item });
      }
      setReceipts(list);
    }
  };
  const handleClick = () => {
    inputFile.current.click();
  };

  const sendReceipts = async (event) => {
    event.preventDefault();
    setLoading(true);
    let f = [...responseFiles];
    for (let i = 0; i < receipts.length; i++) {
      let fd = new FormData();
      fd.append("file", receipts[i].file);
      await apiADM
        .put(`hired/${idHired}?managerId=${idManager}`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          f.push({ file: receipts[i].file, error: false });
        })
        .catch((error) => {
          if (Boolean(error.response) && error.response.status === 401)
            toast.info(
              "Após 1h a sessão expira. Você será redirecionado para a página de login.",
              {
                onClose: function () {
                  history.push("/");
                  localStorage.setItem("isLogged", false);
                },
              }
            );
          else {
            if (!hasResponseError) setHasResponseError(true);
            f.push({ file: receipts[i].file, error: true });
          }
        })
        .finally(() => {
          setResponseFiles(f);
          if (i === receipts.length - 1) {
            setCloseDisabled(false);
          }
        });
    }
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
      if (list[i].error > 0) {
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
          <Button onClick={() => {  
            handleClick();
          }} variant="outlined" color="secondary">
            <input
              multiple
              type="file"
              accept=".png .jpeg .jpg" capture="user"
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
              onClick={() =>{ onBack() }}
            >
              Voltar
            </Button>
          </Grid>
          <Grid item>
            <StyledButton
              disabled={hasError || receipts.length === 0}
              onClick={(event) => {
                sendReceipts(event);
              }}
              variant="contained"
              size="large"
              color="secondary"
            >
              <FontButton>SALVAR</FontButton>
            </StyledButton>

            <Grid item>
              <p style={{ fontSize: 12, marginTop: 10 }}>
                (.png, .jpeg ou .jpg)
              </p>
            </Grid>
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

  if (loading) {
    return (
      <Grid container direction="column" spacing={2}>
        <Grid item container direction="row-reverse" style={{ width: 400 }}>
          {!closeDisabled ? (
            <>
              <div
                style={{ width: 400, height: 3, backgroundColor: "#2B5279" }}
              ></div>{" "}
              {`Concluído (${(responseFiles.filter((item) => !item.error)).length}/${receipts.length})`}
            </>
          ) : (
            <>
              <LinearProgress
                style={{ width: 400 }}
                color="secondary"
                variant="indeterminate"
              />
              Carregando...
            </>
          )}
        </Grid>
        <Grid item xs sm md>
          <List
            dense
            component="nav"
            style={{
              marginLeft: 8,
              maxHeight: 245,
              overflowY: "auto",
            }}
          >
            {responseFiles.map((item, index) =>
              item.error ? (
                <Grid item container key={index}>
                  <Grid item>
                    <Cancel style={{ color: "firebrick" }} />
                  </Grid>
                  <Grid item>
                    <p className="font-response" style={{ color: "firebrick" }}>
                      {item.file.name}
                    </p>
                  </Grid>
                </Grid>
              ) : (
                <Grid item container key={index}>
                  <Grid item>
                    <CheckCircle style={{ color: "green" }} />
                  </Grid>
                  <Grid item>
                    <p className="font-response" style={{ color: "green" }}>
                      {item.file.name}
                    </p>
                  </Grid>
                </Grid>
              )
            )}
          </List>
          {hasResponseError && !closeDisabled ? (
            <Grid item style={{ marginLeft: 12, marginTop: 10 }}>
              <p style={{ color: "red", fontSize: 14 }}>
                Tente enviar novamente o(s) arquivo(s) com erro.
              </p>
            </Grid>
          ) : undefined}
        </Grid>
        <Grid item container justify="flex-end" xs sm md spacing={2}>
          <Grid item>
            {hasResponseError ? (
              <Button
                size="large"
                style={{ background: "#958a94", color: "white" }}
                onClick={() => {
                  setLoading(false);
                  setCloseDisabled(true);
                  setHasResponseError(false);
                  setReceipts([]);
                  setResponseFiles([]);
                }}
              >
                Tentar Novamente
              </Button>
            ) : undefined}
          </Grid>
          <Grid item>
            <Button
              onClick={onBack}
              variant="contained"
              size="large"
              color="secondary"
              style={{ color: "white" }}
            >
              FECHAR
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  } else
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
                          type="file"
                          multiple
                          accept=".png, .jpeg, .jpg"
                          id="file"
                          onChange={handleImageChange}
                          ref={inputFile}
                          style={{ display: "none" }}
                        ></input>
                        Selecione arquivos
                      </Button>
                      <Grid item>
                        <p style={{ fontSize: 12, marginTop: 10 }}>
                          (.png, .jpeg ou .jpg)
                        </p>
                      </Grid>
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
                          maxHeight: 245,
                          overflowY: "auto",
                        }}
                      >
                        {receipts.map((item, index) => (
                          <Grid
                            item
                            container
                            alignItems="baseline"
                            key={index}
                          >
                            <p
                              className="font-list"
                              style={{
                                color: item.error > 0 ? "red" : "black",
                              }}
                            >
                              {item.file.name}
                            </p>
                            {item.error > 0 ? (
                              <p
                                className="font-list"
                                style={{ color: "red", marginLeft: 5 }}
                              >
                                {item.error === 1
                                  ? "(formato não suportado)"
                                  : "(maior que 1GB)"}
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
                  onClick={(event) => {
                    sendReceipts(event);
                  }}
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
