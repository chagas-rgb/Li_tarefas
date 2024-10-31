const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tarefas');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/tarefas', taskRoutes);

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
