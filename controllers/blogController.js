const mongoose = require('mongoose');

const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')
/* Models */
const BlogModel = mongoose.model('Blog')


//for shortid install npm shortid --save 
const shortid = require('shortid');


/*let helloWorldFunction=(req, res) => res.send('Hello World!');
 let printExample=(req, res) => res.send('print example');

 let testRoute=(req,res)=>
 {
     console.log(req.params);
     res.send(req.params);
 }

 
 let testQuery=(req,res)=>
 {
     console.log(req.query);
     res.send(req.query);
 }

 
 let testBody=(req,res)=>
 {
     console.log(req.body);
     res.send(req.body);
 }*/

let getAllBlog = (req, res) => {

    BlogModel.find()
        .select('-_v -_id ') //this line is to ignore the ugly looking id provided by browser
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
               let apiResponse=response.generate(true,'Failed to find Blog Details',500,null)
               res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('No Blog Found');
                let apiResponse=response.generate(true,'No Blog Found',404,null)
                res.send(apiResponse)         
            } else

            {
                let apiResponse=response.generate(false,'All Blog Details Found',200,result)
                res.send(apiResponse)           
            }

        });
}; //end of getAllBlog

let viewByBlogId = (req, res) => {

    console.log(req.user);//for middlewares

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            let apiResponse=response.generate(true,'Failed to find Blog Details',500,null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse=response.generate(true,'No Blog Found',404,null)
            res.send(apiResponse)
        } else {
            let apiResponse=response.generate(false,'Blog Detail',200,result)
            res.send(apiResponse)

        }
    })
}//end of viewByBlogId

let viewByCategory = (req, res) => {

    BlogModel.find({ 'category': req.params.category }, (err, result) => {

        if (err) {
            let apiResponse=response.generate(true,'Failed to find Blog Details',500,null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse=response.generate(true,'No Blog Found',404,null)
            res.send(apiResponse)
        } else {
            let apiResponse=response.generate(false,'Blog details by category',200,result)
            res.send(apiResponse)

        }
    })
}//end of viewByCategory

let viewByAuthor = (req, res) => {

    BlogModel.find({ 'author': req.params.author }, (err, result) => {

        if (err) {
            let apiResponse=response.generate(true,'Failed to find Blog Details',500,null)
            res.send( apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse=response.generate(true,'No Blog Found',404,null)
            res.send(apiResponse)
        } else {
            let apiResponse=response.generate(false,'blog details by author',200,result)
            res.send(apiResponse)

        }
    })
}//end of viewByAuthor

let editBlog = (req, res) => {

    let options = req.body;
    console.log(options);

    //update is a mongodb function
    //multi=true means that if you find multiple record with same id then update all the record
    BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            let apiResponse=response.generate(true,'Failed to find Blog Details',500,null)
            res.send( apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse=response.generate(true,'No Blog Found',404,null)
            res.send(apiResponse)
        } else {
            let apiResponse=response.generate(false,'blog edited succesfully',200,result)
            res.send(apiResponse)

        }
    });
};//editBlog

 function deleteBlog(req, res){
    BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            let apiResponse=response.generate(true,'Failed to find Blog Details',500,null)
            res.send(apiResponse);
        } else if (check.isEmpty(result)) {
            let apiResponse=response.generate(true,'No Blog Found',404,null)
            res.send(apiResponse);
        } else {
            let apiResponse=response.generate(false,'blog deleted succesfully',200,null)
            res.send(apiResponse);
        }
    });
}

function createBlog(req, res) {
  //  var today = Date.now();
    var blogId = shortid.generate();//this is use to create blogId of the blog which your are creating

    var newBlog = new BlogModel({

        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPublished: true,
        category: req.body.category,
        author: req.body.fullName,
        created: time.now(),
        lastModified: time.now() 
    }) ;// end new blog model

    var tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    newBlog.tags = tags;


    //this is the mongoose function which enables us to save the object
    newBlog.save((err, result) => {
        if (err) {
            let apiResponse=response.generate(true,'Failed to find Blog Details',500,null)
            res.send(apiResponse);
        } else {
            let apiResponse=response.generate(false,'Blog created successfully',200,result)
            res.send(apiResponse);

        }
    }) // end new blog save
}

let increaseBlogView = (req, res) => {

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            let apiResponse=response.generate(true,'Failed to find Blog Details',500,null)
            res.send(apiResponse);

        } else if (check.isEmpty(result)) {
            let apiResponse=response.generate(true,'No Blog Found',404,null)
            res.send(apiResponse);

        } else {
            
            result.views += 1;
            result.save(function (err, result) {
                if (err) {
                    let apiResponse=response.generate(true,'Failed to find Blog Details',500,null)
                    res.send(apiResponse);

                }
                else {
                    let apiResponse=response.generate(false,'All Blog Details Found',200,null)
                    res.send(apiResponse);


                }
            });// end result

        }
    })
}







module.exports = {
    /* helloWorld: helloWorldFunction,
       printExample: printExample,
       testRoute: testRoute,
       testQuery: testQuery,
       testBody: testBody*/
       getAllBlog: getAllBlog,
       createBlog: createBlog,
       viewByBlogId: viewByBlogId,
       viewByCategory: viewByCategory,
       viewByAuthor: viewByAuthor,
       editBlog: editBlog,
       deleteBlog: deleteBlog,
       increaseBlogView: increaseBlogView


}