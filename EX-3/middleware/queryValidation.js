export const queryValidation = (req, res, next) => {
    const {minCredits,maxCredits} = req.query;
    if(minCredits && isNaN(parseInt(minCredits))){
        return res.status(400).json({error: "minCredits should be a number"});
    }
    if(maxCredits && isNaN(parseInt(maxCredits))){
        return res.status(400).json({error: "maxCredits should be a number"});
    }
    if(minCredits && maxCredits && parseInt(minCredits) > parseInt(maxCredits)){
        return res.status(400).json({error: "minCredits should be less than maxCredits"});
    }
    next();
}