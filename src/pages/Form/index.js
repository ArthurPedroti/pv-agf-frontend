import React from "react";
import Userform from "./components/Userform";
import Container from "@material-ui/core/Container";

export default function Form() {
  return (
    <Container maxWidth="sm" component="main" align="center">
      <Userform />
    </Container>
  );
}
