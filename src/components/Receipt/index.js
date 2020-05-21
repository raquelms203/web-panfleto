import React, { useState, useEffect, useRef } from "react";
import { Grid, Button, List, CircularProgress } from "@material-ui/core";
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
  const [loading, setLoading] = useState(false);

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
        } else if ((item.size / 1024 / 1024).toFixed(4) > 1) {
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
        if ((item.size / 1024 / 1024).toFixed(4) > 1)
          list.push({ error: 2, file: item });
        else list.push({ error: 0, file: item });
      }
      setReceipts(list);
    }
  };
  const handleClick = () => {
    inputFile.current.click();
  };

  const sendReceipts = async (event) => {
    console.log("send");
    event.preventDefault();
    setLoading(true);
    for (let i = 0; i < receipts.length; i++) {
      let archive;
      let list = [];
      // Resizer.imageFileResizer(
      //   receipts[i].file,
      //   600,
      //   600,
      //   "PNG",
      //   100,
      //   0,
      //   async (uri) => {
      //    list.push(receipts[i]); //uri
      //    archive = new File(list, receipts[i].file.name, { type: uri.type });
      list.push(receipts[i]);
      archive = new File (list, receipts[i].file.name);
      let fd = new FormData();
      fd.append("file", archive);
      await apiADM
        .put(`hired/${idHired}?managerId=${idManager}`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          console.log(response);
          toast.success("Comprovante adicionado com sucesso!");
        })
        .catch((error) => {
          console.log(error);
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
          else if (Boolean(error.response) && error.response.status === 400) {
            if (error.response.data.message === "Invalid file")
              toast.error("Erro. Comprovante precisa ser imagem e até 1 MB.");
              else toast.error("Erro. É necessário assinar e validar antes.");
          } else toast.error("Ocorreu um erro ao adicionar comprovante!");
        })
        .finally(() => onBack());
      //  return;
      //    },
      //   "blob"
      // );
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
          <Button onClick={handleClick} variant="outlined" color="secondary">
            <input
              multiple
              type="file"
              accept=".png .jpeg .jpg"
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
            {loading ? (
              <Grid container justify="center">
                <Grid item>
                  <CircularProgress size={35} />
                </Grid>
              </Grid>
            ) : (
              <StyledButton
                disabled={hasError || receipts.length === 0}
                onClick={(event) => {
                  console.log("click");
                  sendReceipts(event);
                }}
                variant="contained"
                size="large"
                color="secondary"
              >
                <FontButton>SALVAR</FontButton>
              </StyledButton>
            )}
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
                        maxHeight: 220,
                        overflowY: "auto",
                      }}
                    >
                      {receipts.map((item, index) => (
                        <Grid item container alignItems="baseline" key={index}>
                          <p
                            className="font-list"
                            style={{ color: item.error > 0 ? "red" : "black" }}
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
                                : "(maior que 1MB)"}
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

          {loading ? (
            <Grid container justify="center">
              <Grid item>
                <CircularProgress size={35} />
              </Grid>
            </Grid>
          ) : (
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
                    console.log("click");
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
          )}
        </>
      )}
    </>
  );
}
