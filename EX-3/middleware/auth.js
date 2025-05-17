export const auth = (req,res,next) => {
    const {token} = req.query;
    if(!token || token !== 'xyz123'){
        return res.status(402).json({error : "Unauthorized"})    
    }else if(token === 'xyz123'){
        console.log("Authorized");
        next();
    }
    
}