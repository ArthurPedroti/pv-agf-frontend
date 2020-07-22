import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFormValues, change, destroy } from 'redux-form';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CircularProgress from '@material-ui/core/CircularProgress';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import CommuteIcon from '@material-ui/icons/Commute';
import ContactsIcon from '@material-ui/icons/Contacts';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DescriptionIcon from '@material-ui/icons/Description';
import ListIcon from '@material-ui/icons/List';
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import PrintIcon from '@material-ui/icons/Print';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import Button from '@material-ui/core/Button';
import * as serviceWorker from '../serviceWorker';

import { Creators as SelectCreators } from '../store/ducks/select_infos';
import { Creators as PaymentCreators } from '../store/ducks/paymentList';
import { Creators as ProductCreators } from '../store/ducks/productList';
import { loadSystem_clients, loadProducts } from '../store/actions api/fetchBD';
import pjson from '../../package.json';
import { store } from '../store';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  offset: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const App = styled(AppBar)({
  margin: '0 0 20px 0',
});

const AppItem = ({ address, label, icon, subtitle }) => (
  <ListItem button component={Link} to={address}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={label} secondary={subtitle} />
  </ListItem>
);

const AppItemAction = ({ label, action, icon, subtitle }) => (
  <ListItem button onClick={action}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={label} secondary={subtitle} />
  </ListItem>
);

function Menu({ title, values, dispatch, history }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  function dataAtualFormatada(input) {
    const data = new Date(input);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // +1 pois no getMonth Janeiro começa com zero.
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  const localMode = () => {
    const currentMode = localStorage.getItem('@ASA');
    localStorage.setItem('@ASA', currentMode === 'on' ? 'off' : 'on');
    window.location.reload();
  };

  async function logout() {
    await store.dispatch(change('infoReduxForm', 'login', false));
    await history.push('/');
  }

  async function clearAll() {
    await history.push('/');
    const { sync_date } = values;
    await dispatch(destroy('infoReduxForm'));
    await store.dispatch(change('infoReduxForm', 'login', true));
    await store.dispatch(change('infoReduxForm', 'sync_date', sync_date));
    await store.dispatch(change('infoReduxForm', 'payment_type', false));
    await store.dispatch(change('infoReduxForm', 'contrato', 'nao'));
    await store.dispatch(
      change(
        'infoReduxForm',
        'data_pc',
        new Date().toISOString().substring(0, 10),
      ),
    );
    await store.dispatch(ProductCreators.resetProduct());
    await store.dispatch(PaymentCreators.resetPayment());
    await store.dispatch(SelectCreators.resetSelect());
  }

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function SyncData() {
    handleOpen();
    await store.dispatch(loadSystem_clients());
    await store.dispatch(loadProducts());
    values.sync_date = new Date();
    handleClose();
  }

  async function UpdateServiceWorker() {
    handleOpen();
    await serviceWorker.unregister();
    await serviceWorker.register();
    window.location.reload(false);
    handleClose();
  }

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
          label="Tipo de Pedido"
          icon={<DescriptionIcon />}
          address="orderoptions"
        />
        <AppItem
          label="Detalhes do Pedido"
          icon={<CallSplitIcon />}
          address="orderdetails"
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
        <AppItem label="Gerar PDF" icon={<PrintIcon />} address="success" />
        <AppItem label="Pedidos" icon={<ListIcon />} address="orderslist" />
        <AppItem
          label="Calculadora de Diferencial de Alíquota"
          icon={<EmojiSymbolsIcon />}
          address="differential-rate-calculator"
        />
      </List>
      <Divider />
      <List>
        <AppItemAction
          label="Sincronizar Dados"
          subtitle={dataAtualFormatada(
            values === undefined ? null : values.sync_date,
          )}
          action={SyncData}
          icon={<CloudDownloadIcon />}
        />
        <AppItemAction
          label="Limpar todos os campos"
          icon={<ClearAllIcon />}
          action={clearAll}
        />
        <AppItemAction label="Sair" icon={<ExitToAppIcon />} action={logout} />
      </List>
      <AppItemAction
        icon={<SettingsApplicationsIcon />}
        label="Modo Local"
        subtitle={localStorage.getItem('@ASA')}
        action={localMode}
        address={() => {}}
      />
      <AppItemAction
        icon={<SettingsApplicationsIcon />}
        subtitle={`v${pjson.version}`}
        action={UpdateServiceWorker}
        address={() => {}}
      />
    </div>
  );

  return (
    <>
      <App position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer('left', true)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
          {sideList('left')}
        </Drawer>
      </App>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Sincronizando...</h2>
            <div>
              <CircularProgress style={{ margin: 15 }} />
            </div>

            <Button
              type="button"
              onClick={handleClose}
              variant="contained"
              color="primary"
            >
              Cancelar
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

const mapStateToProps = state => ({
  values: getFormValues('infoReduxForm')(state),
});

export default withRouter(connect(mapStateToProps)(Menu));
