const Note = require('../models/note.model');

const GENERIC_ERROR_MESSAGE = 'An error occured while trying to save note.';

// Create new note
exports.create = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Note content can not be empty!'
        });
    }

    const note = new Note({
        title: req.body.title || 'Untitled note',
        content: req.body.content
    });

    note.save().then(data => res.send(data))
    .catch(err => res.status(500).send({message: err.message || GENERIC_ERROR_MESSAGE}));
};

// Get all notes
exports.getAll = (req, res) => {
    Note.find().then(data => res.send(data))
    .catch(err => res.status(500).send({message: err.message || GENERIC_ERROR_MESSAGE}))
};

// Get note by id
exports.getById = (req, res) => {
    const noteId = req.params.noteId;
    Note.findById(noteId).then(note => {
        if (!note) {
            return res.status(404).send({message: 'Note not found!'});
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({message: 'Note not found!'});
        }
        res.status(500).send({message: `An error occured while trying to fetch note with id: ${noteId}`});
    });
};

// Update note by id
exports.update = (req, res) => {
    const noteId = req.params.noteId;
    const { title, content } = req.body;

    if (!content) {
        return res.status(400).send({
            message: 'Note content can not be empty!'
        });
    }

    Note.findByIdAndUpdate(noteId, {
        title: title || 'Untitled note',
        content: content
    }, {new: true}).then(note => {
        if (!note) {
            return res.status(404).send({message: 'Note not found!'});
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({message: 'Note not found!'});
        }
        res.status(500).send({message: `An error occured while updating note with id: ${noteId}`});
    });
};

// Delete note by id
exports.delete = (req, res) => {
    const noteId = req.params.noteId;
    Note.findByIdAndDelete(noteId).then(note => {
        if (!note) {
            return res.status(404).send({message: 'Note not found!'});
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({message: 'Note not found!'});
        }
        res.status(500).send({message: `An error occured while trying to delete note with id: ${noteId}`});
    });
};