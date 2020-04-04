import React from "react";
import { Grid } from "@material-ui/core";

import { Container } from "../../components/FormHired/styles";
import { Message, Title } from "./styles";

export default function ErrorPage(props) {
  const { title, message, file } = props;

  return (
    <Grid container direction="column" style={{ overflowX: "hidden" }}>
      <Container
        container
        justify="center"
        alignItems="center"
        spacing={4}
        style={{ minHeight: "99vh" }}
      >
        <Grid item xs={12} sm={12} md={5} lg={6}>
          <Title>{title}</Title>
          <Message>{message}</Message>
        </Grid>
        <Grid item container justify="flex-end" xs={12} sm={12} md={7} lg={6}>
          <img src={file}></img>
        </Grid>
      </Container>
    </Grid>
  );
}
