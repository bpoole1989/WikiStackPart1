const express = require("express");
const router = express.Router();
const addPage = require('../view/addPage');

router.get('/', (req, res, next) => {
    res.send('hello world');
})

router.post('/', (req, res, next) => {
    res.send('hello post');
})

router.get('/add', (req, res, next) => {
    res.send(addPage());
})

module.exports = router;