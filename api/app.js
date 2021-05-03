const express = require('express');
const cors = require('cors');
const app = express();

const Anuncio = require('./Models/Anuncio');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization')
  app.use(cors());
  next();
})

app.use(express.json());

app.get('/', async (req, res) => {
  await Anuncio.findAll({ order: [['id', 'DESC']] })
    .then((anuncios) => {
      return res.json({
        error: false,
        anuncios
      });
    }).catch((error) => {
      return res.status(400).json({
        error: true,
        message: "Não foi possível carregar os anúncios!"
      });
    });
});

app.get('/visualizar/:id', async (req, res) => {
  await Anuncio.findByPk(req.params.id)
    .then((anuncio) => {
      return res.json({
        error: false,
        anuncio
      });
    }).catch((error) => {
      return res.status(400).json({
        error: true,
        message: "Erro ao carregar anúncio!"
      });
    });
});


app.post('/cadastrar', async (req, res) => {
  await Anuncio.create(req.body)
    .then(() => {
      return res.json({
        error: false,
        message: "Anúncio cadastrado com sucesso!"
      });
    }).catch((error) => {
      return res.status(400).json({
        error: true,
        message: "Erro ao cadastrar o anúncio!"
      });
    });
});

app.put('/editar', async (req, res) => {
  await Anuncio.update(req.body, {
    where: { id: req.body.id }
  }).then(() => {
    return res.json({
      error: false,
      message: "Anúncio editado com sucesso!"
    });
  }).catch((error) => {
    return res.status(400).json({
      error: true,
      message: "Erro ao editar o anúncio!"
    });
  });
});

app.delete('/apagar/:id', async (req, res) => {
  await Anuncio.destroy({
    where: { id: req.params.id }
  }).then(() => {
    return res.json({
      error: false,
      message: "Anúncio excluído com sucesso!"
    });
  }).catch((error) => {
    return res.status(400).json({
      error: true,
      message: "Erro ao excluir o anúncio!"
    });
  });
});

app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080: http://localhost:8080/')
});
