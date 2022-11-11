const express = require('express');

const notesRouter = require('./notes.js');

const app = Express();

app.use('/notes', notesRouter);

module.exports = app;