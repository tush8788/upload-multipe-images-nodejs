const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const db=require('./config/mongoose');
const port =8000;

const app = express();

app.set('view engine','ejs');
app.set('views','./views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(expressLayout);

app.use('/upload',express.static('./upload'));

app.use('/',require('./routes/index.js'));

app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    console.log(`Server is up on port ${port}`);
})