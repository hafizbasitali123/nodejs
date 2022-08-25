const  app = require("express")
const bcrypt = require("bcrypt");
const router = app.Router();
var dbConn  = require('../lib/db');
var encryption = require('../helpers/encyption'); 

router.get('/', function(req, res) {    
    
    if(req.session.userId) res.redirect('/users');
    // render to add.ejs
    dbConn.query('SELECT * FROM login ORDER BY id desc',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            res.render('login', {
                email: '',
                password: '',
                error: err
            
            })   
        } else {
            // render to views/users/index.ejs
            res.render('login', {
                email: '',
                password: '',
                error: ''
                
            })
        }
    });
});

router.get('/test', (req, res) => {
    res.send('hello from test')
})

    router.post('/login-user',  function(req, res) {    
    
        let email = req.body.email;
        let  password= req.body.password;
        
        let errors = false;
    
        if(email.length === 0 || password.length === 0 ) {
            errors = true;
    
            // set flash message
            req.flash('error', "Please enter name and email and position");
            // render to add.ejs with flash message
            res.render('login', {
                email: email,
                password: password,
                error:req.flash('error', "Please enter name and email and position")
            
            })
        }
    
        // if no error
        if(!errors) {
    
            // var form_data = {
            //     email: email,
            //     password: password,
                
            // }
            
            // insert query
            dbConn.query(`SELECT * FROM login where email = '${email}'` ,function(err,rows) {
                 if(err) throw err;
                if (rows.length === 0) {
                    console.log('error', err)
                    
                     
                    // render to add.ejs
                    res.render('login', {
                        email: email,
                        password: password,
                        error:req.flash('error', req.flash('error', 'Invalid Credentials'))
                    })
                } else { 
                    
                    bcrypt.compare(rows[0].password, password, function (req2, err, ismatch){
                        if(ismatch){
                            error:req.flash('error', req.flash('error', 'Invalid Credentials'))
                              res.redirect('/login');
                        } else {
                            req.session.userId = rows[0].id;
                            res.redirect('/users')
                        }
                    })               
                    // eq.flash('success', 'User successfully added');
                    
                }
            })
        }
    })
    
module.exports = router;