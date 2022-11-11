const fb = require('express').Router();
const {readAndAppend, readFromFile} = require('../helpers/fsUtils');
import { v4 as uuidv4} from 'uuid';

// GET route for retrieving notes data
fb.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

fb.post('/', (req,res) => {
    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4()
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

module.exports = fb;