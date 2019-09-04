const { Router } = require('express');
const fs = require('fs');
const router = Router();
const uuid = require('uuid/v4');


const json_books = fs.readFileSync('./src/book.json', 'utf-8')
var books = JSON.parse(json_books);


router.get('/', (req, res, next) =>{
    res.render('index.ejs', {
        books
    })
})

router.get('/new-entry', (req, res) => {
    res.render('new-entry.ejs');
})
router.post('/new-entry', (req, res ) =>{
    const { title, fecha, image, description } = req.body;
    if(!title || !fecha || !image || !description ){
        res.status(400).send('Entries must a title and description')
        return
    }

    let newBook = {
        id: uuid(),
        title,
        fecha,
        image, description
    }
    books.push(newBook);

    const json_book = JSON.stringify(books);
    fs.writeFileSync('./src/book.json', json_book, 'utf-8');

    res.redirect('/')
})

router.get('/delete/:id', (req, res ) =>{
    console.log(req.params);

    books = books.filter(book => book.id != req.params.id);

    let json_books = JSON.stringify(books);
    fs.writeFileSync('./src/book.json', json_books, 'utf-8');

    res.redirect('/')
})
router.get('/vire-json', (req, res) =>{
    res.send(books);
})
module.exports = router;
