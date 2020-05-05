import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Grid,
  CircularProgress,
  InputAdornment,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { apiADM } from "../../services/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Body, Bold } from "./styles";

export default function (props) {

  const [loading, setLoading] = useState(true);
  const { politicId, managerId, hiredId } = useParams(); 
  const [politic, setPolitic] = useState({});
  const [hired, setHired] = useState({});

  useEffect(() => {
   axios.all([apiADM.get(`/hired/${hiredId}?managerId=${managerId}`), apiADM.get(`/politic/${politicId}?adminId=${localStorage.getItem("userId")}`)])
     .then(axios.spread((resp1, resp2) => {
          setHired(resp1.data);
          setPolitic(resp2.data);
     })).catch((e1, e2) => { 
      toast.error("Ocorreu um erro ao carregar os dados!");
     });

  }, [])

  return (
    <Grid container justify="center" style={{ minHeight: "99vh" }}>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        style={{ width: "650px", backgroundColor: "white" }}
      >
        <Grid item>
          <br />
          <br />
          <Bold>
            CONTRATO DE PRESTAÇÃO DE SERVIÇOS REMUNERADO POR PRAZO DETERMINADO
            PARA FINS DE CAMPANHA ELEITORAL
          </Bold>
          <br />
          <Body>
          {`  Pelo presente instrumento particular, de um lado ${hired.name} (PESSOA
            FÍSICA), CPF {hired.document}, residente e domiciliado(a) na Rua ${hired.street},
            nº. ${hired.number}, Bairro ${hired.district}, cidade
            ${hired.city}, telefone ${hired.phone}, CEP ${hired.zipcode} doravante
            denominado CONTRATADO, e de outro ${politic.name}, ${politic.type},
            portador do CPF nº ${politic.document}, com sede na Rua ${politic.street}, nº
            ${politic.number}, Bairro ${politic.district}, na cidade de ${politic.city}
           , CEP: ${politic.zipcode} doravante denominado
            CONTRATANTE, celebram entre si o presente CONTRATO DE PRESTAÇÃO DE
            SERVIÇOS REMUNERADOS POR PRAZO DETERMINADO PARA FINS DE CAMPANHA
            ELEITORAL, sem vínculo empregatício, nos termos do artigo 100, da
            Lei 9.504/97, conforme as seguintes cláusulas:`}
          </Body>
        </Grid>
      </Grid>
    </Grid>
  );
}
