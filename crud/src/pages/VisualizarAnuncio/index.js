import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Alert } from 'reactstrap';

import { api } from '../../config';

export const VisualizarAnuncio = (props) => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(props.match.params.id);
  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  useEffect(() => {
    const getAnuncio = async () => {
      await axios.get(api + "/visualizar/" + id)
        .then((response) => {
          setData(response.data.anuncio);
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
          <h1>Visualizar Anúncio</h1>
        </div>
        <div className="p-2">
          <Link to="/" className="btn btn-outline-info btn-sm">Listar</Link>
          <Link to={"/editar-anuncio/" + data.id} className="btn btn-outline-warning btn-sm ml-2">Editar</Link>
        </div>
      </section>
      {status.type === 'error'
        ? (
          <Alert color="danger">
            {status.message}
          </Alert>
        ) : ''}
      <hr className="m-1" />
      <section className="mt-4">
        <dl className="row">
          <dt className="col-sm-3">ID</dt>
          <dd className="col-sm-9">{data.id}</dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-3">Título</dt>
          <dd className="col-sm-9">{data.titulo}</dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-3">Descrição</dt>
          <dd className="col-sm-9">{data.descricao}</dd>
        </dl>
      </section>
    </Container>
  );
}
