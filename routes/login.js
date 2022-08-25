const  app = require("express")
const bcrypt = require("bcrypt");
const router = app.Router();
var dbConn  = require('../lib/db');

let hashedPass = '';
router.get('/', function(req, res) {    
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
        console.log(req.body, "body")
    
        let email = req.body.email;
        let  password= req.body.password;
        // hashedPass = await incry.hash(req.body.password,10)
        // console.log(req.body.password+'\n'+hashedPass);
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
                 console.log('rows here: ', rows);
                if (rows.length === 0) {
                    console.log('error', err)
                    
                     
                    // render to add.ejs
                    res.render('login', {
                        email: email,
                        password: password,
                        error:req.flash('error', req.flash('error', 'Invalid Credentials'))
                    })
                } else { 
                    
                    bcrypt.compare(rows[0].password, password, function (req, err, ismatch){
                        if(ismatch){
                              res.redirect('/login');
                        } else {
//                             session.id = rows[0].id;
                            res.redirect('/users')
                        }
                    })               
                    // eq.flash('success', 'User successfully added');
                    
                }
            })
        }
    })
    
module.exports = router;