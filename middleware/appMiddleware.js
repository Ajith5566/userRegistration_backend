

const appMiddleware =(req,res,next)=>{
    console.log('middle application middleware');
    next()
}

module.exports=appMiddleware