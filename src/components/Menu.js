import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";
import { store } from "../store";
import pjson from "../../package.json";

import {
  loadSellers,
  loadOperation_natures,
  loadSystem_clients,
  loadSeller_clients,
  loadProducts,
  loadKits,
  loadMachines,
  loadImportant_infos,
  loadConditions,
  loadTool_types,
  loadPayment_methods,
  loadFreights
} from "../store/actions api/fetchBD";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CircularProgress from "@material-ui/core/CircularProgress";

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

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const App = styled(AppBar)({
  margin: "0 0 20px 0"
});

class AppItem extends Component {
  render() {
    return (
      <ListItem button component={Link} to={this.props.address}>
        <ListItemIcon>{this.props.icon}</ListItemIcon>
        <ListItemText
          primary={this.props.label}
          secondary={this.props.subtitle}
        />
      </ListItem>
    );
  }
}

function Menu({ title, values }) {
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
          label="Tipo de Contrato"
          icon={<DescriptionIcon />}
          address="contractoptions"
        />
        <AppItem
          label="Detalhes do Contrato"
          icon={<CallSplitIcon />}
          address="contractdetails"
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
        <AppItem
          label="Sincronizar Dados "
          subtitle={dataAtualFormatada(values.sync_date)}
          icon={<CloudDownloadIcon />}
        />
        <AppItem label="Sair" icon={<ExitToAppIcon />} address="" />
      </List>
    </div>
  );

  function dataAtualFormatada(input) {
    var data = new Date(input),
      dia = (data.getDate() + 1).toString().padStart(2, "0"),
      mes = (data.getMonth() + 1).toString().padStart(2, "0"), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  }

  const [loading, setLoading] = React.useState("");

  async function SyncData() {
    setLoading(<CircularProgress />);
    await store.dispatch(loadSellers());
    await store.dispatch(loadSellers());
    await store.dispatch(loadOperation_natures());
    await store.dispatch(loadSystem_clients());
    await store.dispatch(loadSeller_clients());
    await store.dispatch(loadProducts());
    await store.dispatch(loadKits());
    await store.dispatch(loadMachines());
    await store.dispatch(loadImportant_infos());
    await store.dispatch(loadConditions());
    await store.dispatch(loadTool_types());
    await store.dispatch(loadPayment_methods());
    await store.dispatch(loadFreights());
    values.sync_date = new Date();
  }

  return (
    <div className={classes.root}>
      <App position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="p" align="right">
            v{pjson.version}
          </Typography>
        </Toolbar>
        <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
          {sideList("left")}
        </Drawer>
      </App>
    </div>
  );
}

const mapStateToProps = state => ({
  values: getFormValues("infoReduxForm")(state)
});

export default connect(mapStateToProps)(Menu);
