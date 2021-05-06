import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Table, Alert } from 'reactstrap';

import { api } from '../../config';

export const Home = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const getAnuncios = async () => {
    await axios.get(api)
      .then((response) => {
        setData(response.data.anuncios);
      })
      .catch(() => {
        setStatus({
          type: 'error',
          message: 'Erro: tente novamente mais tarde!'
        })
      })
  }

  useEffect(() => {
    getAnuncios();
    setStatus({
      type: '',
      message: ''
    });
  }, []);

  const apagarAnuncio = async (id) => {

    const headers = {
      'Content-Type': 'application/json'
    }

    await axios.delete(api + "/apagar/" + id, { headers })
      .then((response) => {
        if (!response.data.error) {
          setStatus({
            type: 'success',
            message: response.data.message
          });
        }
        getAnuncios();
      })
      .catch(() => {
        setStatus({
          type: 'error',
          message: 'Erro: tente novamente mais tarde!'
        });
      })
  }

  return (
    <Container>
      <section className="d-flex mt-2 mb-2">
        <div className="mr-auto p-2">
          <h1>Anúncios</h1>
        </div>
        <div className="p-2">
          <Link to="/cadastrar-anuncio" className="btn btn-outline-success btn-sm">Cadastrar</Link>
        </div>
      </section>
      {status.type !== ''
        ? (
          <Alert color={status.type === 'error' ? "danger" : "success"}>
            {status.message}
          </Alert>
        ) : ''}
      <section className="mt-1">
        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.titulo}</td>
                  <td className="text-center">
                    <Link to={"/visualizar-anuncio/" + item.id} className="btn btn-outline-primary btn-sm mr-2">Visualizar</Link>
                    <Link to={"/editar-anuncio/" + item.id} className="btn btn-outline-warning btn-sm mr-2">Editar</Link>
                    <span className="btn btn-outline-danger btn-sm" onClick={() => apagarAnuncio(item.id)}>
                      Deletar
                    </span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </section>
    </Container>
  );
}
