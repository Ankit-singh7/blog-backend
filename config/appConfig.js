const express = require('express');
let appConfig={};

appConfig.port = 8000;
/*cors is  cross-origin resource sharing,it decides 
 * which request you are allowed to make and which you 
 * are not allowed to make ,we set this policy in our backend only
 * rather than browser..*/
appConfig.allowedCorsOrigin="*";

//this dev shows that in which environment you are working
appConfig.env="dev";

//this line is for the database,more infomation in the coming video
appConfig.db = {
    uri: 'mongodb://127.0.0.1:27017/blogAppDB',

}

appConfig.apiVersion = '/api/v1';

/*now as we created our configration file ,we would like to use it 
 *in our application,the way to do is through a command
 * i.e module.exports(its basically a object),its basically a 
 * part of nodejs only,whenever we write anything inside module.export
 * it will be available for other file.
 * this is how modules are build */

 module.exports={


    port:appConfig.port,
    allowedCorsOrigin:appConfig.allowedCorsOrigin,
    environment:appConfig.env,
    db:appConfig.db,
    apiVersion:appConfig.apiVersion






 }//end module exports


