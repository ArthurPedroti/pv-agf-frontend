import React, { Component } from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { styled } from "@material-ui/core/styles";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

const App = styled(AppBar)({
  margin: "0 0 20px 0"
});

class AppItem extends Component {
  render() {
    return (
      <ListItem button component={Link} to={this.props.address}>
        <ListItemIcon>{this.props.icon}</ListItemIcon>
        <ListItemText primary={this.props.label} />
      </ListItem>
    );
  }
}

export default function Menu({ title, history }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <AppItem
          label="Vendedor"
          icon={<KeyboardArrowRightIcon />}
          address="sellerdetails"
        />
        <AppItem
          label="Cliente"
          icon={<KeyboardArrowRightIcon />}
          address="clientdetails"
        />
        <AppItem
          label="Produtos"
          icon={<KeyboardArrowRightIcon />}
          address="productdetails"
        />
        <AppItem
          label="Contrato"
          icon={<KeyboardArrowRightIcon />}
          address="contractoptions"
        />
        <AppItem
          label="Kit Hidráulico"
          icon={<KeyboardArrowRightIcon address="hidraulicdetails" />}
        />
        <AppItem
          label="Pagamento"
          icon={<KeyboardArrowRightIcon />}
          address="paymentdetails"
        />
        <AppItem
          label="Frete"
          icon={<KeyboardArrowRightIcon />}
          address="freightdetails"
        />
        <AppItem
          label="Outros"
          icon={<KeyboardArrowRightIcon />}
          address="otherdetails"
        />
        <AppItem
          label="Confirmar"
          icon={<KeyboardArrowRightIcon />}
          address="confirm"
        />
        <AppItem
          label="Imprimir"
          icon={<KeyboardArrowRightIcon />}
          address="success"
        />
      </List>
      <Divider />
      <List>
        <AppItem label="Sincronizar Dados" icon={<DataUsageIcon />} />
        <AppItem label="Sair" icon={<ExitToAppIcon />} />
      </List>
    </div>
  );

  return (
    <App position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon onClick={toggleDrawer("left", true)} />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </App>
  );
}
