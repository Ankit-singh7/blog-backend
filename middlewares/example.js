

//example middleware function

let exampleMiddleware=(req,res,next)=>
{
    req.user={'firstName':'Ankit','lastName':'kumar'}
    next();//this is use to call the next thing in function,it can be controller,middleware anything

}//end request ip logger function

module.export={
    exampleMiddleware:exampleMiddleware
}