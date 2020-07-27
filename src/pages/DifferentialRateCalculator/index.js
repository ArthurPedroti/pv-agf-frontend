import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { bindActionCreators } from 'redux';

import NumberFormat from 'react-number-format';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import products from './dbs/products.json';
import normal from './dbs/normal.json';
import base_reduction from './dbs/base_reduction.json';
import imported4 from './dbs/imported4.json';
import icms12 from './dbs/icms12.json';

import Menu from '../../components/Menu';

import { Creators as ProductActions } from '../../store/ducks/productList';

const useStyles = makeStyles(() => ({
  card: {
    margin: 20,
  },
  cardContent: {
    textAlign: 'left',
    padding: 24,
  },
  form: {
    marginTop: 20,
  },
}));

const ufs = [
  { label: 'AC' },
  { label: 'AL' },
  { label: 'AP' },
  { label: 'AM' },
  { label: 'BA' },
  { label: 'CE' },
  { label: 'DF' },
  { label: 'ES' },
  { label: 'GO' },
  { label: 'MA' },
  { label: 'MT' },
  { label: 'MS' },
  { label: 'MG' },
  { label: 'PA' },
  { label: 'PB' },
  { label: 'PR' },
  { label: 'PE' },
  { label: 'PI' },
  { label: 'RJ' },
  { label: 'RN' },
  { label: 'RS' },
  { label: 'RO' },
  { label: 'RR' },
  { label: 'SC' },
  { label: 'SP' },
  { label: 'SE' },
  { label: 'TO' },
];

let DifferentialRateCalculator = ({ submitting }) => {
  const classes = useStyles();

  const [value, setValue] = useState('');
  const [billedFrom, setBilledFrom] = useState('');
  const [destiny, setDestiny] = useState('');
  const [product, setProduct] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [icmsOrigin, setIcmsOrigin] = useState('');
  const [icmsDestiny, setIcmsDestiny] = useState('');

  // Calculate the origin icms
  useEffect(() => {
    const productFound = products.find(
      productArray => productArray.product === product,
    );

    if (!productFound || !billedFrom || !destiny || !product) {
      return;
    }

    if (productFound.type === 2) {
      if (billedFrom === destiny) {
        const originRate = base_reduction.find(item => item.id === billedFrom);
        setIcmsOrigin(originRate[destiny]);
        return;
      }
      const originRate = imported4.find(item => item.id === billedFrom);
      setIcmsOrigin(originRate[destiny]);
      return;
    }

    if (productFound.type === 1) {
      const originRate = base_reduction.find(item => item.id === billedFrom);
      setIcmsOrigin(originRate[destiny]);
      return;
    }

    if (productFound[billedFrom] === 'SIM' && billedFrom === destiny) {
      const originRate = icms12.find(item => item.id === billedFrom);
      setIcmsOrigin(originRate[destiny]);
      return;
    }

    if (productFound.type === 4) {
      const originRate = icms12.find(item => item.id === billedFrom);
      setIcmsOrigin(originRate[destiny]);
      return;
    }

    if (productFound.type === 3) {
      const originRate = imported4.find(item => item.id === billedFrom);
      setIcmsOrigin(originRate[destiny]);
      return;
    }

    if (productFound.type === 5) {
      const originRate = normal.find(item => item.id === billedFrom);
      setIcmsOrigin(originRate[destiny]);
      return;
    }

    setIcmsOrigin('ERRO NO TIPO');
  }, [billedFrom, destiny, product]);

  // Calculate the destiny icms
  useEffect(() => {
    const productFound = products.find(
      productArray => productArray.product === product,
    );

    if (!productFound || !billedFrom || !destiny || !product) {
      return;
    }

    if (productFound.type === 2 || productFound.type === 1) {
      const originRate = base_reduction.find(item => item.id === destiny);
      setIcmsDestiny(originRate[destiny]);
      return;
    }

    if (productFound[destiny] === 'SIM') {
      const originRate = icms12.find(item => item.id === destiny);
      setIcmsDestiny(originRate[destiny]);
      return;
    }

    if (productFound.type === 3) {
      const originRate = imported4.find(item => item.id === destiny);
      setIcmsDestiny(originRate[destiny]);
      return;
    }

    if (productFound.type === 5) {
      const originRate = normal.find(item => item.id === destiny);
      setIcmsDestiny(originRate[destiny]);
      return;
    }

    if (productFound[destiny] === 'NÃO') {
      const originRate = normal.find(item => item.id === destiny);
      setIcmsDestiny(originRate[destiny]);
      return;
    }

    setIcmsDestiny('ERRO NO TIPO');
  }, [destiny, billedFrom, product]);

  useEffect(() => {
    if (!product) {
      return;
    }
    const productFound = products.find(
      productArray => productArray.product === product,
    );
    setProductInfo(productFound);
  }, [product]);

  const handleSubmit = () => {};

  return (
    <div>
      <Menu title="Calculadora de Diferencial de Alíquota" />

      <Container maxWidth="md" component="main" align="center">
        <Container>
          <FormControl fullWidth className={classes.form}>
            <InputLabel>Faturado de:</InputLabel>
            <NativeSelect
              required
              onChange={e => setBilledFrom(e.target.value)}
            >
              <option value="" />
              {ufs.map(option => (
                <option key={option.label}>{option.label}</option>
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl fullWidth className={classes.form}>
            <InputLabel>Destino:</InputLabel>
            <NativeSelect required onChange={e => setDestiny(e.target.value)}>
              <option value="" />
              {ufs.map(option => (
                <option key={option.label}>{option.label}</option>
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl fullWidth className={classes.form}>
            <InputLabel>Produto:</InputLabel>
            <NativeSelect required onChange={e => setProduct(e.target.value)}>
              <option value="" />
              {products.map(option => (
                <option key={option.product}>{option.product}</option>
              ))}
            </NativeSelect>
          </FormControl>
          <NumberFormat
            label="Valor da entrada"
            margin="normal"
            fullWidth
            onValueChange={e => setValue(e.value)}
            type="tel"
            defaultValue={value}
            decimalSeparator=","
            thousandSeparator="."
            thousandsGroupStyle="thousand"
            isNumericString
            prefix="R$"
            allowedDecimalSeparators={false}
            customInput={TextField}
          />
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                <p>
                  <strong>Produto: </strong>
                  {productInfo.product}
                </p>
                <p>
                  <strong>Finame: </strong>
                  {productInfo.finame}
                </p>
                <p>
                  <strong>NCM: </strong>
                  {productInfo.ncm}
                </p>
                <p>
                  <strong>CST: </strong>
                  {productInfo.cst}
                </p>
              </Typography>
              <Typography variant="h5" component="h2">
                <p>
                  <strong>Diferencial de alíquota: </strong>
                  {(icmsDestiny - icmsOrigin).toFixed(2)}%
                </p>
                <p>
                  <strong>Valor do diferencial: </strong>
                  {(((icmsDestiny - icmsOrigin) / 100) * value).toLocaleString(
                    'pt-br',
                    {
                      style: 'currency',
                      currency: 'BRL',
                    },
                  )}
                </p>
              </Typography>
              <Typography variant="body2" component="p">
                <p>
                  <strong>ICMS pago pela AGF: </strong>
                  {((icmsOrigin / 100) * value).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
                <p>
                  <strong>ICMS origem: </strong>
                  {icmsOrigin}%
                </p>
                <p>
                  <strong>ICMS destino: </strong>
                  {icmsDestiny}%
                </p>
                <p style={{ margin: 0 }}>
                  QUEM PAGA?
                  <br />
                  CLIENTE CONTRIBUINTE: CLIENTE
                  <br />
                  CLIENTE NÃO CONTRIBUINTE: AGF
                </p>
              </Typography>
            </CardContent>
          </Card>
        </Container>

        <Link to="/clientdetails">
          <Button variant="contained" style={{ margin: 15 }}>
            Voltar
          </Button>
        </Link>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ margin: 15 }}
          disabled={submitting}
        >
          Continuar
        </Button>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  productsSelect: state.bd_selects.products,
  productList: state.productList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ProductActions, dispatch);

DifferentialRateCalculator = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DifferentialRateCalculator);

export default reduxForm({
  form: 'infoReduxForm',
  destroyOnUnmount: false,
})(DifferentialRateCalculator);
