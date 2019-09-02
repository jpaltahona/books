const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) =>{
    res.render('index.ejs')
})

router.get('/new-entry', (req, res) => {
    res.render('new-entry.ejs');
})
module.exports = router;
