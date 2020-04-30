const express = require("express");
const router = express.Router();
const { Page } = require("../models");
const { addPage } = require("../view");
const wikiPage = require("../view/wikiPage");



// router.get('/', (req, res, next) => {
//     res.send('hello world');
// })

router.post('/', async(req, res, next) => {

    const page = new Page({
        title: req.body.title,
        contents: req.body.contents,
        status: 'open'
    });

    console.log(page);

    try {
        await page.save();
        res.redirect(`/wiki/${page.slug}`);
    } catch (error) {
        next(error)
    }
});

router.get('/add', (req, res, next) => {
    res.send(addPage());
})

router.get('/:slug', async(req, res, next) => {
    try {
        const page = await Page.findOne({
            where: { slug: req.params.slug }
        });

        res.send(wikiPage(page, 'Hi'));
        //    res.send(`hit dynamic route at ${req.params.slug}`);
    } catch (err) {
        next(err);
    };

});

module.exports = router;