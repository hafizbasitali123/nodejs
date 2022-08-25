var express = require('express');
var app = express();
const router = express.Router();

var usersRouter = require('./users');
var loginRouter = require('./login');
var signupRouter = require('./signup');

router.use('/users', usersRouter);
router.use('/login', loginRouter);
router.use('/signup', signupRouter);

router.get('/', (req, res) => {
    res.redirect('/users')
})


module.exports = router;