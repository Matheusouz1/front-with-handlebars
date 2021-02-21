const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('express-handlebars');
const axios = require('axios');
const { json } = require('body-parser');


const app = express();
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('views'));
//configurar pasta public
app.use(express.static("public"))

app.get('/', (req, res)=>{
    axios.get('http://localhost:3333/users')
    .then(function (response){
        let user = []
        user =  response
        // console.log(user)
        res.render('site/landing', user)
    }).catch()
});



app.get('/:storeLink/info',(req, res)=>{
    var user
    axios.get(`http://localhost:3333/${req.params.storeLink}`)
    .then(function (response) {
        user ={
            store_name:response.data.store_name,
            bio:response.data.store_bio,
            adress:response.data.adress,
            CEP:response.data.CEP,
            whatsapp:response.data.whatsapp,
            email:response.data.email,
            store_link:"/"+response.data.store_link,
            products:["matheus", "tenis", "meia"],
            profile_picture:response.data.profile_picture
        };
        console.log(user.profile_picture)
        res.render('layouts/loja', user)
    })
    .catch(function (error) {
        console.log(error);
        res.send(error)
    })
    
})
app.get('/cadastro',(req, res)=>{
    res.render('user/cadastro')
})
// app.post('/cadastro', (req,res)=>{
//     const {username, store_name, store_link, whatsapp} = req.body
//     axios.post('http://localhost:3333/auth/register', {username, store_name, store_link, whatsapp})
//     .then(function(response))
// })
app.get('/login',(req, res)=>{
   let login = false
    res.render('user/login', login)
})
app.post('/login',async (req, res)=>{
    const {password, username} = req.body
    var error
    await axios.post('http://localhost:3333/auth/authenticate', {password, username})
    .then(function(response){
        // res.send(response.data)
        axios.defaults.headers.authorization = `Bearer ${response.data.token}`;
        res.redirect('/dashboard');

    }).catch(function (err){
        if(err.message=='Request failed with status code 404'){
            error={
                error:true,
                alert_type:'danger',
                message_error:'User not found'
            }
            res.render('user/login', error)
        }
        if(err.message=='Request failed with status code 401'){
            error={
                error:true,
                alert_type:'danger',
                message_error:'Incorrect Password'
            }
            res.render('user/login', error)
        }
        // res.send(err)
    })
})
app.get('/dashboard',(req, res)=>{
    let admin=true
    console.log(axios.defaults.headers.authorization)
    axios.get('http://localhost:3333/admin/')
    .then(function (response){
        res.render('superuser/dashboard', {response, admin})
    }).catch(function(err){
        res.redirect('/login')
        // res.send(err)
    })
    // res.render('superuser/dashboard')
})

app.get('/sair', (req, res)=>{
    axios.defaults.headers.authorization=''
    res.redirect('/')
})
app.get('/:storeLink/',(req, res)=>{
    var user
    axios.get(`http://localhost:3333/${req.params.storeLink}`)
    .then(function (response) {
        user ={
            store_name:response.data.store_name,
            bio:response.data.store_bio,
            store_link:"/"+response.data.store_link,
            
            products:["matheus", "tenis", "meia"]
        };
        res.render('layouts/produtos', user)
    })
    .catch(function (error) {
        console.log(error);
        res.send(error)
    })
    
})

app.get('/dashboard/edit',(req, res)=>{
    let admin=true
    console.log(axios.defaults.headers.authorization)
    axios.get('http://localhost:3333/admin/')
    .then(function (response){
        res.render('superuser/edit', {response, admin})
    }).catch(function(err){
        res.redirect('/login')
        // res.send(err)
    })
    // res.render('superuser/dashboard')
})
app.listen(3001);