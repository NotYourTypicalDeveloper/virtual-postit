const Note = require("../models/Note");

const getNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
};

const createNote = async (req, res) => {
  const note = await Note.create({ ...req.body /*, userId: req.userId*/ });
  res.status(201).json(note);
};

const updateNote = async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(note);
};

const deleteNote = async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.sendStatus(204);
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
