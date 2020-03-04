const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const morgan = require('morgan');

const Group = require('../db/index')
const group = require('./controller/group')
const flight = require('./controller/flight')

app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.post('/group', group.postGroup)
app.get('/group', group.getAllGroups)
app.patch('/group/:groupId/member', group.patchGroupMember)
app.patch('/group/:groupId/flight', group.patchGroupMember)

app.post('/flight/:id', flight.getAndPostFlights)

app.listen(port, () => console.log(`listening on port ${port}!`));