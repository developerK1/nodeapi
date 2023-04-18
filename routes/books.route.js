const router = require('express').Router();
const Books = require('../models/book.schema');

//GET ALL BOOKS
router.route('/').get((req, res) => {
    Books.find()
      .then(book => res.json(book))
      .catch(err => res.status(400).json('Error: ' + err));
});

//GET ALL BOOKS
