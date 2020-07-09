import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import WindowedSelect from 'react-windowed-select';
import NumberFormat from 'react-number-format';

import { bindActionCreators } from 'redux';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';

import { message } from 'antd';
import Menu from '../../components/Menu';

import { Creators as ProductActions } from '../../store/ducks/productList';

const renderInput = ({ input, label, placeholder }) => (
  <div>
    <TextField
      {...input}
      label={label}
      placeholder={placeholder}
      fullWidth
      margin="normal"
      size="small"
    />
  </div>
);

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      type="tel"
      decimalSeparator=","
      thousandSeparator="."
      thousandsGroupStyle="thousand"
      isNumericString
      prefix="R$"
      mask={(/[^\d]/g, '')}
    />
  );
}

let ProdutoDetails = ({
  productsSelect,
  productList,
  addProduct,
  removeProduct,
  resetProduct,
  submitting,
  history,
}) => {
  const [products, setProducts] = useState('');
  const [value, setValue] = useState('');
  const [qtd, setQtd] = useState('');
  const [errors, setErrors] = useState({});

  const handleAdd = (e) => {
    e.preventDefault();

    if (!products) {
      setErrors({
        product: 'Insira o produto!',
      });
    } else if (!value) {
      if (Number.isInteger(value)) {
        setErrors({
          value: 'Insira um número!',
        });
      } else {
        setErrors({
          value: 'Insira um valor!',
        });
      }
    } else if (!qtd) {
      setErrors({
        value: 'Insira a quantidade!',
      });
    } else {
      setErrors({});
      addProduct(products, parseFloat(value), qtd);
    }
  };

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
          <section>
            <form onSubmit={handleAdd}>
              <WindowedSelect
                options={productsSelect}
                getOptionLabel={(option) => option.descricao}
                onChange={(changedItem) => setProducts(changedItem)}
              />
              <TextField
                label="Valor"
                margin="normal"
                fullWidth
                onChange={(e) => setValue(e.target.value)}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              <TextField
                label="Quantidade"
                margin="normal"
                fullWidth
                type="number"
                onChange={(e) => setQtd(e.target.value)}
              />
              <Typography variant="overline" display="block" gutterBottom>
                {errors.product}
                {errors.value}
              </Typography>
              <Button
                type="button"
                style={{ marginBottom: 30 }}
                variant="outlined"
                onClick={handleAdd}
              >
                Adicionar Produto
              </Button>
            </form>
            <Container align="left">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Item</TableCell>
                      <TableCell align="center">Produto</TableCell>
                      <TableCell align="center">Preço</TableCell>
                      <TableCell align="center">Quantidade</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productList.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell align="center">
                          {productList.indexOf(product) + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {product.product.descricao}
                        </TableCell>
                        <TableCell align="center">
                          {product.value.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </TableCell>
                        <TableCell align="center">{product.qtd}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="delete"
                            onClick={() => removeProduct(product.id)}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Field
                name="info_ad_produtos"
                label="Informações adicionais:"
                type="text"
                component={renderInput}
              />
            </Container>
          </section>
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

const mapStateToProps = (state) => ({
  productsSelect: state.bd_selects.products,
  productList: state.productList,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(ProductActions, dispatch);

ProdutoDetails = connect(mapStateToProps, mapDispatchToProps)(ProdutoDetails);

export default reduxForm({
  form: 'infoReduxForm',
  destroyOnUnmount: false,
})(ProdutoDetails);
