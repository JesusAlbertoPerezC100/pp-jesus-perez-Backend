const User = require('../models/User');


function Save(req,res){
    var username = req.body.name;
    var password = req.body.password;
    var passEncriptada = encriptar(username, password);
    if(!user){
        var user = new User({
            name : req.body.name,
            password : passEncriptada,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,
            gender: req.body.gender,
            hobby: req.body.hobby
         })
         user.save()
         .then(user => res.status(201).send({user}))
         .catch(error => res.status(500).send({error}))
        };
    }
    
function Remove(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.users) res.status(404).send({message:'NOT FOUND'});
    req.body.users[0].remove().then(user => res.status(200).send({message: 'REMOVED', user}))
    .catch(error => res.status(500).send({error}));
}

function FindBy(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.users) return res.status(404).send({message:'NOT FOUND'});
    let users = req.body.users;
    res.status(200).send({users});
}

function FindByParam(req,res){

     if(req.body.error) return res.status(500).send({error});
    if(!req.body.users) return res.status(404).send({message:'NOT FOUND'});
    let users = req.body.users;        
    res.status(200).send({users});
    /* if(req.body.error) return res.status(500).send({error});
    if(!req.body.users) return res.status(404).send({message:'NOT FOUND'});
    let user = req.body.users;
    var users = new User({
        name : req.body.user.name,
        phone: req.body.user.phone,
        hobby: req.body.user.hobby
     })
     res.status(200).send({users}); */
}

function FindExp(req,res,next){
    let query = {};
    if((req.params.param1 != '0') && (req.params.param2 != '0' )){
        query['name'] = req.params.param1; 
        query['hobby'] = req.params.param2
    };
    if((req.params.param1 != '0') && (req.params.param2 == '0' )){
        query['name'] = req.params.param1; 
    }   
    User.find(query).then(users => {
         if(!users.length) return next();
         req.body.users = users;
         return next();
     }).catch(error => {
         req.body.error = error;
         next();
     })
}
function Find(req,res,next){
    let query = {};
    query[req.params.key] = req.params.value;

    User.find(query).then(users => {
         if(!users.length) return next();
         req.body.users = users;
         return next();
     }).catch(error => {
         req.body.error = error;
         next();
     })
}
function FindAdvance(req,res,next){
    var StartDate= Date.now();
    var EndDate = Date.now() -  3*24*60*60*1000 ;
     let query = {};
    User.find({age:{$gt:12},gender:"M", registerdate: { $gte : EndDate, $lt: StartDate } }).then(users => {
         if(!users.length) return next();
         req.body.users = users;
         return next(); 
     }).catch(error => {
         req.body.error = error;
         next();
     })
}
function encriptar(user, pass) {
    var crypto = require('crypto')
    // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
    var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex')
    return hmac
 }



module.exports ={
    Save,
    FindBy,
    Remove,
    FindByParam,
    FindExp,
    Find,
    FindAdvance
}