/* External Modules */
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

/* Internal Modules */
const controllers = require('./controllers');
const authRequired = require("./middleware/authRequired");

/* Instanced Modules */
const app = express();

/* Port for server */
const PORT = 4000;

/* MiddlesWares */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

/* App Configuration */
app.set('view engine', 'ejs');

/* Session Configuration */
app.use(session({
    store: new MongoStore({
        url: "mongodb+srv://xscullark:bluetee2@cluster1-qxtmc.mongodb.net/<dbname>?retryWrites=true&w=majority"

    }),
    secret: "Mainichi means everyday",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    },

})
);

/* ===Routes=== */

/* root route */

app.get('/', function (req, res) {
    console.log(req.session);
    res.render('home', { user: req.session.currentUser })
});

// Auth Route

app.use('/', controllers.auth);

/* Account Route */
app.use('/accounts', authRequired, controllers.account);

/* Transaction Route */
app.use('/transactions', authRequired, controllers.transaction);

//contributors route
app.use('/contributors', controllers.contributors);

/* Server Bind */

app.listen(PORT, function () {
    console.log(`Server Running in Local Host ${PORT}`)
});


