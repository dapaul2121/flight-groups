const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log(`listening on port ${port}!`));