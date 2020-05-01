const express = require("express");
const router = express.Router();
const { Page, User } = require("../models");
const { userList, userPages } = require("../view");

router.get('/', async(req, res, next) => {
    const users = await User.findAll();

    res.send(userList(users));
})

router.get('/:id', async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);

        const pages = await Page.findAll({
            where: { authorId: req.params.id }
        });

        res.send(userPages(user, pages));
    } catch (err) {
        next(err);
    };

});

module.exports = router;