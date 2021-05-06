import React, { useState, useEffect } from 'react';
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
} from 'reactstrap';

import { api } from '../../config';

export const EditarAnuncio = (props) => {
  const [id, setId] = useState(props.match.params.id);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState({
    type: '',
    message: ''
  });
  const [formSave, setFormSave] = useState(false);

  const editarAnuncio = async (e) => {
    e.preventDefault();

    setFormSave(true);

    const headers = {
      'Content-Type': 'application/json'
    }

    await axios.put(api + "/editar/", { id, titulo, descricao }, { headers })
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
          message: 'Erro: não foi possível editar o anúncio!'
        });
        setFormSave(false);
      })
  }

  useEffect(() => {
    const getAnuncio = async () => {
      await axios.get(api + "/visualizar/" + id)
        .then((response) => {
          setTitulo(response.data.anuncio.titulo);
          setDescricao(response.data.anuncio.descricao);
          setStatus({
            type: '',
            message: ''
          })
        })
        .catch(() => {
          setStatus({
            type: 'error',
            message: 'Erro: tente novamente mais tarde!'
          })
        })
    }

    getAnuncio();
  }, [id]);

  return (
    <Container>
      <section className="d-flex mt-2 mb-2">
        <div className="mr-auto p-2">
          <h1>Editar Anúncio</h1>
        </div>
        <div className="p-2">
          <Link to="/" className="btn btn-outline-info btn-sm mr-2">Listar</Link>
          <Link to={"/visualizar-anuncio/" + id} className="btn btn-outline-primary btn-sm">Visualizar</Link>
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
        <Form onSubmit={editarAnuncio}>
          <FormGroup>
            <Label>Título</Label>
            <Input type="text" name="titulo" placeholder="Título do anúncio" value={titulo} onChange={e => setTitulo(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Descrição</Label>
            <Input type="text" name="descricao" placeholder="Descrição do anúncio" value={descricao} onChange={e => setDescricao(e.target.value)} />
          </FormGroup>
          <Button type="submit" outline color="warning" disabled={formSave}>
            {formSave ? (
              <>
                Salvando...
                <Spinner size="sm" color="warning" className="ml-2" />
              </>
            ) :
              "Salvar"
            }
          </Button>
        </Form>
      </section>
    </Container>
  );
}

