import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
  Alert
}
  from 'reactstrap';

import { api } from '../../config';

export const CadastrarAnuncio = () => {
  const [anuncio, setAnuncio] = useState({
    titulo: '',
    descricao: '',
  });
  const [status, setStatus] = useState({
    type: '',
    message: '',
  });
  const [formSave, setFormSave] = useState(false);

  const valorInput = e => {
    setAnuncio({
      ...anuncio,
      [e.target.name]: e.target.value
    });
  }

  const cadastrarAnuncio = async (e) => {
    e.preventDefault();

    setFormSave(true);

    const headers = {
      'Content-Type': 'application/json'
    }

    await axios.post(api + "/cadastrar", anuncio, { headers })
      .then((response) => {
        if (!response.data.error) {
          setStatus({
            type: 'success',
            message: response.data.message
          });
        }
        setFormSave(false);

      })
      .catch(() => {
        setStatus({
          type: 'error',
          message: 'Erro: não foi possível cadastrar o anúncio!'
        });
        setFormSave(false);
      })
  }

  return (
    <Container>
      <section className="d-flex mt-2 mb-2">
        <div className="mr-auto p-2">
          <h1>Cadastrar Anúncio</h1>
        </div>
        <div className="p-2">
          <Link to="/" className="btn btn-outline-info btn-sm">Listar</Link>
        </div>
      </section>
      {status.type !== ''
        ? (
          <Alert color={status.type === 'error' ? "danger" : "success"}>
            {status.message}
          </Alert>
        ) : ''}
      <hr className="m-1" />
      <section className="mt-4">
        <Form onSubmit={cadastrarAnuncio}>
          <FormGroup>
            <Label>Título</Label>
            <Input type="text" name="titulo" placeholder="Título do anúncio" onChange={valorInput} required />
          </FormGroup>
          <FormGroup>
            <Label>Descrição</Label>
            <Input type="text" name="descricao" placeholder="Descrição do anúncio" onChange={valorInput} required />
          </FormGroup>
          <Button type="submit" outline color="success" disabled={formSave}>
            {formSave ? (
              <>
                Salvando...
                <Spinner size="sm" color="success" className="ml-2" />
              </>
            ) :
              "Cadastrar"
            }
          </Button>
        </Form>
      </section>
    </Container>
  );
}
