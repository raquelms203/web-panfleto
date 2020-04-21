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
        spacing={4}
      
      >
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="center"
          item
          xs={12}
          sm={12}
          md={5}
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
        <Grid item container justify="flex-end" xs={12} sm={12} md={7} lg={6}>
          <img src={file} alt=""></img>
        </Grid>
      </Container>
    </Grid>
  );
}
