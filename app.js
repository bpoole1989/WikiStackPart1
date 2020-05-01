const express = require('express');
const morgan = require('morgan');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use('/wiki', wikiRouter);

app.get('/', (req, res, next) => {
    res.redirect('/wiki');
})

models.db.authenticate().
then(() => {
    console.log('connected to the database');
})

const PORT = 3000;

const init = async() => {
    await models.db.sync({ force: true });

    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
}

init();

// Reset tables in database using JS-defined model
// models.db.sync({force: true})