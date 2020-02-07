import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { styled } from "@material-ui/core/styles";

// import { Container } from './styles';

const App = styled(AppBar)({
  margin: "0 0 20px 0"
});

export default class Menu extends Component {
  render() {
    return (
      <App position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{this.props.title}</Typography>
        </Toolbar>
      </App>
    );
  }
}
