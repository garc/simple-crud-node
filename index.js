const restify = require('restify')
    , server = restify.createServer()
    , connection = require('./connection')

server.get('/categories', (req, res, next) => {
    connection.query('SELECT * FROM tabela', function (error, results) {
        if (error) throw error;
        res.send(results)
      });    
    next()
})

server.post('/categories', (req, res, next) => {
    const data = req.body

    connection.query('INSERT INTO tabela SET ?', [data], function (error, results) {
        if (error) throw error;
        res.send(data)
      })
    next()
})

server.put('/categories', (req, res, next) => {
    const { id, data } = req.body

    connection.query('UPDATE tabela SET ? WHERE id = ?', [data, id], function (error, results) {
        if (error) throw error;
        res.send(data)
      })
    next()
})

server.del('/categories', (req, res, next) => {
    const {id} = req.body

    connection.query('DELETE FROM tabela WHERE id = ?', [id], function (error, results) {
        if (error) throw error;
        res.send("Removido com sucesso!!")
      })
    next()
})

// RESOLVING PROBLEM WITH REQUEST PARAMS
server.use(restify.plugins.bodyParser())

server.listen('8080')