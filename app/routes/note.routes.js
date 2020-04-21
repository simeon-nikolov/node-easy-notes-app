module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create note
    app.post('/notes', note.create);

    // Get all notes
    app.get('/notes', note.getAll);

    // Get note by id
    app.get('/notes/:noteId'. note.getById);

    // Update note by id
    app.put('/notes/:noteId', note.update);

    // Delete note by id
    app.delete('/notes/:noteId', note.delete);
};