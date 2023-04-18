const express = require('express');
const mongoose = require("mongoose");
const addBook = require("./routes/books.route");
const Books = require('./models/book.schema');
//const cors = require("cors");


const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 4040;

mongoose.connect('mongodb://127.0.0.1:27017/cnm');
const db = mongoose.connection;

db.once('open', ()=> app.listen(port, ()=> console.log(`Server running on port ${port}`)))



app.get("/", (req, res)=>{
	
	const books = [
		{title :"Title Retire yout retire rich" ,pages : 362 ,genre : " Finance"},
		{title :"Title Smash Magazin" ,pages : 58 ,genre : "beauty"},
		{title :"Making a millin bucks" ,pages : 322 ,genre : " Finance"},
		{title :"The mern stack" ,pages : 522 ,genre : "software"},
	]

		res.render('home', {books,title : "HOME"})


})

app.post('/add',(req, res) => {
  
    const book = new Books (req.body);
    
    book.save()
    .then(() => res.redirect("/"))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get("/details/:id", (req, res)=>{
	const id = req.params.id;

	Books.findById(id)
	.then(book => res.render('details', {title : "DETAILS"}, book))
	.catch(err => res.status(400).json('Error: ' + err));
})

app.get("/create", (req, res)=>{
	res.render('create', {title : "CREATE"})
})

app.get("/contats", (req, res)=>{
	res.render('contact', {title : "GET IN TOUCH"})
})

app.delete('/:id',(req, res) => {

	Books.findByIdAndDelete(req.params.id)
		.then(() => res.json({redirect : "/"}))
		.catch(err => res.status(400).json('Error: ' + err));
});







