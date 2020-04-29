import React from "react";
import { Grid } from "@material-ui/core";

import { Container } from "../../components/FormHired/styles";
import { Message, Title } from "./styles";

export default function ErrorPage(props) {
  const { title, message, file } = props;

  return (
    <Grid
      container
      direction="column"
      style={{ overflowX: "hidden", overflowY: "hidden", minHeight: "99vh" }}
    >
      <Container
        container
        justify="center"
        alignItems="center"
        spacing={2}
      
      >
        <Grid
          container
          direction="column"
          justify="center"
          spacing={2}
          alignItems="center"
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          style={{ background: "white", minHeight: "99vh" }}
        >
          <Grid item>
            <Title>{title}</Title>
          </Grid>
          <Grid item>
            <Message>{message}</Message>
          </Grid>
        </Grid>
        <Grid item container justify="center" xs={12} sm={12} md={6} lg={6}>
          <img src={file} style={{ height: 400, width: 400 }} alt=""></img>
        </Grid>
      </Container>
    </Grid>
  );
}
