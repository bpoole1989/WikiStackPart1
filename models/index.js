const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', { logging: false });

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    contents: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
    }
});

const generateSlug = (title) => {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
};

Page.beforeValidate((pageInstance, optionalArg) => {
    pageInstance.slug = generateSlug(pageInstance.title);
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
    db,
    Page,
    User
}