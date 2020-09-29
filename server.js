process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./Config/mongoose');
var express = require('./Config/express');
const PORT = process.env.PORT || 5000
var db = mongoose();
var app = express();

app.listen(PORT, () => {
    console.log('Server: running.', PORT)
});

module.exports = app;

db.then(() => {
    console.log('MongoDB: connected.');
})