import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { apiADM } from "../../services/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

import { Body, Bold, Page, Title } from "./styles";

export default function (props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { politicId, managerId, hiredId } = useParams();
  const [politic, setPolitic] = useState({});
  const [hired, setHired] = useState({});
  const [typePolitic, setTypePolitic] = useState({});

  useEffect(() => {
    axios
      .all([
        apiADM.get(`/hired/${hiredId}?managerId=${managerId}`),
        apiADM.get(
          `/politic/${politicId}?adminId=${localStorage.getItem("userId")}`
        ),
      ])
      .then(
        axios.spread((resp1, resp2) => {
          if (resp2.data.type === 1) setTypePolitic("Prefeito");
          else setTypePolitic("Vereador");
          setHired(resp1.data);
          setPolitic(resp2.data);
          setLoading(false);
        })
      )
      .catch((e1, e2) => {
        if (Boolean(e1.response) && e1.response.status === 401) {
          toast.info(
            "Após 1h a sessão expira. Você será redirecionado para a página de login.",
            {
              onClose: function () {
                history.push("/");
                localStorage.setItem("isLogged", false);
              },
            }
          );
        } else toast.error("Ocorreu um erro ao carregar os dados!");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Grid container justify="center" style={{ minHeight: "99vh" }}>
      <Page
        item
        container
        direction="column"
        alignItems="center"
        style={{ marginTop: 10 }}
      >
        <Grid item xs sm md>
          <br />
          <br />
          <Title>
            CONTRATO DE PRESTAÇÃO DE SERVIÇOS REMUNERADO POR PRAZO DETERMINADO
            PARA FINS DE CAMPANHA ELEITORAL
          </Title>
          <br />
          <Body>
            {`  Pelo presente instrumento particular, de um lado ${hired.name} (PESSOA
            FÍSICA), CPF ${hired.document}, residente e domiciliado(a) na Rua ${hired.street},
            nº. ${hired.number}, Bairro ${hired.district}, cidade
            ${hired.city}, telefone ${hired.phone}, CEP ${hired.zipCode} doravante
            denominado CONTRATADO, e de outro ${politic.name}, ${typePolitic},
            portador do CPF nº ${politic.document}, com sede na Rua ${politic.street}, nº
            ${politic.number}, Bairro ${politic.district}, na cidade de ${politic.city}
           , CEP: ${politic.zipcode} doravante denominado
            CONTRATANTE, celebram entre si o presente CONTRATO DE PRESTAÇÃO DE
            SERVIÇOS REMUNERADOS POR PRAZO DETERMINADO PARA FINS DE CAMPANHA
            ELEITORAL, sem vínculo empregatício, nos termos do artigo 100, da
            Lei 9.504/97, conforme as seguintes cláusulas:`}
          </Body>
          <br />
          <Bold>
            Cláusula 1ª -
            <span>{` O presente contrato tem por objeto a prestação de serviços, pelo CONTRATADO para a função de ${hired.office}.`}</span>
          </Bold>
          <br />
          <Bold>
            Cláusula 2º -
            <span>
              {` O presente contrato terá vigência a partir da presente data até o
              final do período de campanha eleitoral, encerrando-se
              imediatamente após o transcurso do prazo.`}
            </span>
          </Bold>
          <br />
          <Bold>
            Parágrafo primeiro -
            <span>
              {` O contrato pode ser rescindido a qualquer tempo por qualquer das
              partes, sem justificativa ou aviso prévio.`}
            </span>
          </Bold>
          <br />
          <Bold>
            Parágrafo segundo -
            <span>
              {` A rescisão do contrato não produzirá nenhum encargo, vínculo
              trabalhista ou indenização, tendo em vista estar fundado no artigo
              100, da Lei 9.504/97.`}
            </span>
          </Bold>
          <br />
          <Bold>
            Cláusula 3º -
            <span>
              {` Pela prestação dos serviços ora ajustados, o CONTRATANTE pagará ao
              CONTRATADO o valor de ${hired.payment}, cujo pagamento se dará até
              o dia da eleição.`}
            </span>
          </Bold>
          <br />
          <Bold>
            Parágrafo único -
            <span>
              {` Na eventualidade de ocorrer a rescisão antecipada do contrato, os
              dias trabalhados serão pagos proporcionalmente.`}
            </span>
          </Bold>
          <br />
          <Bold>
            Cláusula 4º -
            <span>
              {` Fica eleito o foro da Comarca de ${politic.city} para dirimir quaisquer` +
                ` dúvidas decorrentes do presente contrato.`}
            </span>
          </Bold>
          <br />
          <Body>
            Por estarem justos e acertados entre si, assinam o presente
            contrato, em 2(duas) vias de igual teor, para que produzam os
            efeitos jurídicos e legais.
          </Body>
          <br />
          <Body
            style={{ textAlign: "center" }}
          >{`${politic.city}, ${hired.day} de ${hired.month} de 2020.`}</Body>
          <br />
          <Body
            style={{ textAlign: "center" }}
          >[As assinaturas estarão disponíveis apenas após concluir o contrato.]</Body>
          <br />
          <br />
          <Bold>DOCUMENTOS:</Bold>
          <br />
          <Body>
            1. Cópia dos Documentos pessoais. (Documento pessoal com foto e
            CPF).
          </Body>
          <br />
          <Body>2. Cópia de Comprovante de residência atualizado.</Body>
          <br />
          <Body>
            3. Cópia da Carteira de habilitação (apenas em caso de motorista).
          </Body>
        </Grid>
      </Page>
    </Grid>
  );
}
