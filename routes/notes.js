const notes = require('express').Router();
const {readAndAppend, readFromFile, writeToFile} = require('../helpers/fsUtils');
const { v4: uuidv4} = require('uuid');

// GET route for retrieving notes data
notes.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET route for specific note id
notes.get('/:id', (req,res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No tip with that ID');
        });
})

// DELETE Route for specific tip
notes.delete('/:id', (req,res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // removes the note from the json
            const result = json.filter((note) => note.id !== noteId);
            writeToFile('./db/db.json', result);
            res.json(`Item ${noteId} has been deleted`)
        });
});

notes.post('/', (req,res) => {
    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        }

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting new note');
    }
})

module.exports = notes;