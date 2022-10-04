const express = require('express')
const mongoose = require('mongoose')
const app = express();
const Table = require('./models/table');
const Login = require('./models/login');
app.set('view engine','ejs');

const dbURI = 'mongodb+srv://Khivvi:Raunak@table.mznbby2.mongodb.net/tables?retryWrites=true&w=majority';
mongoose.connect(dbURI);
app.listen(3000);
app.use((req,res,next) => {
    console.log('new request made:');
    console.log('host: ',req.hostname);
    console.log('path: ',req.path);
    console.log('method: ', req.method);
    next();
})
app.use(express.urlencoded({extended:true}));

app.get('/login_page',(req,res)=>{
    res.render('login_page');
});
app.get('/', (req,res)=>
{
    res.render('index');
});
app.get('/index', (req,res)=>
{
    res.render('index');
});

app.get('/input_page', (req,res)=>
{
    res.render('input_page');
});
app.get('/signup_page', (req,res)=>
{
    res.render('signup_page');
});

app.get('/index2', (req,res)=>
{
    Table.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index2',{title:'Tables',tables:result})
        
    })
    .catch((err) =>{
        console.log(err)
    })
    
});
app.post('/signup_page',(req,res)=>{
    const login = new Login(req.body);
    login.save()
    .then((result)=>{
        res.redirect('/login_page');
        })
        .catch((err) =>{
            console.log(err)
        })
})
app.post('/input_page',(req,res)=> {
    const table = new Table(req.body);
    table.save()
    .then((result)=>{
    res.redirect('/index');
    })
    .catch((err) =>{
        console.log(err)
    })

});
app.post('/login_page',async(req,res)=>{
try{
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Login.findOne({email:email});
    if(useremail.password=== password)
    {
        res.status(201).render('index');
    }
    else
    {
        res.send("Password is not matching");
    }

}
catch(error){
    res.status(400).send('Invalid Email')
}
});


app.use((req,res)=>{
    res.status(404).render('404');
});