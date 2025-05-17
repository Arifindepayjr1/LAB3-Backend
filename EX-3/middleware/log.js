export const log = (req, res, next) => {
    console.log("log request");
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`PATH: ${req.path}`);
    console.log(`Query: ${JSON.stringify(req.query)}`);
    console.log(`Time STAMP : ${new Date().toISOString()}`);
    next();
}