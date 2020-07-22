import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { bindActionCreators } from 'redux';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { message } from 'antd';
import Menu from '../../components/Menu';

import { Creators as ProductActions } from '../../store/ducks/productList';

let DifferentialRateCalculator = ({
  productList,
  resetProduct,
  submitting,
  history,
}) => {
  const handleSubmit = () => {
    if (productList.length > 0) {
      history.push('/orderoptions');
    } else {
      message.error('Insira pelo menos um produto!');
    }
  };

  return (
    <div>
      <Menu title="Informações dos Produtos" />

      <Container maxWidth="md" component="main" align="center">
        <Container>
          <p>Teste</p>
        </Container>

        <Link to="/clientdetails">
          <Button variant="contained" style={{ margin: 15 }}>
            Voltar
          </Button>
        </Link>
        <Button
          variant="contained"
          color="secondary"
          onClick={resetProduct}
          style={{ margin: 15 }}
          disabled={submitting}
        >
          Limpar Produtos
        </Button>
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
