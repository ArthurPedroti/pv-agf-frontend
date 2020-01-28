import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Typography from "@material-ui/core/Typography";

export default class Success extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Success" />
          <br />
          <Typography variant="h4">Thank you for your subimission</Typography>
          <br />
          <Typography variant="body1">
            You will get an email with further instructions
          </Typography>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}
