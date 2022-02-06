const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const errorMiddleware = require('./middlewares/error');

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', usersController);

app.use('/login', loginController);

app.use(errorMiddleware);
