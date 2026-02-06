export const logReq = (req, res, next) => {
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
    next()
};