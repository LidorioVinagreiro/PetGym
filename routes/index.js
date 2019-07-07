const dbpool = require('./utils/sqlDb.js').getPool();
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
// após o render existe um object {user: req.user}
//está a ser passado para a próxima página
//é usado dentro da view dashboard
router.get('/initial', ensureAuthenticated, (req, res) =>
  res.render('initial', {
    user: req.user
  })
);

//falta o nome da pagina <nome>
//só o get da pagina de registo de um animal
router.get('/registoAnimais', ensureAuthenticated, (req, res) =>
  res.render('registo_animais')
);

router.post('/registoAnimais', ensureAuthenticated, (req, res) => {
  const { animal_nome, animal_raca } = req.body;

  // if errors > 1 falta verificar dados

  //else
  //mysql.insert.Animais
  dbpool.getConnection(function (err, connection) {
    if (err)
      console.log('ERRO NO GET CONNECTION /registoAnimais POST');

    var sql = 'INSERT INTO Animais (animal_nome,animal_raca) VALUES (?,?)';
    var campos = [animal_nome, animal_raca];

    connection.query(sql, campos, function (err, rows) {
      if (err) {
        connection.release();
        console.log('ERRO NA QUERY REGISTO ANIMAIS POST')
      }
      connection.release();
      //no redirect mandamos uma mensagem de registo?
      res.redirect('/registoAnimais');
    });
  });

});

//get da pagina da lista de animais
router.get('/listaAnimais', ensureAuthenticated, (req, res) => {
  dbpool.getConnection(function (err, connection) {
    if (err) {
      console.log('ERRO NO GET CONNECTION /listaAnimais GET');
      connection.release();
      //falta adicionar pagina padrao e erros 
    }

    var sql = 'SELECT * FROM Animais';

    connection.query(sql, function (err, rows) {
      if (err) {
        connection.release();
        console.log('ERRO NA QUERY Lista ANIMAIS GET')
      }
      connection.release();
      //ou return?
      res.render('listaAnimais', {
        listaAnimais: rows
      });
    });
  });
});

router.get('/avaliarAnimais/:id', ensureAuthenticated, (req, res) => {
  dbpool.getConnection(function (err, connection) {
    if (err) {
      console.log('ERRO NO GET CONNECTION /LISTAANIMAIS/ID GET');
      connection.release();
      //falta adicionar pagina padrao e erros
    }

    var sql = 'SELECT * FROM Animais WHERE animal_id=?';

    connection.query(sql, [req.params.id], function (err, rows, fields) {
      if (err) {
        connection.release();
        console.log('ERRO NA QUERY LISTA ANIMAIS ID GET');
      }
      connection.release();
      res.render('avaliarAnimal', {
        animal: rows[0]
      });
    });
  });
});

router.post('/avaliarAnimais/:id', ensureAuthenticated, (req, res) => {
  const { avaliar_animal_id, avaliar_animal_peso, avaliar_data } = req.body;

  // if errors > 1 falta verificar dados

  //else
  //mysql.insert.Animais
  dbpool.getConnection(function (err, connection) {
    if (err)
      console.log('ERRO NO GET CONNECTION /avaliarAnimais/:id POST');

    var sql = 'INSERT INTO AvaliarAnimais (avaliar_animal_id,avaliar_animal_peso,avaliar_data) VALUES (?,?,?)';
    var campos = [avaliar_animal_id, avaliar_animal_peso, avaliar_data];

    connection.query(sql, campos, function (err, rows) {
      if (err) {
        connection.release();
        console.log('ERRO NA QUERY REGISTO AVALIAR ANIMAIS POST')
      }
      connection.release();
      //no redirect mandamos uma mensagem de registo?
      res.redirect('/listaAnimais');
    });
  });
});

//get da pagina da lista de animais
router.get('/listaAvaliacoes', ensureAuthenticated, (req, res) => {
  dbpool.getConnection(function (err, connection) {
    if (err) {
      console.log('ERRO NO GET CONNECTION /listaAvaliacoes GET');
      connection.release();
      //falta adicionar pagina padrao e erros 
    }

    var sql = 'SELECT * FROM AvaliarAnimais';

    connection.query(sql, function (err, rows) {
      if (err) {
        connection.release();
        console.log('ERRO NA QUERY Lista Avaliar ANIMAIS GET')
      }
      connection.release();
      //ou return?
      res.render('listaAvaliacoes', {
        listaAvaliacoes: rows
      });
    });
  });
});


router.get('/Alterar/:id', ensureAuthenticated, (req, res) => {
  dbpool.getConnection(function (err, connection) {
    if (err) {
      console.log('ERRO NO GET CONNECTION /Alterar/ID GET');
      connection.release();
      //falta adicionar pagina padrao e erros
    }

    var sql = 'SELECT * FROM Animais WHERE animal_id=?';

    connection.query(sql, [req.params.id], function (err, rows, fields) {
      if (err) {
        connection.release();
        console.log('ERRO NA QUERY LISTA ANIMAIS ID GET');
      }
      connection.release();
      res.render('alterarAnimal', {
        animal: rows[0]
      });
    });
  });
});

router.post('/Alterar', ensureAuthenticated, (req, res) => {
  const { animal_id, animal_nome, animal_raca, animal_adoptado, animal_data_nasc } = req.body;

  // if errors > 1 falta verificar dados

  //else
  //mysql.insert.Animais
  dbpool.getConnection(function (err, connection) {
    if (err){
      console.log('ERRO NO GET CONNECTION /ALTERAR/:id POST');
      res.render('Dashboard')
    }
    animal_adoptado => animal_adoptado == 1 ? true : false;
    var sql = 'UPDATE Animais SET animal_nome = ?, animal_raca = ?, animal_adoptado=?,animal_data_nasc=? WHERE animal_id=?';
    var campos = [animal_nome, animal_raca, animal_adoptado, animal_data_nasc, animal_id];

    connection.query(sql, campos, function (err, rows) {
      if (err) {
        connection.release();
        console.log('ERRO NA QUERY ALTERAR ANIMAIS POST');
      }
      connection.release();
      //no redirect mandamos uma mensagem de registo?
      res.redirect('/listaAnimais');
    });
  });
});

//get da pagina da lista de animais
router.post('/pesquisa', ensureAuthenticated, (req, res) => {
  const { texto_pesquisa } = req.body;
  dbpool.getConnection(function (err, connection) {
    if (err) {
      console.log('ERRO NO GET CONNECTION /pesquisa POST');
      connection.release();
      //falta adicionar pagina padrao e erros 
    }

    //cSQL INJECTION PROBLEM 
    var camp = "'%?%'";
    var sql = 'SELECT * FROM Animais WHERE animal_nome LIKE '+camp;

    connection.query(sql, function (err, rows) {
      if (err) {
        connection.release();
        console.log('ERRO NA QUERY pesquisa GET')
      }
      connection.release();
      //ou return?
      res.render('listaAnimais', {
        listaAnimais: rows
      });
    });
  });
});

module.exports = router;
