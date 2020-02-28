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
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import CommuteIcon from "@material-ui/icons/Commute";
import ContactsIcon from "@material-ui/icons/Contacts";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DescriptionIcon from "@material-ui/icons/Description";
import PrintIcon from "@material-ui/icons/Print";
import CallSplitIcon from "@material-ui/icons/CallSplit";

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

export default function Menu({ title }) {
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
          icon={<CardTravelIcon />}
          address="sellerdetails"
        />
        <AppItem
          label="Cliente"
          icon={<ContactsIcon />}
          address="clientdetails"
        />
        <AppItem
          label="Produtos"
          icon={<ShoppingCartIcon />}
          address="productdetails"
        />
        <AppItem
          label="Contrato"
          icon={<DescriptionIcon />}
          address="contractoptions"
        />
        <AppItem
          label="Kit Hidráulico"
          icon={<CallSplitIcon address="hidraulicdetails" />}
        />
        <AppItem
          label="Pagamento"
          icon={<CreditCardIcon />}
          address="paymentdetails"
        />
        <AppItem
          label="Frete"
          icon={<CommuteIcon />}
          address="freightdetails"
        />
        <AppItem
          label="Outros"
          icon={<BookmarksIcon />}
          address="otherdetails"
        />
        <AppItem
          label="Confirmar"
          icon={<DoneOutlineIcon />}
          address="confirm"
        />
        <AppItem label="Imprimir" icon={<PrintIcon />} address="success" />
      </List>
      <Divider />
      <List>
        <AppItem label="Sincronizar Dados" icon={<CloudDownloadIcon />} />
        <AppItem label="Sair" icon={<ExitToAppIcon />} />
      </List>
    </div>
  );

  return (
    <App position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </App>
  );
}
