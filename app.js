const express = require('express');
const morgan = require('morgan');
const views = require('./view');
const layout = require('./view/layout');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
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
    await models.db.sync();

    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
}

init();

// Reset tables in database using JS-defined model
// models.db.sync({force: true})

// Turn off SQL command logging
// const db = new Sequelize('postgres://localhost:5432/wikistack', {
//     logging: false
// });