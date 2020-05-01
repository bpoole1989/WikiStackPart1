const express = require("express");
const router = express.Router();
const { Page, User } = require("../models");
const { addPage, wikiPage, main, editPage } = require("../view");


router.get('/', async(req, res, next) => {
    const pages = await Page.findAll();

    res.send(main(pages));
})

router.post('/', async(req, res, next) => {

    try {
        const [user, wasCreated] = await User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        });

        const page = await Page.create(req.body);

        await page.setAuthor(user);

        res.redirect(`/wiki/${page.slug}`);
    } catch (error) {
        next(error)
    }
});

router.post('/:slug', async(req, res, next) => {

    try {
        const page = await Page.findOne({
            where: { slug: req.params.slug }
        });

        const user = await page.getAuthor();

        await page.update(req.body);
        await user.update(req.body);
        await page.save();
        await user.save();

        res.redirect(`/wiki/${page.slug}`);
    } catch (error) {
        next(error)
    }
});

router.get('/add', (req, res, next) => {
    res.send(addPage());
})

router.get('/:slug/edit', async(req, res, next) => {
    try {
        const page = await Page.findOne({
            where: { slug: req.params.slug }
        });

        const author = await page.getAuthor();

        res.send(editPage(page, author));
    } catch (err) {
        next(err);
    };
})

router.get('/:slug/delete', async(req, res, next) => {
    try {
        const page = await Page.findOne({
            where: { slug: req.params.slug }
        });

        await page.destroy();

        res.redirect('/wiki');
    } catch (err) {
        next(err);
    };
})

router.get('/:slug', async(req, res, next) => {
    try {
        const page = await Page.findOne({
            where: { slug: req.params.slug }
        });

        const author = await page.getAuthor();

        res.send(wikiPage(page, author));
    } catch (err) {
        next(err);
    };

});

module.exports = router;