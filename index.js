 
//this is needed for importing expressjs into our application
const express = require('express');
const appConfig=require('./config/appConfig');
const  fs = require('fs');
const http=require('http');
const mongoose = require('mongoose');
const globalErrorMiddleware=require('./middlewares/appErrorHandler')
const routeLoggerMiddleware=require('./middlewares/routeLogger')
const logger=require('./libs/loggerLib');
//this two library are for doing post request and they are application level middleware
//we have to include app level middle ware inside index.js file
//route level middleware are include inside the route only
//we have to use npm install for including cookieParser &body parser
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');

//helmet is another application level middleware which is use to hide unnecessary information which comes in header that are 
//bad in context of security
var helmet =require('helmet')


//declaring an instance or creating an application instance
const app = express();



//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use( globalErrorMiddleware. globalErrorHandler);
app.use(routeLoggerMiddleware.logIp);
app.use(helmet());


/* Bootstrap route
 * this function will include all the route files with .js
 *with .js extension to the index.js file
 */

let modelsPath='./models'
fs.readdirSync(modelsPath).forEach(function(file)
{
    if(~file.indexOf('.js'))
    {
        require(modelsPath+'/'+file)
    }
});


 let routesPath = './routes';
 
 fs.readdirSync(routesPath).forEach(function (file)
 {
     if(~file.indexOf('.js'))
     {
         console.log("including the following file");
         console.log(routesPath+'/'+file);
         let route =require(routesPath+ '/' +file);
         route.setRouter(app);
     }
 });//end bootstrap route

 app.use( globalErrorMiddleware. globalNotFoundHandler)


 
 //adding database code here,this part is set set the connection with 
 //the database








// the line below is a route ,its taking two part,first its taking the name of the route and then its taking the callback function
//we can also assign the function in a variable and the put it as a parameter
//let HelloWorld=(req, res) => res.send('Hello World!')
//and then we can put HelloWorld inside the app.get
//app.get('/', (req, res) => res.send('Hello World!'));


//listening the server -its basicaly creating a local server
app.listen(appConfig.port, ( ) =>{
     console.log(`Example app listening on port 8000!`);
     //creating the mongodb connection here
     let db=mongoose.connect(appConfig.db.uri, { useNewUrlParser: true });

});

//handling mongoose connection error
mongoose.connection.on('error',function(err)
{
    console.log('database connection error');
    console.log(err);
});//end mongoose connection error

//handling mongoose success event

mongoose.connection.on('open',function(err)
{
    if(err)
    {
        console.log("database error");
        console.log(err);
    }

    else{
        console.log("database connection open success");
    }
});//end mongoose connection open handler