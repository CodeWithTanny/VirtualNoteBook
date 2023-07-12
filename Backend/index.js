const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
connectToMongo();

const app = express(); //these can be taken from the officeal webiste "express"
const port = 5000

app.use(cors())

app.use(express.json());

app.use('/api/auth', require('./routers/auth'));
app.use('/api/notes', require('./routers/notes'))

app.listen(port, () => {
  console.log(` iNotebook backend listening at http://localhost:${port}`);
})
