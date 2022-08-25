const  app = require("express")
const router = app.Router();
var dbConn  = require('../lib/db');
const bcrypt = require("bcrypt");
let hashedPass = '';

router.get('/', function(req, res) {    
    // render to add.ejs
    dbConn.query('SELECT * FROM login ORDER BY id desc',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            res.render('signup', {
                name:'',
                email: '',
                password: '',

                error: err
            
            })   
        } else {
            // render to views/users/index.ejs
            res.render('signup', {
                name:'',
                email: '',
                password: '',
                error: ''
                
            })
        }
    });
});

    router.post('/add', async function(req, res) {    
        console.log(req.body);
        let name = req.body.name;
        let email = req.body.email;
        let  password= req.body.password;
        hashedPass = await bcrypt.hash(password,10)
        console.log(req.body.password+'\n'+hashedPass);

        let errors = false;
    
        if( name.length === 0 || email.length === 0 || password.length === 0 ) {
            errors = true;
    
            // set flash message
            // req.flash('error', "Please enter name and email and position");
            // render to add.ejs with flash message
            res.render('signup', {
                name: name,
                email: email,
                password: password,
                error:req.flash('error', "Please enter name and email and position")
            
            })
        }
    
        // if no error
        if(!errors) {
    
            var form_data = {
                name: name,
                email: email,
                password: hashedPass,
                
            }
            
            // insert query
            dbConn.query('INSERT INTO login SET ?', form_data, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                     console.log(err, "error")
                    // render to add.ejs
                    res.render('signup', {
                        name: form_data.name,
                        email: form_data.email,
                        password: form_data.hashedPass,
                        error:req.flash('error', err)
                    })
                } else {                
                    // eq.flash('success', 'User successfully added');
                    res.redirect('/login');
                }
            })
        }
    })
    
module.exports = router;